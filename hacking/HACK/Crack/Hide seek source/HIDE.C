#include "hideseek.h"
extern char giffile[100];


main(int argc, char *argv[])
{
   FILE *infile;
   char *drive=(char *)malloc(200*sizeof(char)); // 200 spaces for a file name
   char *dir=(char *)malloc(200*sizeof(char));   // means you probably wont have one
   char *fname=(char *)malloc(200*sizeof(char)); // that is too long.
   char *ext=(char *)malloc(200*sizeof(char));   // once burned, twice shy.
   int old_mode=0;
   int x=0,y=0;

   process_args(argc,argv);
   test_gif();

   fnsplit(argv[0],drive,dir,fname,ext);

   if (stricmp(fname,"hide")==0)
   {
      infile=fopen(argv[1],"rb");
      if (infile==0)
      {
	 printf("\nError opening input file %s.\n",argv[1]);
	 exit (0);
      }

      old_mode=prepare_screen();
      x=process_infile(infile);
      y=fg_makegif(0,319,0,479,"outfile.gif");
      fg_setmode(old_mode);
      if (x==0) printf("\nError: input file %s too long!!!\n",argv[1]);
      else if (y==1) printf("\nERROR: outfile.gif not made!!!\n");
      else printf("\nDone! remember to delete your original file for safety, if necessary.\n");

      fclose(infile);
   }
   else usage_exit("hide");

   free (dir); free(drive); free(fname); free(ext);

   return 0;
}