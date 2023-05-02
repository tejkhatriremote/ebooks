#!/bin/sh
#Kitchen Table - IP Tables One Liner Configuration v0.02
#Network Penetration
#NetworkPenetration.com
#Copyright (c) 2003, Ste Jones
#root@networkpenetration.com
#All rights reserved.

#BSD License
#Redistribution and use in source and binary forms, 
#with or without modification, are permitted provided 
#that the following conditions are met:

#Redistributions of source code must retain the above 
#copyright notice, this list of conditions and the 
#following disclaimer.

#Redistributions in binary form must reproduce the 
#above copyright notice, this list of conditions and 
#the following disclaimer in the documentation and/or 
#other materials provided with the distribution.

#Neither the name of Network Penetration nor the names 
#of its contributors may be used to endorse or promote
#products derived from this software without specific 
#prior written permission.

#THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND 
#CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
#INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
#MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
#DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
#CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
#SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
#NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODSOR SERVVICES;
#LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
#HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
#CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
#OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
#EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

###################################
#Do NOT use on a production server#
###################################

############
#How to use#
############
#There are 2 ways to setup a firewall
#1. Trusting - Allow all incoming connections and block certain ports 
#2. Paranoid - Block all incoming connections and only allow access 
#to certain ports

#Examples
#To allow connections on all ports but block access to various
#windows networking port the following would be issued
#int = interface
#fri = firewall rules internal (t = trusting)
#bbi = block both udp and tcp ports on internal 
#
#./kitchentable.sh --int eth0 --fri t --bbi 135-139,445


#To block all incoming connections appart from ssh and web traffic
#the following could be used
#oti = open tcp port internal
#fri = firewall rules internal (p = paranoid)
#NOTE Paranoid by default allows SSH access for remote
#administration purposes. If SSH access is not required
#use "n" for no ports open
#
#./kitckentable.sh --int eth0 --fri p --oti 80


#To block all incoming connections including ssh
#the following could be used
#fri = firewall rules internal (n = no port open)
#
#./kitchentable.sh --int eth0 --fri n

#Most machines acting as a firewall use 2 interfaces thus
#the follwing could be used
#int = internal interface
#ext = external interface
#fri = firewall rules internal (t = trusting)
#fre = firewall rules external (n = no port open)
#
#./kitchentable.sh --int eth0 --ext eth1 --fri t --fre n

#To allow ports open on one interface and not the other
#We set the internal interface to trusting and the external
#to no open ports. We then allow access to UDP 53 and TCP 80 on 
#external and block both UDP and TCP port 135-139 and 445 on
#the internal interface
#oue = open udp external
#ote = open tcp external
# 
#./kitchentable.sh --int eth0 --ext eth1 --fri t --fre n --oue 53 --ote 80 --bbi 135-139:445

#To enable NAT (Network Address Translation)
#add the --nat flag
#
#./kitchentable.sh --int eth0 --ext eth1 --fri t --fre n --nat  



#######################
#XXX START OF PROG XXX#
#XXX START OF PROG XXX#
#XXX START OF PROG XXX#
#XXX START OF PROG XXX#
#######################

#################
#SETUP VARIABLES#
#################
#################################
#find iptables and services exec#
#################################
IPTABLES="`which iptables`"
SERVICE="`which service`"

############
#interfaces#
############
EXT="eth1"
INT="eth0"
LOOPBACK="lo"

################
#Clear all vars#
################
NAT="0"
BLOCKICMPINT="0"
BLOCKICMPEXT="0"
strFRE="0"	#firewall rules external
strFRI="0"	#firewall rules interna;
strOBE="0"	#open port external both udp + tcp
strOBI="0"	#open port internal both udp + tcp
strBBE="0"	#block port external both udp + tcp
strBBI="0"	#block port internal both udp + tcp
strOTE="0"	#open tcp  port external
strOTI="0"	#open tcp port internal
strBTE="0"	##block tcp port external
strBTI="0"	#block tcp port internal
strOUE="0"	#open udp port external
strOUI="0"	#open udp por iternal
strBUE="0"	#block uddp port external
strBUI="0"	#block udp port internal
intINTcount=0	#number of interfaces

