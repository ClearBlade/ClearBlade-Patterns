# Payment System with Stripe using the ClearBlade Platform

This example creates a new Stripe customer ID from a Stripe token. The Stripe token is generated when the user enters his card details in a HTML form and hits submit. The customer ID can then be used to process payments as per the subscription tier choosen by the user. The recurring payments are done with the help of timers on a Code Service.

### Create a Collection
- Create a new collection to store user details and note the collection ID.
- Create columns firstname, lastname, org, email, stripeid and tier of type string.
- Update permissions to allow CRUD operations.

### Create Libraries
- Copy and paste the code from all of the files in the ```/Libraries``` directory and create new libraries in the ClearBlade Console.
- Require cleablade and http libraries in the libraries that you created.
- Replace the collectionID, email and password with yours.

### Create Code Services
- Copy and paste the code from /Code Services/CreateAccount.js into a new Code Service and require the CreateStripeCustomer and StoreUserDetails libraries.
- Copy and paste the code from /Code Services/GenerateBill.js into a new Code Service and require the CalculateCount and ChargeCustomer libraries. Create a timer for this code service to run it once every month. This code service will calculate the monthly usage and calculate the bill accordingly.

Now you are all set! You just have to create a HTML form that accepts the user's payment information and require Stripe.js library in the ```<script>``` tag. More information can be found at https://stripe.com/docs/tutorials/forms. After this, stripe should generate a token for a particular customer. You will pass this token as a parameter to execute the CreateAccount code service. 
