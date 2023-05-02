#include "hideseek.h"
extern char giffile[100];
extern int version,subversion;


main(int argc, char *argv[])
{
   char *drive=(char *)malloc(200*sizeof(char)); //yes, i know 200
   char *dir=(char *)malloc(200*sizeof(char));  // is excessive, but its there,
   char *fname=(char *)malloc(200*sizeof(char)); // and version 3.5 didn't allocate enough
   char *ext=(char *)malloc(200*sizeof(char));  // once burned, twice shy.
   int old_mode=0;
   int x=0;


   process_args(argc,argv);
   test_gif();

   fnsplit(argv[0],drive,dir,fname,ext);

   if (stricmp(fname,"seek")==0)
   {
      old_mode=prepare_screen();
      x=process_outfile(argv[2]);
      fg_setmode(old_mode);

      if (x==-1)
      {
	  printf("\nError!!\n");
	  printf("          Data hidden using wrong version of HIDE (v. %d.%d ?)\n",version,subversion);
	  printf("          Data hidden with a key\n");
	  printf("          or else there is no data in this GIF file.\n");
	  printf("          (this is SEEK version %d.%d)\n",VERSION,SUBVERSION);
      }
      else if (x==0) printf("\nERROR: %s not made!!!\n",argv[2]);
      else printf("\nExtraction complete! data rests in %s\n",argv[2]);
   }
   else usage_exit("seek");

   free (dir); free(drive); free(fname); free(ext);

   return 0;
}