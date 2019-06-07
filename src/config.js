// config file
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  port: process.env.PORT,
  PRINT_MENU: 'menu',
  EXIT_PROGRAM: 'exit',
  FETCH_ALL_TICKETS: '1',
  FETCH_TICKET_BY_ID: '2',
  HAVE_ERROR_OCCUR: null
}
