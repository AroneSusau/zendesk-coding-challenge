// config file
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  TOKEN: process.env.TOKEN,
  MENU: 'menu',
  EXIT: 'exit',
  GET_ALL_TICKETS: '1',
  GET_TICKET_BY_ID: '2'
}
