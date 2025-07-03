1.0 My requirement is implement animation on scroll. run "npm install aos --save" from https://github.com/michalsnik/aos

2.0 my requirement is implement user review testimonial. Here we used mdbootstrap Testimonials. first run "npm i mdb-react-ui-kit". then "npm i @fortawesome/fontawesome-free".

3.0 My requirement is creating a auth layout as my authentication contains login, sign up, forget password, reset password

4.0 my requirement is implement react hook form in login page

5.0 My requirement is applying react hook form in Register section

6.0 My requirement is show error in the form if validation is failed

7.0 My requirement is apply authentication using firebase and also create a auth context

8.0 My requirement is create createUserWithEmailAndPassword, signInWithEmailAndPassword, logout and SocialLogin with onAuthStateChange and apply loading. Also create a custom hook for user to avoid call the user by AuthContext in every required component

9.0 my requirement is create a private route that if the user is not logged in it will redirect to the login page

10.0 My requirement is create a Coverage component and show the map of service using react-leaflet leaflet. "npm install react-leaflet leaflet"

11.0 Now my requirement is create a send parcel for user using react hook form

12.0 created the server using ai

13.0 as my requirement is perform crud operation using axios so install axios. for this crud operation with axios created as custom hook useAxiosSecure and create axios here that we can commonly use in all the crud operation.

14.0 my requirement is save the data to the server using post method

15.0 now my requirement is create a dashboard so created a DashBoardLayout

16.0 my requirement is fetch the data using tanstack query. tanstack query is used when we update or delete the data we have to maintain state but using tanstack query this operation is easily handled. so run "npm i @tanstack/react-query"

17.0 My requirement delete data using tanstack query and fetch the data using axiosSecure

18.0 Implement logout

19.0 Implementing user login

20.0 Our requirement is redirect the user where user clicked a private route before login (not working)

21.0 My requirement is implement payment method using stripe js. from "https://github.com/stripe/react-stripe-js" and run "npm install @stripe/react-stripe-js @stripe/stripe-js" in client side.

21.15 our requirement is pay the specific parcel according to id

21.17 Create a PaymentIntent. Note: code is created by ai on that site ai assistant using command "i want to create custom card payment system using node js". then install stripe "npm install stripe". Now follow the step to apply stripe => create account in stripe https://docs.stripe.com/sdks.=> In dashboard if that site u will get Api keys. now copy the publishable key and save to client site dotenv.local => copy the secret key and save to server .env name gateway key.

21.17.12 my requirement is Creates the payment history component to show the payment history by user email

21.18 my requirement is tracking package. The component is created but the feature is not applied because it was the optional in the module

22.0 our requirement is implement name and image upload during registration

23.0 my requirement is create a user database to save user data by email and also check if the user is present during create user account it will not create user in db but if not present it will create user in db. By default add the user role=user

24.0 my requirement is create a user database to save user data during SocialLogin and also check if the user is present during SocialLogin it will not create user in db but if not present it will create user in db. By default add the user role=user. same as 23.0

25.0 Now our requirement is use firebase JWT to authenticate user

26.0 now my requirement is implementing application to be a rider

27.0 my requirement is create get api to send the pending riders data to ui and upon approve or reject the rider status will be save in db

28.0 my requirement is show the approved rider in ui

29.0 my requirement is when from pending rider when admin "Approved" any user the role of the user is changed to "rider" in usersCollection data to the db using email.

30.0 my requirement is admin can search user by email with a single word search and change the user role to admin/ user.

31.0 My requirement is create a admin protected route

32.0 my requirement is as like as verifyFBToken we will also verify admin using custom middleware. as we know the email and token is comes from decoded. we use email here to find the role.

33.0 as we have previously handled interceptors request now we have to also handled interceptors response (as per doc) i.e forcefully redirect to forbidden page or logout user according to status.

34.0 my requirement is assign parcel from parcel collections that are paid but delivery_status pending

35.0 my requirement is assign the parcel to the specific region rider and update the delivery status sending the rider name, email, id to the parcelsCollection

36.0 my requirement is only rider can see his pending deliveries and protect the route as like as AdminRoutes
