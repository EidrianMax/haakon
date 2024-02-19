# Haakon API

## Api Support Features

- Users can signup and login to their accounts
- Public (non-authenticated) users can access all games
- Authenticated users can access your game library

## Getting started

- The develop branch is the most stable branch at any given time, ensure you're working from it.
- Run npm install to install all dependencies
- You can either work with the default mLab database or use your locally installed MongoDB.
- Create an .env file in your project root folder and add your variables. See .env.sample for assistance.

### Development

1. Install database

```sh
  # in api/
  cd database/
  npm run install
```

2. Install services

```sh
  # in api/
  cd service/
  npm run install
```

3. Install api

```sh
  # in api/
  npm run install
```

## API Endpoints

| HTTP Verbs | Endpoints                   | Action                               |
| ---------- | --------------------------- | ------------------------------------ |
| POST       | /api/users                  | To sign up a new user account        |
| POST       | /api/user/auth              | To login an existing user account    |
| GET        | /api/users                  | To get user information              |
| PATCH      | /api/users                  | To modify user information           |
| DELETE     | /api/users                  | To delete a user                     |
| GET        | /api/users/favs             | To get a fav games in user           |
| ADD        | /api/users/favs/:gameFav    | To add a fav game in user            |
| DELETE     | /api/users/favs/:gameFav    | To delete a fav game in user         |
| GET        | /api/users/played           | To get a played games in user        |
| ADD        | /api/users/played/:gameFav  | To add a played game in user         |
| DELETE     | /api/users/played/:gameFav  | To delete a played game in user      |
| GET        | /api/users/playing          | To get a playin games in user        |
| ADD        | /api/users/playing/:gameFav | To add a playin game in user         |
| DELETE     | /api/users/playing/:gameFav | To delete a playin game in user      |
| GET        | /api/games                  | To get search games or get all games |
| GET        | /api/games/:gameId          | To get get details of a single game  |

## Running the tests

```sh
  cd services/
  npm run test
```
