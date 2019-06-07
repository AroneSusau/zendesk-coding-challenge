// config file
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  PROGRAM_RUNNING: true,
  PRINT_MENU: 'menu',
  EXIT_PROGRAM: 'exit',
  FETCH_ALL_TICKETS: '1',
  FETCH_TICKET_BY_ID: '2',
  HAVE_ERROR_OCCUR: null
}
