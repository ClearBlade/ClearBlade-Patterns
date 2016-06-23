# Using the SEWIO Packet Sniffer with ClearBlade  

This contains the code and the ClearBlade System to capture Zigbee packets from the SEWIO packet sniffer and parse them on the ClearBlade Platform. It also contains an adapter in Python which takes the packets captured by the sniffer and sends it to a Code Service on the ClearBlade Platform for parsing. 

## Prerequisites  
- ClearBlade Python API - https://github.com/ClearBlade/Python-API  
- cb-cli tool - http://docs.clearblade.com/v/2/4-Developer_Reference/CLI/1_GettingStarted/ 
- Setup the SEWIO OpenSniffer using the instructions given on their website - http://www.sewio.net/open-sniffer/sniffer-installation/  

## Importing the "Packet_Sniffer" System to ClearBlade  
- ```cd``` into the __Packet_Sniffer__ directory and run ```cb-cli import -importrows -importusers```  
- The cb-cli tool will ask you for the platform URL, dev email and password  
- If the import succeeds, the __Packet Sniffer__ system will be visible in your ClearBlade console  
- Log on to your account and in the __Auth__ tab of the console, change the password for the __test@clearblade.com__ account  

## Starting the Adapter  
- Open the __snifferAdapter.py__ file and change the ```PASSWORD``` with the one you changed for the __test@clearblade.com__ user and change ```PLATFORM_URL``` with the URL of your ClearBlade account. For ex. if your account is on https://platform.clearblade.com, change the url to https://platform.clearblade.com  
- The packet sniffer has an IP address of 10.10.10.2 and it sends packets to 10.10.10.1, which is why the adapter listens on 10.10.10.1  
- Start the adapter by running ```sudo python snifferAdapter.py```  
- If everything is setup correctly, you should see packets being parsed and sent back to the adapter  
