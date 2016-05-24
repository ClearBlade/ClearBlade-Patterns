# BigQuery Integration with ClearBlade  

In order to use the APIs given below, you need to first authenticate with Google and get an auth token back. You will then need to pass on the auth token to the APIs below. Documentation for authorization with Google can be found at https://cloud.google.com/bigquery/authentication

## Delete  
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in delete.js and hit __Save__  
- Required parameters for delete.js are token, project ID and dataset ID  

## Get  
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in get.js and hit __Save__  
- Required parameters for get.js are token, project ID and dataset ID  

## InsertAll
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in insertAll.js and hit __Save__  
- Required parameters for insert.js are token, project ID, datasetID, tableID and request body
- Enter the required fileds you wish to add to your BigQuery table in the JSON Array of the POST body as follows:
```
{
  "rows": 
  [
    {
      "json": 
      {
        "column1": "value",
        "column2": "value"
      }
    }
  ]
} 
```  
 

## Insert    
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in insert.js and hit __Save__  
- Required parameters for insert.js are token, project ID and request body  
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
- Required parameters for list.js are token and project ID  

## Update  
- Create a new Code Service and require the __http__ library  
- Copy and paste the code in update.js and hit __Save__  
- Required parameters for update.js are token, project ID, dataset ID and request body  
- Request body format should be as follows:  
```
{
"datasetReference": {
    "datasetId": string,
    "projectId": string
  }
} 
``` 
