# delib-5

## Goal

The objective of Delib 5 is to serve as an inclusive B2C deliberative app, offering a diverse array of deliberation methods.
Deliberation stands as an informed and inclusive mode of discussion dedicated to discovering the most optimal solution for all stakeholders while actively striving to minimize any harm to the interests of those who might be adversely affected by the proposed solution.

For more information and a roadmap, please look at the [wiki in this repository](https://github.com/delib-org/delib-5/wiki).

## Installation

The technological stack consists of React-Redux-PWA (built with Vite) and Firebase. To be able to work efficientyl it is better to get femilier with firebase and React, before turning to delib developemnt. 

To install Delib on you local machine, you will have to install the client ```/clint``` and the ```/functions``` node modules:

Go to the root directory and run ```npm i```. 

Go to the functions directory and run ```npm i```.

Then you have to install the emulators. 

To install emulators, first make sure you firebase CLI is installed.

```firebase --version```

If the efirebase cli is not install, run:
```npm install -g firebase-tools``` or ```sudo npm install -g firebase-tools``` if you asre on a macOS.

In firebase console, create a new project and copy the project id.

in ```.firebaserc``` change the project id to the project id you just created.

Then run ```firebase login``` and login with your google account.

Then run ```firebase use <project-id>``` to select the project you just created.

Then run ```firebase init emulators``` and install all the emulators.
# Development mode

Then initlise the emualtors by running:
```firebase init emulators``` and install all the maulators.



make sure that the **devlopment** is uncommented in ```/src/functions/db/config.js```

To run the emulators, run ```npm run deve``` in the root direcotry.
To run client run ```npm run dev``` in the root directory

go to ```localhost:5173``` to see the app, and to ```localhost:5002``` to see the emulators.

When login with google login, create a new user on the popup modal.





