
Whopper V1.3 By MoF - A Eurocrypt M? smartcard emulator

Intro
-----

This software will decrypt eurocryped D2-MAC channels
that behaves like TV 3 or Norsk TV 2.

All nececary information is kept in a plaintext
config file (WHOPPER.KEY).

Please Note that we have not included the actual
DES keys necessary for successful decrypting of any
TV programs.
This is because Whopper is not intended for
TV piracy abuse, but for your education and
experiments only.


Compatibility
-------------

Whopper was developed using a Luxor MAC-IV sattelite
receiver. We have not had the opportunity to try
it out with other receivers, if it works/doese'nt
work with your receiver, please inform us.

Whopper have now also been verified to work with a
Pace 960 Plus and Aurora MAC 2000.


Structure of WHOPPER.KEY
------------------------

A channel entry looks like this

CHANNEL <Name>
IDENT   <3 Identifier bytes>

[SHARED <4 Shared address bytes>]
[GROUP  <4 Group address bytes>]

[ALTDES]

INDEX   <Key number>
KEY     <7 Key bytes>
[INDEX  <Key number>]
[KEY    <7 Key bytes>]
[INDEX  <Key number>]
[KEY    <7 Key bytes>]
.
.
.

All keywords must be written in uppercase.
Values are separated by whitepace or linebreaks.
Byte values are written in hexadecimal.
Se the included WHOPPER.KEY file.

The keys used are 7 byte PIC style keys.

The keyword ALTDES is used to indicate Norsk TV 2,
it uses a slightly different DES routine than the
other channels.

There is also the keyword

UNIQUE <5 Unique address bytes>

that can be placed anywhere in the file to indicate
the cards unique address.


Command line parameters
-----------------------

whopper [Bx] [Px] [D]

B    Baudrate x, default 9600
P    Serial port x, possible values 1-4, default 1.
D    Debug output, this will print loads of stuff to stdout.


Contacting us
-------------

To get in touch with MoF, make a posting to the
internet newsgroup alt.satellite.tv.crypt, we
read it regulary.

Or nowdays you can send us e-mail.

Use this envelope and send it thru remailer@replay.com.
Note! Don't forget that the remailer scraps your return 
address, if you're expecting a reply, then incude your
reply address in the message.

---- Envelope ---- Cut Here ---- Envelope ----
::
Encrypted: PGP

-----BEGIN PGP MESSAGE-----
Version: 2.6.3i

hIkDPRWysueuweUBA+ifn7y5KCDKRcg8KLRB6PQy62XuzBWMsxR4qr+PiZv+pUXQ
Q7INRBQLdZg/ZmPeqrhnEu1460f12pgYsQf/+9K3pzw5gkq0hi+D2fGusvFPlAB+
C5mQpNDpT6RAKw1rVuWN/um/979i9g4+oCJf2u5232kKmRe2+c2Hl3+oRaYAAAF8
1f7EVkKlJIpYvMPSoGVb/jY0DFZzRaB8kND6oMHaHc6hVtDCzlob3v6gt/aqk1r4
1+WuyW5ryVHz4IgYK4QwPJiklY3aKkR5zjkj7fiCUkJPIagd+NSuMGmr9Xm3TbFz
MHWfA8djce919L0vlMYuJphSZt/qhc9OcpYIRhNXsH9S0gjqgAwDMMCKlCJSwBLb
Fh0vMkJBxu/wN1y67smluiGuS46tBSCBrx5o7rBaV/4VYX7RhaHZt6xMuZTJkawo
TmMTr56j72/Ny2NlDuaYqoLtrOB4Cyy1dzVNQsuAP3fZdjigzoMMIeGj/5+G2fyN
aCwKS81gkbvX+yeq9rPtJc2yjUkj5/W8MAdAaV1wNXfkoZMpdZd+VZfdBSUnCUcm
yT3V2MZsFhnRhA9CM0McV9O3Edvw+ee7ayVDkvPa/VlFM+SYk/VDOi7TtNldwksX
4WaPNpIPSqGvf6c7RSCUO1bDyWv1GpcCQYEGbAHTmA/SiLSYt57qk+xc+Go=
=TRAV
-----END PGP MESSAGE-----

Insert your message here.

---- Envelope ---- Cut Here ---- Envelope ----


If you are going to complain about Whopper not working
properly, don't forget to include what PC and satellite
receiver setup you have, and if possible include debug
output from the program that pinpoints the error.

And don't ask us about the keys, there are plenty of
places on the net where you can get them.


Whats next
----------

We are constantly trying to add capabilities to
Whopper, if you want to se more Eurocrypt systems
supported, share what you know with us.
Currently we are investigating Eurocrypt S2, we
are interested in anything you know.


History
-------

96-01-30: Version 1.0 was released to the public.

96-01-31: Version 1.1
		  Supports Canal+ and CineCinemas.
		  The decoded keys are saved in a separate
		  configuration file named AUTO.KEY.

		  NOTE! The first time you watch
		  Canal+/CineCinemas Whopper will complain
		  about missing keys, this goes away.

96-02-07: Version 1.2
		  Fixed problems reported with Pace decoders.
		  Cleaned up the debug output.

96-02-17: Version 1.3
		  Fixed problems reported with Aurora decoders.



Copying
-------

This program may not be sold or commercially used.
You may freely copy and redistribute this program
in its original form.


Disclaimer
----------

#include <standard_disclaimer.h>


Happy Hacking!

// MoF

--
downloaded from
The European Satellite Hack Page
http://www.paranoia.com/~defiant
ftp://ftp.paranoia.com/pub/users/defiant