#####################
#useful unused ports#
#####################

############
#tcp pports#
############
prtIRC="6666:7000,7139" 
prtMAIL="25,110"	#smtp and pop3
prtWEB="80,443"	#http and https
prtFTP="21"
prtSSH="22"
###########
#udp ports#
###########
prtCSTRIKE="27005,27015"
prtQUAKE="27960:28060"	#may need to increase range if hosting large server
########################
#both udp and tcp ports#
########################
prtWINDOWS="135,136,137,138,139,445"
prtDHCP="67,68"
prtDNS="53"
prtPROXY="8080"
prtRPC="111"
#############
#port ranges#
#############
prtICKLE="1:1024"
prtALL="1:65535"
#trusted - allow acces to all tcp and udp ports
prtTRUSTED="$prtALL"

#paranoid tcp and udp pports
prtPARANOIDT="$prtSSH"


###########
#FUNCTIONS#
##########
#######
#Usage#
#######
function fncUsage(){

echo "--int <eth0> Internal interface"
echo "--ext <eth1> External interface"
echo "--nat Enable Network Address Translation on external interface"
echo "--fri <p,t,n> Firewall base rules for internal interface"
echo "--fre <p,t,n> Firewall base rules for external interface"
echo "(p)aranoid allow ssh, (t)rusting allow all, (n)o ports open"
echo "Internal rule config"
echo "--obi <20-30,80> Open both UDP and TCP ports on internal interface"
echo "--bbi <20-30,80> Block both UDP and TCP ports on internal interface"
echo "--oti <20-30,80,443> Open TCP ports on internal interface"
echo "--bti <135-136,445> Block TCP ports on internal interface"
echo "--oui <60-70,6669> Open UDP ports on internal interface"
echo "--bui <40-90,111> Block UDP ports on internal interface"
echo "--bii Block ICMP on internal interface"
echo "External rule config"
echo "--obe <1025-2048,443> Open ports on external interface"
echo "--bbe <135-139,445> Block ports on external interface"
echo "--ote <80,443> Open TCP ports on external interface"
echo "--bte <135-139,445> Block TCP ports on external interface"
echo "--oue <53,60-70> Open UDP ports on external interface"
echo "--bue <135-159> Block UCP ports on external interface"
echo "--bie Block ICMP on external interface"
echo
exit 0
}
#########################
#Check ICMP command line#
#########################
function fncCheckICMP(){

    #echo "blockicmpext $BLOCKICMPEXT blockicmpint $BLOCKICMPINT"

    if [ $BLOCKICMPEXT == "1" ]; then
        $IPTABLES -A exticmp_packets -p ICMP -s 0/0 -j DROP
	echo "Blocking ICMP on External"
    else
        #echo "Not blocking ICMP on external"
	$IPTABLES -A exticmp_packets -p ICMP -s 0/0 -j ACCEPT
    fi


    if [ $BLOCKICMPINT == "1" ]; then
        $IPTABLES -A inticmp_packets -p ICMP -s 0/0 -j DROP
	echo "Blocking ICMP on Internal"
    else
	#echo "Not blocking ICMP on internal"
        $IPTABLES -A inticmp_packets -p ICMP -s 0/0 -j ACCEPT
    fi

}


##################################################
#Function: Validate parameters and exit on error.#
##################################################
function fncValidateParameter(){

    strTyp=${1} # parameter type
    strPar=${2} # parameter name
    strVal=${3} # parameter value

    strErrorMessage=""
    case ${strTyp} in
    ("nic")
	# Validate NIC value
        if [ "${strVal}" != "" ] && [ "${strVal}" != "eth0" ] && [ "${strVal}" != "eth1" ] ;
        then
	    strErrorMessage="Wrong network card value: '${strVal}'"
        fi
    ;;
   ("rules")
	# Validate Firewall rules value
	if [ "`echo ${strVal} | tr -d "ptn"`" != "" ] ;
	then
	    strErrorMessge="Wrong firewall rules value: '${strVal}'.\nAvailable chars: 'ptn'."
	fi
    ;;
    ("ports")
	# Validate Ports value
	if [ "`echo ${strVal} | tr -d "0123456789,:-"`" != "" ] ;
	then
	    strErrorMessage="Wrong ports list value: '${strVal}'.\nAvailable chars: '0123456789,:-'."
	fi
    ;;
    ("icmp")
	# Validate ICMP value
        if [ "${strVal}" != "" ] && [ "${strVal}" != "0" ] && [ "${strVal}" != "1" ] ;
        then
	    strErrorMessage="Wrong ICMP block value: '${strVal}'.\nAvailable values: '1' or '0'."
        fi
    ;;
    (*)
	# do nothing
	echo "Error: Parameter type '${strTyp}' was not found."
    ;;
    esac

    # echo error message
    if [ "${strErrorMessage}" != "" ];
    then
	echo ""
        echo "Error (parameter: ${strPar}): ${strErrorMessage}"
	echo ""
	exit 2
    fi
    strErrorMessage=""
}


