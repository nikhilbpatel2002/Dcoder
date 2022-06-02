# Dcoder - A Competitive Programming Portal

### Table of Contents
- [Dcoder - A Competitive Programming Portal](#decoder---a-competitive-programming-portal)
- [Functionality](#functionality)
- [Installtion](#installtion)
- [Environment Variable Structure](#environment-variable-structure)
- [How to run ?](#how-to-run-)

## Dcoder - A Competitive Programming Portal
- Dcoder platform is created for programmers.

- User is able to add,edit and delete the questions which are added by himself only. Other users can only read these questions. Also, users can simply use a compiler built in our website and compile/run their code. Users can save multiple codes. One user can’t see the other user's code.

- There are a lot of programming platforms out there each with their own contest, for one programmer it’s hard to keep a map of every contest date, time and duration. This project will help them to see all the contest information at a single place.


* This project uses the [MERN stack](https://www.mongodb.com/mern-stack) :
  * [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)) : database
  * [**E**xpress.js](http://expressjs.com) : backend framework
  * [**R**eact.js](https://reactjs.org/) : frontend framework
  * [**N**ode.js](https://nodejs.org) : runtime environment

* Other tools and technologies used :
  * [Bootstrap](http://www.getbootstrap.com) : layout and styles
  * [Font Awesome](http://fontawesome.com) : icons
  * [Moneco Editor](https://www.npmjs.com/package/@monaco-editor/react) : code editor
  * [Kontests](https://www.kontests.net/) : api for upcomming contests data
 
* Profile images store in [Cloudinary](https://cloudinary.com/)
## Functionality
  - Register, Login / Logout
  - Compile and Run your Code
  - Nice Code editor
  - Code Save and Sharing via link 
  - DSA questions 
  - Upcoming contest information
    - Using APIs from websites like codeforces.com, clist.by system will provide upcoming contest information. this information will contain time for contest, division of contest, link to contest etc. 

## Installtion
- Install [Node.js](https://nodejs.org/en/), [ReactJs](https://reactjs.org/docs/getting-started.html), [MongoDB](https://www.mongodb.com/)
```python
# will download this repository locally
git clone [https://github.com/nikhilbpatel2002/Dcoder.git]
(or manually download this project)
# will install all the dependencies for project
#go to ./server
npm run install-dependecies
#go to ./client
npm run install-dependecies
```

## Environment Variable Structure
```python

MONGO_URL=*****


# Secrect keys given by API: https://www.jdoodle.com/
# Please set it before using application, otherwise cpp and java won't work

JDOODLE_CLIENTID=*****
JDOODLE_CLIENTSECRET=*****


CLOUDINARY_NAME=*****
CLOUDINARY_API_KEY=*****
CLOUDINARY_API_SECRET=*****

```

## How to run ?
```python
# start React server (frontend) 
npm start
# start node.js server (backend)
nodemon index.js
```

<!-- ## Screenshots -->
<!-- - Screenshots are here :) -->
  <!-- ![Decoder](assets/screenshots/decoder.gif) -->
