/*IDEA.C   v2.1
	c source code for IDEA block cipher. IDEA (International Data
	Encryption Algorithm), formerly known as IPES (Improved Proposed
	Encryption Standard). Algorithm developed by Xuejia Lai and James L.
	Massey, of ETH Zurich. This implementation modified and derived from
	original C code developed by Xuejia Lai. Zero-based indexing added,
	names changed from IPES to IDEA. CFB functions added. Random Number
	routines added. Optimized for speed 21 Oct 92 by Colin Plumb
	<colin@nsq.gts.org>  This code assumes that each pair of 8-bit bytes
	comprising a 16-bit word in the key and in the cipher block are
	externally represented with the Most Significant Byte (MSB) first,
	regardless of internal native byte order of the target cpu.
	extended for use with hideseek by Colin Maroney (shaggy@phantom.com)
	3/31/94. source: Dr. Dobbs Journal #208  */


/* Usage:    use en_key_idea(word16 key[8],IDEAkey Z) to generate an
		 encryption key.
	     use de_key_idea(IDEAkey Z,IDEAkey DK) to generate a decryption
		 key from an encryption key.
	     use cipher_idea(word16 in[4], word16 out[4],IDEAkey Z) to
		 encode and decode (use DK instead of Z to decode). */



#include "idea.h"

static uint16 inv(uint16 x)
{
   uint16 t0,t1;
   uint16 q,y;
   if (x<=1)
      return x;
   t1=(uint16)(0x10001l/x);
   y=(uint16)(0x10001l%x);
   if (y==1)
	return low16(1-t1);
   t0=1;
   do
   {
      q=x/y;
      x=x%y;
      t0+=q*t1;
      if (x==1)
	return t0;
      q=y/x;
      y=y%x;
      t1+=q*t0;
   } while (y!=1);
   return low16(1-t1);
}

void en_key_idea(word16 *userkey, word16 *Z)
{
   int i,j;
   /* shifts */
   for (j=0;j<8;j++)
      Z[j]=*userkey++;
   for (i=0;j<KEYLEN;j++)
   {
      i++;
      Z[i+7]=((Z[i&7] << 9) | (Z[i+1 & 7] >> 7));
      Z+=i&8;
      i&=7;
   }
}

void de_key_idea(IDEAkey Z,IDEAkey DK)
{
   int j;
   uint16 t1,t2,t3;
   IDEAkey T;
   word16 *p=T+KEYLEN;
   t1=inv(*Z++);
   t2=-*Z++;
   t3=-*Z++;
   *--p=inv(*Z++);
   *--p=t3;
   *--p=t2;
   *--p=t1;
   for (j=1;j<ROUNDS;j++)
   {
      t1=*Z++;
      *--p=*Z++;
      *--p=t1;
      t1=inv(*Z++);
      t2=-*Z++;
      t3=-*Z++;
      *--p=inv(*Z++);
      *--p=t2;
      *--p=t3;
      *--p=t1;
   }
   t1=*Z++;
   *--p=*Z++;
   *--p=t1;
   t1=inv(*Z++);
   t2=-*Z++;
   t3=-*Z++;
   *--p=inv(*Z++);
   *--p=t3;
   *--p=t2;
   *--p=t1;
   /*copy and destroy temp copy*/
   for(j=0,p=T;j<KEYLEN;j++)
   {
      *DK++=*p;
      *p++=0;
   }
}


uint16 mul(uint16 a, uint16 b)
{
   word32 p;

   if (a)
   {
      if (b)
      {
	 p=(word32)a*b;
	 b=(uint16)(low16(p));
	 a=(uint16)(p>>16);
	 return b-a+(b<a);
      }
      else
      {
	 return 1-a;
      }
   }
   else
      return 1-b;
}

#define MUL(x,y) (x=mul(low16(x),y))


#define CONST

void cipher_idea(word16 in[4],word16 out[4],register CONST IDEAkey Z)
{
   register uint16 x1,x2,x3,x4,t1,t2;
   int r=ROUNDS;
   x1=*in++; x2=*in++;
   x3=*in++; x4=*in;
   do
   {
      MUL(x1,*Z++);
      x2+=*Z++;
      x3+=*Z++;
      MUL(x4,*Z++);
      t2=x1^x3;
      MUL(t2,*Z++);
      t1=t2+(x2^x4);
      MUL(t1,*Z++);
      t2=t1+t2;
      x1^=t1;
      x4^=t2;
      t2^=x2;
      x2=x3^t1;
      x3=t2;
   } while (--r);
   MUL(x1,*Z++);
   *out++=x1;
   *out++=(x3+*Z++);
   *out++=(x2+*Z++);
   MUL(x4,*Z);
   *out=x4;
}