####################################################################
#Function: Parse's command line ports and setups chains accordingly#
####################################################################
function fncParsePorts(){

if [ $strOBE != "0" ]; then
	fncOpenBlockPorts "ext" "both" "open" ${strOBE}
fi

if [ $strOBI != "0" ]; then
	fncOpenBlockPorts "int" "both" "open" ${strOBI}
fi

if [ $strBBE != "0" ]; then
	fncOpenBlockPorts "ext" "both" "block" ${strBBE}
fi

if [ $strBBI != "0" ]; then
	fncOpenBlockPorts "int" "both" "block" ${strBBI}
fi

if [ $strOTE != "0" ]; then
	fncOpenBlockPorts "ext" "tcp" "open" ${strOTE}
fi

if [ $strOTI != "0" ]; then
	fncOpenBlockPorts "int" "tcp" "open" ${strOTI}
fi

if [ $strBTE != "0" ]; then
	fncOpenBlockPorts "ext" "tcp" "block" ${strBTE}
fi

if [ $strBTI != "0" ]; then
	fncOpenBlockPorts "int" "tcp" "block" ${strBTI}
fi

if [ $strOUE != "0" ]; then
	fncOpenBlockPorts "ext" "udp" "open" ${strOUE}
fi

if [ $strOUI != "0" ]; then
	fncOpenBlockPorts "int" "udp" "open" ${strOUI}
fi

if [ $strBUE != "0" ]; then
	fncOpenBlockPorts "ext" "udp" "block" ${strBUE}
fi

if [ $strBUI != "0" ]; then
	fncOpenBlockPorts "int" "udp" "block" ${strBUI}
fi

}


