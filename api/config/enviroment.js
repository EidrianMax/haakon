require('dotenv').config()

const {
  NODE_ENV,
  PORT,
  MONGO_DB_URI,
  MONGO_DB_URI_DEV,
  MONGO_DB_URI_TEST,
  JWT_SECRET
} = process.env

module.exports = {
  enviroment: NODE_ENV,
  port: PORT,
  mongo: {
    databaseUri: MONGO_DB_URI,
    databaseUriDev: MONGO_DB_URI_DEV,
    databaseUriTest: MONGO_DB_URI_TEST
  },
  jwtSecret: JWT_SECRET
}
