#Sending Emails Using MailGun

## Overview
This repository allows you to send e-mails with ClearBlade via the Mailgun API, which uses the HTTP Protocol. You can choose to create a new domain for your outgoing e-mails, or use the mailgun domain. Sample code to send an e-mail is given in **SendMail.js**.

## Usage
Log into your Mailgun account, and view the Domain tabs to find the following values:
>1. Replace <YOUR_API_KEY> with Mailgun API key
>2. Replace <YOUR_DOMAIN> with your Mailgun Domain
>3. Replace <RECIPIENT_EMAIL>, <SUBJECT>, and <MESSAGE_BODY>
>4. Add 'clearblade' and 'http' to your Required Libraries (Settings > Requires > Add)

## Further Documentation
https://documentation.mailgun.com/quickstart.html