#################################
# Function: Open and block ports#
#################################
function fncOpenBlockPorts()
{
    # get parameters
    strCardType=${1}		# Values: ext, int
    strPortsType=${2}		# Values: udp, tcp, both
    strPortsPermition=${3}	# Values: open, block

    # replace "," to " " and "-" to ":"
    strPortsString=`echo ${4} | sed -e "s/-/:/g" | sed -e "s/,/ /g"`

    # convert string to array
    arrPorts=( $strPortsString )

    # couu#nt number of elements in array
    intPorts=${#arrPorts[*]}

    # print number of ports
    #echo "Number of Ports: ${intPorts}"

    # List all the elements in the array.
    intIndex=0
    while [ "${intIndex}" -lt "${intPorts}" ]
    do

	# get port element from array
	strPort="${arrPorts[$intIndex]}"

	# increase index by 1
        let "intIndex = $intIndex + 1"
	intMultiport=`echo ${strPort} | grep "\:" | tr -d "\n\r" | wc -c`

	# do some actions on port
	if [ ${intMultiport} -eq "0" ] ;
	then
	    #SINGLE PORT range
	    echo -e "    ${strCardType}\t      ${strPortsType}\t${strPort}\t  ${strPortsPermition}"
	    if [ ${strPortsPermition} = "block" ]; then
		if [ ${strPortsType} = "tcp" ]; then
		    $IPTABLES -A ${strCardType}tcp_packets -p TCP -s 0/0 --dport ${strPort} -j DROP
		fi

		if [ ${strPortsType} = "udp" ]; then
		    $IPTABLES -A ${strCardType}udp_packets -p UDP -s 0/0 --dport ${strPort} -j DROP
		fi

		if [ ${strPortsType} = "both" ]; then
		    $IPTABLES -A ${strCardType}tcp_packets -p TCP -s 0/0 --dport ${strPort} -j DROP
		    $IPTABLES -A ${strCardType}udp_packets -p UDP -s 0/0 --dport ${strPort} -j DROP
		fi
	    fi

	    if [ ${strPortsPermition} = "open" ]; then
		if [ ${strPortsType} = "tcp" ]; then
		    $IPTABLES -A ${strCardType}tcp_packets -p TCP -s 0/0 --dport ${strPort} -j allowed
		fi

		if [ ${strPortsType} = "udp" ]; then
		    $IPTABLES -A ${strCardType}udp_packets -p UDP -s 0/0 --dport ${strPort} -j ACCEPT
		fi

		if [ ${strPortsType} = "both" ]; then
		    $IPTABLES -A ${strCardType}tcp_packets -p TCP -s 0/0 --dport ${strPort} -j allowed
		    $IPTABLES -A ${strCardType}udp_packets -p UDP -s 0/0 --dport ${strPort} -j ACCEPT
		fi
	    fi

	else
	    #MULITPORT range
	    #HERE CHANGE TO count char... if char >= change output
	    echo -e "    ${strCardType}\t      ${strPortsType}    ${strPort}\t  ${strPortsPermition}"

	    if [ ${strPortsPermition} = "block" ]; then
	        if [ ${strPortsType} = "tcp" ]; then
		    $IPTABLES -A ${strCardType}tcp_packets -p TCP -s 0/0 --dport ${strPort} -j DROP
		fi

		if [ ${strPortsType} = "udp" ]; then
		    $IPTABLES -A ${strCardType}udp_packets -p UDP -s 0/0 --dport ${strPort} -j DROP
		fi

		if [ ${strPortsType} = "both" ]; then
		    $IPTABLES -A ${strCardType}tcp_packets -p TCP -s 0/0 --dport ${strPort} -j DROP
		    $IPTABLES -A ${strCardType}udp_packets -p UDP -s 0/0 --dport ${strPort} -j DROP
		fi
	    fi

	    if [ ${strPortsPermition} = "open" ]; then
	        if [ ${strPortsType} = "tcp" ]; then
		    $IPTABLES -A ${strCardType}tcp_packets -p TCP -s 0/0 --dport ${strPort} -j allowed
		fi

		if [ ${strPortsType} = "udp" ]; then
		    $IPTABLES -A ${strCardType}udp_packets -p UDP -s 0/0 --dport ${strPort} -j ACCEPT
		fi

		if [ ${strPortsType} = "both" ]; then
		    $IPTABLES -A ${strCardType}tcp_packets -p TCP -s 0/0 --dport ${strPort} -j allowed
		    $IPTABLES -A ${strCardType}udp_packets -p UDP -s 0/0 --dport ${strPort} -j ACCEPT
		fi
	    fi
	fi

    done
}


##############################################
# Function: Read parameters and set variables#
##############################################
function fncReadParameters()
{
    intParams="$#"
    strParams="$*"

    #echo "Number of parameters: ${intParams}"
    #echo "Parameters: ${strParams}"

    # convert string to array
    arrParams=( $strParams )

    intIndex=0
    while [ "${intIndex}" -lt "${intParams}" ]
    do
	# get parameter element from array
	strParam="${arrParams[$intIndex]}"
	# increase index by 1
        let "intIndex = $intIndex + 1"
	# get value
	strValue="${arrParams[$intIndex]}"

	# select parameters
        intParameter=true
	case ${strParam} in
	    "-int" | "--int") # Internal (LAN) network interface. Values: (eth0 or eth1)
		strParType="nic"
		INTERNAL=${strValue}
		intINTcount=$[ $intINTcount + 1 ]
	    ;;
	    "-ext" | "--ext") # External (WAN) network interface. Values: (eth0 or eth1)
		strParType="nic"
		EXTERNAL=${strValue}
		intINTcount=$[ $intINTcount + 1 ]
	    ;;
	    "-nat" | "--nat") # Network Address Translation 
		intParameter=false
		NAT=1
	    ;;
	    "-fre" | "--fre") # load base firewall rules on external interface.
		strParType="rules"
		EXTRULES=${strValue}
	    ;;
	    "-fri" | "--fri") # load base firewall rules on internal interface.
		strParType="rules"
		INTRULES=${strValue}
	    ;;
	    "-obe" | "--obe") # open  TCP/UDP ports on external interface.
		strParType="ports"
		strOBE=${strValue}
	    ;;
	    "-obi" | "--obi") # open  TCP/UDP ports on internal interface.
		strParType="ports"
		strOBI=${strValue}
	    ;;
	    "-bbe" | "--bbe") # block TCP/UDP ports on external interface.
		strParType="ports"
		strBBE=${strValue}
	    ;;
	    "-bbi" | "--bbi") # block TCP/UDP ports on internal interface.
		strParType="ports"
		strBBI=${strValue}
	    ;;
	    "-ote" | "--ote") # open  TCP     ports on external interface.
		strParType="ports"
		strOTE=${strValue}
	    ;;
	    "-oti" | "--oti") # open  TCP     ports on internal interface.
		strParType="ports"
		strOTI=${strValue}
	    ;;
	    "-bte" | "--bte") # block TCP     ports on external interface.
		strParType="ports"
		strBTE=${strValue}
	    ;;
	    "-bti" | "--bti") # block TCP     ports on internal interface.
		strParType="ports"
		strBTI=${strValue}
	    ;;
	    "-oue" | "--oue") # open  UDP     ports on external interface.
		strParType="ports"
		strOUE=${strValue}
	    ;;
	    "-oui" | "--oui") # open  UDP     ports on internal interface.
		strParType="ports"
		strOUI=${strValue}
	    ;;
	    "-bue" | "--bue") # block UDP     ports on external interface.
		strParType="ports"
		strBUE=${strValue}
	    ;;
	    "-bui" | "--bui") # block UDP     ports on internal interface.
		strParType="ports"
		strBUI=${strValue}
	    ;;
	    "-bie" | "--bie") # block icmp external
		strParType="icmp"
		BLOCKICMPEXT=${strValue}
	    ;;
	    "-bii" | "--bii") #block icmp int
		strParType="icmp"
		BLOCKICMPINT=${strValue}
	    ;;
	    "-help" | "--help" | "-?" | "--?")
		fncUsage
		exit 1
	    (*)
		# This is not parameter (value)
		intParameter=false
	    ;;
	esac

	# Check (validate) parameter.
	if [ "$strParType" != "" ];
	then
	    fncValidateParameter "${strParType}" "${strParam}" "${strValue}"
	fi
	strParType=""

	# if this is parameter then echo value on the screen
	#if ( ${intParameter} ) ; then  echo "${strParam} ${strValue}" ; fi
    done
}


