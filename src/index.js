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
  let PROGRAM_RUNNING = true
  let PRINT_MENU = 'menu'
  let EXIT_PROGRAM = 'exit'
  let FETCH_ALL_TICKETS = '1'
  let FETCH_TICKET_BY_ID = '2'

  display.welcomeMessage()
  // add later  - display.getUsername(), display.getPassword()
  requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')

  // Main program loop
  while (PROGRAM_RUNNING) {
    let userInput = display.getGeneralInput()

    if (userInput === PRINT_MENU) {
      display.menu()
    } else if (userInput === EXIT_PROGRAM) {
      PROGRAM_RUNNING = !PROGRAM_RUNNING
      display.goodbyeMessage()
    } else if (userInput === FETCH_ALL_TICKETS) {
      let nextPage = null
      let scrolling = true
      // Ensures there are no more pages of ticket requests before exiting loop
      while (scrolling) {
        nextPage = display.allTicketsOutput(await requester.retriveAllTickets(nextPage))
        scrolling = nextPage
      }
    } else if (userInput === FETCH_TICKET_BY_ID) {
      display.singleTicketOutput(await requester.retriveTicketById(display.getTicketId()))
    } else {
      display.invalidInputMessage()
    }
  }
})()
