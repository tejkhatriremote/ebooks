#include "hideseek.h"
#include "gif.hpp"
#include "idea.h"
#include <time.h>

//--------------global data---------------------
char giffile[200];   // lots of room for a filename is a Good Thing
unsigned int key[8];
int dispersion;
unsigned seed;
int version,subversion;

//--------------functions----------------------
void usage_exit(char *module)
{
   if (stricmp(module,"hide")==0)
   {
      printf("\nHIDE data hiding program v %d.%d\n",VERSION,SUBVERSION);
      printf("      hides data inside GIF files.\n");
      printf("\n    usage: hide <infile.ext> <giffile[.gif]> [key]\n");
      printf("             where [key] is an optional locking code, up to 8 chars.\n");
      printf("\n    note: will always produce a new GIF called outfile.gif\n");
   }
   else if (stricmp(module,"seek")==0)
   {
      printf("\nSEEK data extractor v %d.%d\n",VERSION,SUBVERSION);
      printf("       extracts data hidden in GIF files by HIDE\n");
      printf("\n     usage: seek <infile[.gif]> <outfile.ext> [key]\n");
      printf("\n     note: if <outfile.ext> exists, it will be overwritten, so BE CAREFULL!!\n");
   }
   exit(0);
};

void process_args(int argc, char *argv[])
{
   struct ffblk ffbk;
   int x=0;
   char *drive=(char *)malloc(200*sizeof(char)); //yes, 200 is a lot mof memory for this
   char *dir=(char *)malloc(200*sizeof(char));   // version 3.5 only allocated 25, and would
   char *fname=(char *)malloc(200*sizeof(char)); // crash if run from a deep sub-directory.
   char *ext=(char *)malloc(200*sizeof(char));  // this will put up with much deeper subdirectories
						// although it still could crash....
   fnsplit(argv[0],drive,dir,fname,ext);

   if (argc!=3 && argc!=4) usage_exit(fname);

   if (argc==3)                      // default key---fill, it with 0's
   {
       for (int x=0;x<8;x++) key[x]=0;
   }
   else if (strlen(argv[3])>8)
   {
      printf("\nKEY can be no longer than 8 characters!!!\n");
      exit(0);
   }
   else
   {
      for (int x=0;x<8;x++)
	 if (*argv[3]!='\0') key[x]=*argv[3]++;  // put the key into "key"
	 else key[x]=0;                          // and pad with 0's (important!)
   }

   if (stricmp(fname,"hide")==0)          // set up for hide
   {
      if (findfirst(argv[1],&ffbk,0)!=0)
      {
	 printf("\nInfile %s not found.\n",argv[1]);
	 exit(0);
      }
      else
      {
	 x=0;
	 while (argv[2][x]!='.' && argv[2][x]!='\0') x++;
	 if (argv[2][x]!='.')
	 {
	    strcpy(giffile,argv[2]);
	    strcat(giffile,".gif");
	 }
	 else strcpy(giffile,argv[2]);
	 if (findfirst(giffile,&ffbk,0)!=0)
	 {
	    printf("\nGIF file %s not found.\n",giffile);
	    exit (0);
	 }
      }
      if (findfirst("outfile.gif",&ffbk,0)==0)
      {
	 printf("\nOUTFILE.GIF already exists!!!! overwrite?(Y/n)");
	 x=getche();
	 printf("\n");
	 if (toupper(x)=='N')
	 {
	    printf("\nMake the necessary changes and re-run HIDE\n");
	    exit(0);
	 }
      }
   }
   if (stricmp(fname,"seek")==0)      // set up for seek
   {
      x=0;
      while (argv[1][x]!='.' && argv[1][x]!='\0') x++;
      if (argv[1][x]!='.')
      {
	 strcpy(giffile,argv[1]);
	 strcat(giffile,".gif");
      }
      else strcpy(giffile,argv[1]);
      if (findfirst(giffile,&ffbk,0)!=0)
      {
	 printf("\nGIF file %s not found.\n",giffile);
	 exit (0);
      }
   }



   free (dir); free(drive); free(fname); free(ext);
}

void test_gif(void)
{
   FILE *fgif = fopen(giffile, "rb" );
   if( fgif == 0 )
   {
      printf( "\nGIF File '%s' not found\n", giffile );
      exit (0);
   }

   // read header and screen descriptor
   GIFHEADER hdr;
   if( hdr.get( fgif ) )
   {
      printf( "\nError reading GIF header\n" );
      exit( 0 );
   }
   if( ! hdr.isvalid() )
   {
      printf( "\nFile %s is not a valid GIF file\n",giffile);
      exit( 0 );
   }
   GIFSCDESC scd;
   if( scd.get( fgif ) )
   {
      printf( "\nError reading GIF screen descriptor\n" );
      exit( 0 );
   }

   if (scd.ncolors()!=256)
   {
      printf("\nGIF file %s does not have 256 colors.\n",giffile);
      exit(0);       //HIDESEEK only uses 256 color (or shades-of-grey) GIFs
   }

   fclose(fgif);
}

