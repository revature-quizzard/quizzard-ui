# Qwizard* (UI)
This repository contains the frontend of Qwizard.

See the API side of Qwizard here:
https://github.com/revature-quizzard/quizzard-api

Qwizard is a self-study web application made to assist Revature associates
with QC study. Qwizard has two main functions, study and quiz.
Both study and quiz are flashcard-centric.

### Flashcards:
Flashcards are made up of questions and answers. This is the basic
unit of knowledge in Qwizard. Flashcards should contain a meaningful
question, and a brief but complete answer. Flashcards are grouped into
study sets, and associated with a category.

### Study:
A user can select a study set and launch study mode. In study mode users
are presented with the questions one-by-one. At first the answer is obscured.
A user can try to answer the question on their own, and then reveal the answer
in order to check their knowledge.

### Quiz:
A user can also create a quiz from a study set to test themselves. A quiz
randomizes the order of questions, and then generates a selection of wrong
answers for each, randomly selected from the correct answers to other
questions. A user selects an answer for each question, and is given a score.

## UI Structure:
The UI structure should follow ordinary opinionated react and redux patterns.

### Components:
Components are the primary UI unit in react. Components let you split 
the UI into independent, reusable pieces, and think about each piece in isolation.
The top-level component is App, which can be found in App.tsx.

### Remotes:
Remotes are Axios functions used for accessing API endpoints. These are split into 
clients and services. Clients describe a location with HTTP resources and set up 
defaults for reaching those resources. Services are verb-specific functions 
which use a client to access the API endpoints.

### Models:
Models are the front end version of DTOs. These are simple objects containing fields 
used to communicate data throughout the front end and across the API.

As of V0.1 some of these models may be redundant or no longer used.

### Slices:
A "slice" is a collection of Redux reducer logic and actions for a single 
feature in your app, typically defined together in a single file. The name 
comes from splitting up the root Redux state object into multiple "slices" 
of state. -Redux Essentials, Part 2: Redux App Structure
 
 https://redux.js.org/tutorials/essentials/part-2-app-structure
 


 
 
 
 
 *Qwizard has no officially designed spelling.