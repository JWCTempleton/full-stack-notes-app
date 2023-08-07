# full-stack-notes-app

A full stack notes app -- React front end, Express server and Postgres DB without an ORM

View live: [Note App](https://fullstack-note-app.fly.dev/)

Or, run locally:
To get started open command line, cd to desired directory and run command `git clone git@github.com:JWCTempleton/full-stack-notes-app.git`

then run `npm install`

This won't allow you to fully run the software in local, you will first need to create a .env file in the `notes-backend` directory and create two environment variables: a `DATABASE_URL` set to a PostreSQL database (this can be hosted online or pointed to a DB in a docker file. A local port proxy will also need to be run, for flyctl I run `flyctl proxy 5432 -a *name of db*`) as well as a `SECRET` variable set to the seed value that the password hash will be based on.

With the .env variables configured and the DB proxy started you can run `npm run start` from BOTH the notes-frontend and notes-backend directory.
