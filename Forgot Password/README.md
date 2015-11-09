# Pattern for generating reset token when user wants to change password

- This service can be executed only by the user who has admin priviledges

- Email of the user who wants to change his password should be given as parameter
- A reset collection should be created that has admin rights
- If the user exists in user table, reset token will be generated and put in reset collection
- Reset token will be mailed to user which can be used to change password

- The sample code is given in ForgotPassword.js
- ClearBlade and Mailer libraries need to be imported
- Edit the credentials as indicated in sample code