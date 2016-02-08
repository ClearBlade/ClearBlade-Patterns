# Overview

This pattern generates a new user token, which can be used, alongside a dedicated collection, to enable the forgot password feature.

# Usage

>1. Import ClearBlade and Mailer libraries
>2. Replace <COLLECTION_NAME> with the name of a new collection dedicated to storing Tokens
>3. Hard-code admin credentials
>4. Send e-mail with token to user's email

- This service can be executed only by the user who has admin priviledges. 

A non-admin User cannot ask for his or her own forgot password token.

- Reset token will be mailed to user which can be used to change password

What does a user do with this token? It's missing the second part of the feature