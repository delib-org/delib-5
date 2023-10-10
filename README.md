# delib-5

## Goal

The objective of Delib 5 is to serve as an inclusive B2C deliberative app, offering a diverse array of deliberation methods.
Deliberation stands as an informed and inclusive mode of discussion dedicated to discovering the most optimal solution for all stakeholders while actively striving to minimize any harm to the interests of those who might be adversely affected by the proposed solution.

For more information and a roadmap, please look at the [wiki in this repository](https://github.com/delib-org/delib-5/wiki).

## Installation
The technological stack consists of React-Redux-PWA (built with Vite) and Firebase. To install Delib on you local machine, you will have to install the client ```/clint``` and the ```/functions```.

Go to the root directory and run ```npm i```. 

Go to the functions directory and run ```npm i```.

Then you have to install the emulators. 

To install emulators, first make sure you firebase CLI is installed.

```firebase --version```

If the firebase cli is not install, run:
```npm install -g firebase-tools``` or ```sudo npm install -g firebase-tools``` if you asre on a macOS.

if you still get an error try to give permission to your self as a manager with this command and then run all above commands

```Set-ExecutionPolicy RemoteSigned -Scope CurrentUser```

run the commend below and login to your google account

```firebase login``` 

Then initlise the emualtors by running:
```firebase init emulators```

To run the emulators, run ```npm run dev``` in the root direcotry.
To run client run ```npm run dev``` in the root directory



