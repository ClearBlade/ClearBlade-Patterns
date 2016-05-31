# GitHub Integration for ClearBlade

## Authenticating with GitHub  
- Create a new Code Service and copy and paste the code from auth.js
- Create a new Library named "Base64" and copy and paste the code from base64.js
- Require the __http__ and __Base64__ libraries in the newly created Code Service
- Required parameters for the authentication are username and password
- Parameter format for the Code Service is:
```
{"username": "your_username", "password": "your_password"}
```

## Getting Repository Details
- Create a new Code Service and copy and paste the code from repo.js
- Require the __http__ library  
- Repo owner, repo name and endpoint and required parameters and depending on the endpoint, the Code Service will get details of a particular repository, get all the repositories for a user or get all repositories for an organization.
- Valid endpoints include "RepoDetails", "UserRepos" and "OrgRepos"
- RepoDetails gets details about a particular repository, UserRepos gets all the repos associated with a user and OrgRepos gets all the repos associated with an organization
- Parameter format for the Code Service is:
```
{"repoOwner": "your_username", "repoName": "repository_name", "endpoint": "RepoDetails OR UserRepos OR OrgRepos"}
```

## Getting Commits  
- Create a new Code Sevice and copy and paste the code from commit.js
- Require the __http__ library
- Repo owner and repo name are required parameters
- Parameter format for the Code Service is:
```
{"repoOwner": "your_username", "repoName": "repository_name"}
```