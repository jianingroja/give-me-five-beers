# Give me five beers 🍻

## Background

We are heavily attached to different apps daily, and we are pressured with finishing tasks in time. Sometimes we get too serious, and forget to enjoy.

I believe that we need more unconditional emotional affirmations, and just as important, we need treats for the palate. Give me five beers is designed to be used as less as possible, and give users as much amount of joy as possible, for beer lovers and future beer lovers.

Among craft beer lovers, Untapped is with no doubt the most popular community platform. Sometimes I find it unclear whether a registered venue is a craft bar, or a cozy place for gathering. And with their termination of public api, I had the idea of collecting data of good craft beer bars that have been visited and verified by us beer consumers, for the well deserved treat that we need in some occasions.

For now, I have created a small dataset including craft beer bars in the city of Barcelona. I have been to each of them at least once and think there is a fair amount of high quality craft beer on tap in every one of them. Some are taprooms for local breweries, some are cozy craft bars run by enthusiast, devoeted to promote craft beer culture among the neighborhood, and well connected with national as well as international breweries.

Ambitiously, I would like to reach out to the bars and gather updated information of taps, to be displayed together with suggested location. I would also like to enrich the collection of the dataset, documenting more craft bars in different cities around the world. If the description above sounds like your way of enjoying beer, please feel free to reach out by creating a pull request, or by email, I would be more than happy to collaborate, add your collection into the dataset and keep building our 'supply'.

## Getting started

### Uasge

In client and server folder, execute these commands:

```
npm i
npm run dev
```

### Environment variables

In client and server folder, refer to the `.env.example` files.

## Tech stack

This project is built with MERN stack, fully written in Typescript.

### Frontend

- React, React Router
- Redux, RTK Query
- Vanilla Css

### Backend

- Node.js
- Express
- Mongo DB Atlas
- Mongoose

### Testing

- Cypress

## UX

User can configure a _beer time_ to indicate "morning" and "evening", the default is 18:00.
If the user leaves the app at any stage, when the user come back in the same day, the app should remain the same.

### In the morning

- User can add todo.

#### Stages:

#### There is added todo:

- show reminder
- show todo input
- show todo list

#### There is no added todo:

- show reminder
- show todo input

### In the evening

- User cannot add todo.
- User can mark todo.
- User can see beer options after all todos are marked.

#### Stages:

#### There is added todo:

- show todo list
- show mark todo buttons
- show affirmation box

#### There is no added todo:

- show reminder

#### There is no chosen beer options:

- show beer options
- show beer information

#### There is chosen beer options:

- show beer information
