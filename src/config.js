// config file
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  port: process.env.PORT,
  MENU: 'menu',
  EXIT: 'exit',
  GET_ALL_TICKETS: '1',
  GET_TICKET_BY_ID: '2'
}
