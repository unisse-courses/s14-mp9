# s14-mp9, Locker Logbook
## Team Members:
* Lapan, Jessamyn Kristi
* Chen, Ysabelle Chloe Tan

# How to Use This Web Application

## Setting Up the Application
Before actually using the application, the user is required to do the following:
1. Install NPM/Node Packaging Manager and its Frameworks
2. Install Database Tools.

### Install NPM/Node Packaging Manager and its Framework
1. Access the directory of the application by
Using this command on cmd or git-bash.
```
cd ___________
```

or
Directly entering cmd on the File Explorer folder of your directory.


2. Initialize NPM.
```
npm init
```
You can enter without modifying values as you install until you reach this question:


3. The following should be installed:
    * express
    * express-session
    * http
    * body-parser
    * cookie-parser
    * mongoose
    * path
    * handlebars
    * express-handlebars

The format to install the frameworks
```
npm install _____
```

Example:
```
npm install express
```

### Installing Database Tools
1. Install Robo 3T through this link: https://robomongo.org/download
2. Log in or register an acccount for MongoDB Atlas
3. Connect Robo 3T with MongoDB Atlas

Create a new project in MongoDB Atlas.
Create a new cluster in MongoDB Atlas.


Create or use an existing connection in Robo 3T.

## Using and Exploring the Application
After initializing the necessary tools to run the application, you can now use the application itself. 

For the current phase, zoom your web browser to 80% for better navigation of the application.

### User Mode

#### View Current Locker

#### View Lockers and Reserve One

#### Profile
The profile shows the credentials of the user such as their full name, ID number, degree program, e-mail address, and mobile number. 
Everything except for the ID number can be edited in Edit Profile. 

### Admin Mode
The admin has the control on locker management. Not only they can add, edit, and delete lockers, but also set the start and end dates for locker reservation. The admin is the very first user registered in the application, as previously demonstrated.
The admin may be a user, but unlike a regular one, the admin does not have a profile of their own.

#### Managing lockers


#### Managing Pending Locker Reservations
