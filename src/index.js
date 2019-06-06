'use-strict'
const Display = require('./modules/Display')
const display = new Display()

const HttpTicketRequest = require('./modules/HttpTicketRequest')
const requester = new HttpTicketRequest()

/**
 * Program entry point
 */
;(async function main() {
  // Named Arguments
  let programRunning = true
  let PRINT_MENU = 'menu'
  let EXIT_PROGRAM = 'exit'
  let FETCH_ALL_TICKETS = '1'
  let FETCH_TICKET_BY_ID = '2'
  let FULL_LIST = true
  let SINGLE_BY_ID = false

  display.welcomeMessage()
  requester.setLoginCredentialsAndHeaders(display.getUsername(), display.getPassword())

  while (programRunning) {
    let userInput = display.getGeneralInput()

    if (userInput === PRINT_MENU) {
      display.menu()
    } else if (userInput === EXIT_PROGRAM) {
      programRunning = !programRunning
      display.goodbyeMessage()
    } else if (userInput === FETCH_ALL_TICKETS) {
      display.multipleTicketOutput(await requester.retriveTickets(FULL_LIST))
    } else if (userInput === FETCH_TICKET_BY_ID) {
      display.singleTicketOutput(
        await requester.retriveTickets(SINGLE_BY_ID, display.getTicketId())
      )
    } else {
      display.invalidInputMessage()
    }
  }
})()
