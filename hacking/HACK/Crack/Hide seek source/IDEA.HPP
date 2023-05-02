/* idea.h */

#ifndef _IDEA_DOT_H
#define _IDEA_DOT_H

#include <stdio.h>
#include <time.h>
#include <process.h>
#include <io.h>
#include <string.h>
#include <conio.h>

#define IDEAKEYSIZE 16
#define IDEABLOCKSIZE 8
#define word16 unsigned int
#define word32 unsigned long int
#define ROUNDS	8
#define KEYLEN	(6*ROUNDS+4)
#define tempfilename "tempfile.änc"



#define low16(x) ((x) & 0xffff)

typedef unsigned int uint16;
typedef word16 IDEAkey[KEYLEN];

/*IDEA Algorithm functions */
void en_key_idea(word16 userkey[8],IDEAkey Z);
void de_key_idea(IDEAkey Z, IDEAkey DK);
void cipher_idea(word16 in[4],word16 out[4],IDEAkey Z);
uint16 inv(uint16 x);
uint16 mul(uint16 a,uint16 b);


#endif




