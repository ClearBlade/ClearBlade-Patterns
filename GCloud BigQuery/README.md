# BigQuery Integration with ClearBlade  

## Delete  
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in delete.js and hit __Save__  
- Required parameters for delete.js are project ID and dataset ID  

## Get  
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in get.js and hit __Save__  
- Required parameters for get.js are project ID and dataset ID  

## Insert    
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in insert.js and hit __Save__  
- Required parameters for insert.js are project ID and request body  
- Request body format should be as follows:  
```
{
  "kind": "bigquery#dataset",
  "etag": etag,
  "id": string,
  "selfLink": string,
  "datasetReference": {
    "datasetId": string,
    "projectId": string
  },
  "friendlyName": string,
  "description": string,
  "defaultTableExpirationMs": long,
  "access": [
    {
      "role": string,
      "userByEmail": string,
      "groupByEmail": string,
      "domain": string,
      "specialGroup": string,
      "view": {
        "projectId": string,
        "datasetId": string,
        "tableId": string
      }
    }
  ],
  "creationTime": long,
  "lastModifiedTime": long,
  "location": string
}  
```

## List  
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in list.js and hit __Save__  
- Required parameter for list.js is project ID  

## Update  
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in update.js and hit __Save__  
- Required parameters for update.js are project ID, dataset ID and request body  
- Request body format should be as follows:  
```
{
"datasetReference": {
    "datasetId": string,
    "projectId": string
  }
  } 
 ``` 