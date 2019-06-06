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
  let NO_ID = null

  display.welcomeMessage()
  // add later  - display.getUsername(), display.getPassword()
  requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')

  // Main program loop
  while (programRunning) {
    let userInput = display.getGeneralInput()

    if (userInput === PRINT_MENU) {
      display.menu()
    } else if (userInput === EXIT_PROGRAM) {
      programRunning = !programRunning
      display.goodbyeMessage()
    } else if (userInput === FETCH_ALL_TICKETS) {
      let nextPage = false
      let scrolling = true
      while (scrolling) {
        nextPage = display.multipleTicketOutput(
          await requester.retriveTickets(FULL_LIST, NO_ID, nextPage)
        )
        if (!nextPage) scrolling = !scrolling
      }
    } else if (userInput === FETCH_TICKET_BY_ID) {
      display.singleTicketOutput(
        await requester.retriveTickets(SINGLE_BY_ID, display.getTicketId())
      )
    } else {
      display.invalidInputMessage()
    }
  }
})()
