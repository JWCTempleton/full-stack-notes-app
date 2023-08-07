# full-stack-notes-app

A full stack notes app -- React front end, Express server and Postgres DB without an ORM

View live: [Note App](https://fullstack-note-app.fly.dev/)

Or, run locally:
To get started open command line, cd to desired directory and run command `git clone git@github.com:JWCTempleton/full-stack-notes-app.git`

then run `npm install`

This won't allow you to fully run the software in local, you will first need to create a .env file in the `notes-backend` directory and create two environment variables: a `DATABASE_URL` set to a PostreSQL database (this can be hosted online or pointed to a DB in a docker file. A local port proxy will also need to be run, for flyctl I run `flyctl proxy 5432 -a *name of db*`) as well as a `SECRET` variable set to the seed value that the password hash will be based on.

With the .env variables configured and the DB proxy started you can run `npm run start` from BOTH the notes-frontend and notes-backend directory.

## Thoughts on the project:

This was a really fun learning experience and my first fully end to end full stack project. While a note app is realistically a little low on the complexity scale it checked all the boxes of aspects of development I wanted to work on: React design, server design, user creation, and relational database design.

The front end is styled using Material UI-- I thought about designing the front end from scratch but I wanted to get some practice with using a widely used component library. I initially used useState to handle the state of the note data returned from the DB but switched it out for useQuery as state management for the note data to streamline the state usage a little but mostly for the practice.

The backend was initially going to be Mongo but I wanted to lean on my experience with SQL so I went with the relational db (Postgres) instead. I was also initially going to use an ORM (Object Relational Mapper) but instead went with pure SQL statements instead. I didn't want there to be any abstraction, I wanted to know exactly what data I was asking for and receiving.

## Issues and their solutions

The issues I encountered in this project were often of the "It worked in local but not live" variety. One of the first major issues I encountered after hosting the build folder on fly.io was that my front end routing using react-router-dom was no longer working; trying to go to different routes was returning 404 responses. I had to configure the server to return the index page on every route request except for api routes that need to be handled by the server:

```
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

```

Another issue that popped up live that wasn't present in local was the token not being recognized: I was getting an error stating secretOrPrivateKey must have a value. This was confusing because the environment variables were set up seemingly correctly and, again, it was working in local. The solution after googling the Error was to wrap my .env variable in a template literal expression in this way:
`${process.env.YourEnvSecretVariable}`
That solved the problem, no more errors and the token was passed successfully.

## What I would like to add going forward

There are a few additions I want to add to the project. One is the addition of an admin panel which can be used to delete problematic messages and to remove the ability to log in for problematic users.

Another big change I would like to add to the project is to change the backend communication set up from a resource based REST API to a GraphQL based server. While the REST implementation is working well and this project doesn't necessitate a more complex GraphQL implementation for the server, I would like to learn more about GraphQL and I think it would be a fun addition to the project.
