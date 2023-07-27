# delib-5
## Strategy
### Goal
The goal of delib 5 is to be a B2C deliberative app with many methods of deliberation.
### What is deliberation
Deliberation stands as an informed and inclusive mode of discussion, aiming to discover the most optimal solution for all stakeholders while ensuring minimal harm to the interests of the minority.
### Theory of Deliberation
There are many theories of deliberation vast. A partial summary of the theory we use can be found on this site. 

### Development History
Before Delib 5, there were Delib 1, 2, 3, and 4. We have experimented with all of them in many scenarios. Delib 5 is built upon the experience gained using them.
### Target users
Targeting a diverse audience, our platform welcomes individuals seeking to collaboratively reach agreements, whether a group of friends, a thriving community, or even a national-scale initiative, spanning from small gatherings to millions of participants.

## Design
The main Information architecture of the app is based on WhatsApp IA.

There is the main screen, which contains “statements.”:

![Main architecture](https://github.com/delib-org/delib-5/blob/main/DESIGN/imgs/01.png)

Within Delib, the focal points revolve around three essential entities: "person," "statement" (הגד), and "evaluation." Each person enjoys the freedom to craft multiple statements (1:n), with others having the opportunity to engage through responses within a designated container (statement screen), thereby facilitating collaborative evaluation of each other's input. Statements are subsequently ordered based on these evaluations to streamline the process further. Leveraging the power of "general good" algorithms, individuals can easily identify statements that best alignment of interests, fostering a harmonious convergence of perspectives.
A statement can be just a statement or become a container for other statements.

This can help deliberation become an infinite discussion on the one hand. On the other hand, every statement-container can summarise the discussion for the whole container and represent the best alignment of interests, thus summarising a long discussion into one or a few lines.
Technology
The technology stack was designed to help the initial creator to build the app fast while using widespread technologies that new volunteers can adopt. The technologies are React in the frontend and Firebase in the backend. If there is a demand to change the backend to more traditional technology, volunteers can develop a node-express/nest-socket-MongoDB backend.


