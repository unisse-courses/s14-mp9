# s14-mp9, Locker Logbook
## Team Members:
* Lapan, Jessamyn Kristi
* Chen, Ysabelle Chloe Tan


**Heroku Link**: 
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
3. Create an account for your MongoDB Atlas project
4. Connect Robo 3T with MongoDB Atlas

**Create a new project in MongoDB Atlas.**
Of course, name your project.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas.png)

Then add your groupmates' addresses to the MongoDB Atlas Project
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas2.png)

**Create a new cluster in MongoDB Atlas.**
Click on the 'Build a Cluster' button.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas3.png)

Choose the free Shared Clusters
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas4.png)

Choose a region to host your cluster, or don't do anything at all.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas5.png)

Wait for the cluster to be fully created.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas6.png)

**Connect to the cluster**
Connect to the cluster
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/connect.png)

Connect to your application. In this case, Robo3T
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/connect2.png)

Copy the link of the connection string, and then replace the "<password>" segment with your own. 
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/connect3.png)

**Create or use an existing connection in Robo 3T.**
Set type to Replica Set.
Name the database anything.
Paste the link to the From SRV text field below, and then click the From SRV button. The clusters will then show up.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/robo.png)

Check personal authentication.
Databse should be named "admin"
Enter your Database username and password.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/robo2.png)

Authentication Method is "Use CA Certificate"
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/robo3.png)

### Adding Default Data to MongoDB Atlas
1. Add the admin's credentials, as listed below.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/datadef.png)

2. Create a new collection called "termdates" 
Click on Add My Own Data button
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas8.png)

"test" was used a sample. However, "termdates" is, of course, created with the same method.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas9.png)

Done! Now you can add data.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/atlas10.png)

The only datum in the "termdates" database because it only stores the start and end dates of locker reservation. Everytime new dates are entered, the old dates are deleted and then the datum for the new dates are entered.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/datadef2.png)

## Using and Exploring the Application
After initializing the necessary tools to run the application, you can now use the application itself. 

For the current phase, zoom your web browser to 80% for better navigation of the application.

### User Mode
The typical person using the application. Only has control of viewing, reserving, and abandoning a locker and viewing and editing their profile.

### Login and Register
For the users' conveniency, both the log in and register features are in the same page.
Login
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web1.png)
Register
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web2.png)

#### Home
The main page of the logged in user.

User Home
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web3.png)

#### View Current Locker
This page is a quick view of the user's current locker, whether reserved, owned, or abandoned. 
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web4.png)

If the user does not own a locker, the user is given a quick button to the View Lockers page to find a locker to reserve.
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web17.png)

Otherwise, the current locker of the user and its details like its locker code and address are shown.

#### View Lockers and Reserve One
The user can view a catalog of lockers from a selected location to seek one to reserve. 
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web5.png)

Unless already reserved, owned, or the user already owns/reserves/abandons a locker, the user can reserve a locker in a location of their choice. 

After reserving the locker, the user either had the option to reserve or cancel the reservation. 
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web18.png)

#### Search Lockers
The search function for the lockers is currently very limited. Only select one of the radio boxes and then type an exact locker number or an exact location name. You cannot even reserve lockers in the search page yet.

Location Results
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web7.png)

Locker Results
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web8.png)

#### Profile
The profile shows the credentials of the user such as their full name, ID number, degree program, e-mail address, and mobile number. 
Everything except for the ID number can be edited in Edit Profile. 

Profile
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web9.png)

Edit Profile
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web10.png)

### Admin Mode
The admin has the control on locker management. Not only they can add, edit, and delete lockers, but also set the start and end dates for locker reservation. The admin is the very first user registered in the application, as previously demonstrated.
The admin may be a user, but unlike a regular one, the admin does not have a profile of their own.

#### Managing lockers
The admin can do the following when managing lockers:
1. Add Locker
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web19.png)

2. Delete Lockers
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web20.png)

3. Editing Lockers by clicking directly on a locker
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web24.png)

4. Adding New Locations
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web22.png)

5. Deletng Locations
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web25.png)

6. Setting the Term Dates to mark the span allowed to reserve a locker.


Locker Manager
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web13.png)

Date Manager
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web14.png)

#### Managing Pending Locker Reservations
This page shows users' reservation and abandonment requests and views all the currently owned lockers. To organize the tables more neatly, two dividers for the tables of reserved lockers and owned and abandoned lockers. The reservation table is separated from the owned and abandoned tables, which are grouped together.

Two buttons for accepting and rejecting requests are in the reservation and abandonment tables.

Reserved Locker Requests
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web15.png)

View Owned Lockers and Abandon Locker Requests
![alt-text](https://github.com/unisse-courses/s14-mp9/blob/master/readme-images/web16.png)