#########################
#Function: Assign chains#
#########################
function fncAssignChains(){

    $IPTABLES -A INPUT -p TCP -i $EXT -j exttcp_packets
    $IPTABLES -A INPUT -p UDP -i $EXT -j extudp_packets
    $IPTABLES -A INPUT -p ICMP -i $EXT -j exticmp_packets

    $IPTABLES -A INPUT -p TCP -i $INT -j inttcp_packets
    $IPTABLES -A INPUT -p UDP -i $INT -j intudp_packets
    $IPTABLES -A INPUT -p ICMP -i $INT -j inticmp_packets
}

######################
#Funtion Assign Rules#
######################
function fncAssignRules(){
#PARANOID
if [ "${EXTRULES}" = "p" ]; then
    fncOpenBlockPorts "ext" "tcp" "open" "${prtPARANOIDT}"
fi

if [ "${INTRULES}" = "p" ]; then
    fncOpenBlockPorts "int" "tcp" "open" "${prtPARANOIDT}"
fi

#TRUSTING
if [ "${EXTRULES}" = "t" ]; then
    fncOpenBlockPorts "ext" "both" "open" "${prtTRUSTED}"
fi

if [ "${INTRULES}" = "t" ]; then
    fncOpenBlockPorts "int" "both" "open" "${prtTRUSTED}"
fi


#NONE
#All ports blocked by default
#if [ "${EXTRULES}" = "n" ]; then
#    fncOpenBlockPorts "ext" "both" "block" "${prtTRUSTED}"
#fi
#
#if [ "${INTRULES}" = "n" ]; then
#    fncOpenBlockPorts "int" "both" "block" "${prtTRUSTED}"
#fi
}
##################
#End Of Functions#
##################




