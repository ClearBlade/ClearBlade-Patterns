# MQTT using Node Red

### Install and start Node Red
- Follow instructions to install and startup Node Red from http://nodered.org  

### Create MQTT publish and subscribe nodes
- Drag and drop MQTT publish and subscribe nodes and edit the connection information in either of the nodes.  
![](images/1.png)  

- Setup the publish node
![](images/2.png)  

- Setup the subscribe node
![](images/3.png)  

- Drag and drop an inject node to inject messages into the MQTT publish node and connect the two  
![](images/4.png)  

- Edit the inject node to inject a 'string'
![](images/5.png)  

- Add and connect a debug node after the MQTT subscribe node to receive the incoming messages in the debug tab
![](images/6.png)  

- Hit **Deploy** and check for incoming messages in the debug tab  
![](images/7.png) 
