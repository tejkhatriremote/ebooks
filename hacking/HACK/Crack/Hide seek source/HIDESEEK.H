#ifndef _HIDESEEK_DOT_H_
#define _HIDESEEK_DOT_H_

#include <fastgraf.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dir.h>
#include <conio.h>
#include <ctype.h>
#include <io.h>

#define VERSION 4
#define SUBVERSION 1


void process_args(int argc,char *argv[]);
void usage_exit(char *module);
void test_gif(void);
int  prepare_screen(void);
int process_infile(FILE *infile);
int outbyte(char c);
int inbyte(int length);
int process_outfile(char *filename);
void outheader(long length);

#endif