###############################
#XXX START OF MAIN PROGRAM XXX#
###############################
echo
echo "Kitchen Table from NetworkPenetration.com"
echo "-----------------------------------------"
echo

################################################
#flush iptables (-F) and delete all chains (-X)#
################################################
$IPTABLES -F
$IPTABLES -X

########################
#Setup default policies#
########################
$IPTABLES -P INPUT DROP
$IPTABLES -P OUTPUT DROP
#FORWARD setup during NAT config

###############
#create chains#
###############
$IPTABLES -N bad_tcp_packets
$IPTABLES -N allowed
$IPTABLES -N exticmp_packets
$IPTABLES -N exttcp_packets
$IPTABLES -N extudp_packets
$IPTABLES -N inttcp_packets
$IPTABLES -N intudp_packets
$IPTABLES -N inticmp_packets

######################################################
#Parse command line arguments for setting up firewall#
######################################################
# Read parmeters from command line.
#echo "Command line Options"
#echo "--------------------"
fncReadParameters $*
#echo "--------------------"


######################
#check for interfaces#
######################
#echo "intcount = $intINTcount"
if [ $intINTcount != "2" ]
then 
    if [ $intINTcount != "1" ]
    then
	fncUsage 
	#echo "Opps: not enough interfaces specified"
	exit 1
    fi
fi


######################################
#Check firewall base config specified#
######################################

if [ ! `echo -n "ptn" | grep ${INTRULES} | wc -w` = "1" ]
then
    echo "No internal rules specified"
    exit 1
fi

if [ $intINTcount = "2" ] 
then
    if [ ! `echo -n "ptn" | grep ${EXTRULES} | wc -w` = "1" ]
    then
	echo "No external rules specified"
    	exit 1
    fi
fi


###############
#Configure NAT#
###############
if [ "${NAT}" = "1" ];
then
    if [ intINTcount != "2" ]
    then
	echo "Two interfaces are requried for NAT"
	exit 1
    fi
    echo 1 > /proc/sys/net/ipv4/ip_forward
    $IPTABLES -t nat -F
    $IPTABLES -t nat -X
    $IPTABLES -P FORWARD ACCEPT
    $IPTABLES -t nat -I POSTROUTING -o $EXT -j MASQUERADE
    $IPTABLES -I FORWARD -i $INT -j ACCEPT
    echo "NAT Enabled"

else
    #echo "NAT Disabled"
    echo 0 > /proc/sys/net/ipv4/ip_forward
    $IPTABLES -t nat -F
    $IPTABLES -t nat -X
    $IPTABLES -P FORWARD DROP
fi


##############
#Setup Chains#
##############
$IPTABLES -A bad_tcp_packets -p tcp ! --syn -m state --state NEW -j DROP
$IPTABLES -A allowed -p TCP --syn -j ACCEPT
$IPTABLES -A allowed -p TCP -m state --state ESTABLISHED,RELATED -j ACCEPT
$IPTABLES -A allowed -p TCP -j DROP


#############################
#Leave loopback device alone#
#############################
$IPTABLES -A INPUT -p ALL -i $LOOPBACK -j ACCEPT


#####################################
#setup defaults for outgoing packets#
#####################################
$IPTABLES -A OUTPUT -p TCP -j bad_tcp_packets
$IPTABLES -A OUTPUT -p ALL -j ACCEPT


#####################################################
#Parse port lists and set up rules from command line#
#####################################################
echo "Packets traverse rules from top to bottom."
echo "If a packet does NOT match, the packet is dropped"
echo
echo "Interface | TCP/UDP |  Port(s)  | Type"
fncParsePorts
fncCheckICMP
fncAssignRules
fncAssignChains

echo 

#save config
$SERVICE iptables save

exit 0
#########################
#EOF exit with no errors#
#########################