int prepare_screen(void)
{
   int old_mode;
   int x;

   clrscr();
   printf("\nPreparing to process files.......");
   printf("Press any key when ready.\n");
   getch();

   old_mode=fg_getmode();
   fg_setmode(23);
   x=fg_showgif(giffile,0);
   if (x!=0)
   {
      fg_setmode(old_mode);
      printf("\ncryptic error message 101%d-á\n",x); // means that there's a mystery problem
      exit(0);                                       // shouldn't come up.
   }                                                 // x=1:file not found
   return old_mode;                                  // x=2:file not a GIF
}                                                    // and we've already found it
						     // and checked to see if its a GIF
int process_infile(FILE *infile)
{
   int c=0;
   long length=0;
   long total=19000;
   int used=0;

   //output header info---length and dispersion
   length=filelength(fileno(infile));      // file length
   dispersion=(int)(total/length);         // data dispersion
   if (dispersion<1) return 0;
   outheader(length);

   while ((c=getc(infile))!=EOF)
   {
      dispersion=(int)(total/length);
      if ((used=outbyte(c))==0)
	 return 0;
      length--;            // dynamic dispersion computation at its finest 
      total*=8;
      total-=used;
      total/=8;
   }

   return 1;
}

void outheader(long length)
{
   word16 in[4];
   word16 out[4];
   IDEAkey Z;
   time_t t;

   // set up random number generator and generate a seed.
   srand((unsigned) time(&t));

   // encrypt length and dispersion
   en_key_idea(key,Z);
   in[0]=(word16)(low16(length));
   in[1]=seed=(unsigned)random(32000);
   in[2]=((VERSION<<8)|(SUBVERSION)); // in[3] doesn't matter--it isn't used by HIDESEEK (currently)
   cipher_idea(in,out,Z);             // IDEA needs 4 subblocks though, so there it is.

   // write header info

   dispersion=1;
   for (int x=0;x<4;x++)
   {
      outbyte((char)(out[x]&255l));
      outbyte((char)(out[x]>>8));
   }

   // set dispersion for rest of file and seed randomizer
   dispersion=(int)(19000/length);
   srand(seed);  
}

int outbyte(char c)
{
   int v=0,clr=0,i=0;
   static int x=0,y=0;         // note the static part there, kids....
   int used=0,disp=0,extra=0;

   for(i=0;i<8;i++)
   {
     v=(c&1);
     clr=fg_getpixel(x,y);
     if (v==1)
	clr=(clr|1);
     else
	clr=((clr>>1)<<1);    // sets that low bit to 0
     fg_setcolor(clr);
     fg_point(x,y);
     disp=(random(dispersion+extra)+1);
     used+=disp;
     extra=((dispersion*(i+1))-used);   // even more dynamic dispersion computation
     x+=disp;
     if (x>=320)
     {
	while (x>=320)
	{
	   x=x-319;
	   y++;
	   if (y==480 && i<7)    // oops! went past the end!
	      return 0;          // now how did that happen?
	}
     }
     c>>=1;
   }
   return used;
}

int process_outfile(char *filename)
{
   FILE *f;
   int c=0;
   unsigned count=0;
   int disp=0;
   word16 in[4],out[4];
   IDEAkey Z,DK;

   //.....get the header info

   dispersion=1;

   // read the header

   for (int x=0;x<4;x++)
   {
      in[x]=0;
      in[x]|=((word16)(inbyte(0)));
      in[x]|=((word16)(inbyte(0)<<8));
   }

   en_key_idea(key,Z);
   de_key_idea(Z,DK);

   // decrypt the header

   cipher_idea(in,out,DK);

   //set the variables

   count=out[0];
   seed=out[1];
   version=out[2]>>8;
   subversion=out[2]&255;
   switch (version)  // is it a valid version number?
   {
      case 3: if (subversion!=5) return -1;break;   //still compatible with 3.5
      case 4: if ((subversion!=0) && (subversion!=1)) return -1; break;  // and 4.0
      default: return -1;
   };
   disp=(int)(19000/count);

   // set dispersion and seed randomizer
   dispersion=disp;
   srand(seed);

   // process files

   f=fopen(filename,"wb");
   if (f==NULL)
      return 0;
   else
   {
      while ((count-->0) && ((c=inbyte((int)(count+1)))!=-1))
	 if (fwrite(&c,sizeof(char),1,f)!=1) return 0;

   }
   fclose(f);
   return 1;
}

int inbyte(int length)
{
   static int x=0,y=0;
   static long total=19000;
   int chr=0,cnt=0,v=0;
   int used=0,disp=0,extra=0;

   for (cnt=0;cnt<8;cnt++)
   {
      v=fg_getpixel(x,y);
      v&=1;
      chr=chr|(v<<cnt);
      disp=(random(dispersion+extra)+1);    // look familiar? 3 words--
      used+=disp;                           // Dynamic Dispersion Calculation
      if (version==4 && subversion==1)      // (maybe)
         extra=((dispersion*(cnt+1))-used);  //else variety remains 0
      x+=disp;
      if (x>=320)
      {
	 while (x>=320)
	 {
	    x=x-319;
	    y++;
	    if (y>=480 && cnt<7)
	       chr=-1;
	 }
      }
   }
   if (version==4 && ((subversion==0) || (subversion==1)))
   {
      if (length>1)
      {
	 length--;                  //here's that dynamic dispersion
	 total*=8;                 // calulation again.
	 total-=used;
	 total/=8;
	 dispersion=(int)(total/length);
      }
   }

   return chr;
}







