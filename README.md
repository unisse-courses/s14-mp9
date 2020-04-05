# s14-mp9, Locker Logbook
## Team Members:
* Lapan, Jessamyn Kristi
* Chen, Ysabelle Chloe Tan

# How to Use This Web Application

## Setting Up the Application
Before actually using the application, the user is required to do the following:
1. Install NPM/Node Packaging Manager and its Frameworks
2. Install Database Tools.
3. Add certain data to MongoDB Atlas

### Install NPM/Node Packaging Manager and its Framework
1. Access the directory of the application by
Using this command on cmd or git-bash.
```
cd ___________
```

or


Directly entering cmd on the File Explorer folder of your directory.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/cmd.png)

2. Initialize NPM.
```
npm init
```

You can enter without modifying values as you install until you reach this question:
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/cmd3.png)

Type in "yes", and your packages are installed.

3. The following should be installed:
    * express
    * express-session
    * http
    * body-parser
    * cookie-parser
    * mongoose
    * mongodb
    * path
    * handlebars
    * express-handlebars

The format to install the frameworks in cmd or git-bash:
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
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas.png)
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas2.png)

Create a new cluster in MongoDB Atlas.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas3.png)
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas4.png)
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas5.png)
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas6.png)

Connect to the cluster
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas7.png)

Create or use an existing connection in Robo 3T.


### Adding Default Data to MongoDB Atlas
1. Add the admin's credentials, as listed below.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/datadef.png)

2. Create a new collection called "termdates" 
"test" was used a sample. However, "termdates" is, of course, created with the same method.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas8.png)
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas9.png)
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas10.png)

The only datum in the database because it only stores the start and end dates of locker reservation.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/datadef2.png)

## Using and Exploring the Application
After initializing the necessary tools to run the application, you can now use the application itself. 

For the current phase, zoom your web browser to 80% for better navigation of the application.

### User Mode
The typical person using the application. Only has control of viewing, reserving, and abandoning a locker and viewing and editing their profile.

### Login and Register
For the users' conveniency, both the log in and register features are in the same page.

#### View Current Locker
This page is a quick view of the user's current locker, whether reserved, owned, or abandoned. 

If the user does not own a locker, the user is given a quick button to the View Lockers page to find a locker to reserve.

Otherwise, the current locker of the user and its details like its locker code and address are shown.

#### View Lockers and Reserve One
The user can view a catalog of lockers from a selected location to seek one to reserve. 

Unless already reserved, owned, or the user already owns/reserves/abandons a locker, the user can reserve a locker in a location of their choice. 

After reserving the locker, the user either had the option to reserve or cancel the reservation. 

#### Profile
The profile shows the credentials of the user such as their full name, ID number, degree program, e-mail address, and mobile number. 
Everything except for the ID number can be edited in Edit Profile. 

### Admin Mode
The admin has the control on locker management. Not only they can add, edit, and delete lockers, but also set the start and end dates for locker reservation. The admin is the very first user registered in the application, as previously demonstrated.
The admin may be a user, but unlike a regular one, the admin does not have a profile of their own.

#### Managing lockers
The admin can do the following when managing lockers:
1. Add Locker
2. Delete Lockers
3. Editing Lockers
4. Adding New Locations
5. Deletng Locations
6. Setting the Term Dates to mark the span allowed to reserve a locker.

#### Managing Pending Locker Reservations
This page shows users' reservation and abandonment requests and views all the currently owned lockers. To organize the tables more neatly, two dividers for the tables of reserved lockers and owned and abandoned lockers. The reservation table is separated from the owned and abandoned tables, which are grouped together.

Two buttons for accepting and rejecting requests are in the reservation and abandonment tables.

