# SNMP Protocol integration for ClearBlade

This is an example of a SNMP manager in Java which sends information received from different SNMP Agents to the ClearBlade Platform for processing. The platform processes this information and stores it in a Collection. 

## Create a System on the ClearBlade Platform  
- Create a new System on the ClearBlade Platform  
- Create a new Collection named ___SNMP_Data__ with columns ___oid___ (string) and ___received_data___ (string) with all permissions for an authenticated user  
- Create a new Code Service and copy and paste the code from snmp.js  
- Require the __clearblade__ and __log__ library and make sure logging is __Enabled___ for this Code Service  
- Create a new messaging Trigger for this Code Service for a Publish on the topic __snmp-test__  
- Make sure you have set execute permissions for the authenticated user for this Code Service  
- Finally go to the __Auth__ tab and create a new user 

## Importing project in Eclipse
- Open Eclipse and go to File->Import and select __Existing Java Project__ and import the __clearblade-snmp__ project
- You will need to change the credentials in ClearBladeSNMP.java
- Replace ```SYSTEM_KEY, SYSTEM_SECRET, PLATFORM_URL, MESSAGING_URL, EMAIL, PASSWORD``` with your own
- Choose the OID that you want to get information from and replace the ```OID``` string with yours
- When you run the program, the SNMP data will be added to the Collectoion on the ClearBlade Platform