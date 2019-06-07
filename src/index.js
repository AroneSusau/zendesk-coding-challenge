'use-strict'
;(async function main() {
  // Client Display
  const Display = require('./modules/Display')
  const display = new Display()
  // Ticket Requester
  const HttpTicketRequest = require('./modules/HttpTicketRequest')
  const requester = new HttpTicketRequest()

  // Named Arguments
  let PROGRAM_RUNNING = true
  const PRINT_MENU = 'menu'
  const EXIT_PROGRAM = 'exit'
  const FETCH_ALL_TICKETS = '1'
  const FETCH_TICKET_BY_ID = '2'
  const HAVE_ERROR_OCCUR = null

  display.welcomeMessage()
  requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@') //display.getUsername(), display.getPassword())

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
      while (scrolling) {
        let ticketsList = await requester.retrieveAllTickets(nextPage)
        if (ticketsList != HAVE_ERROR_OCCUR) {
          display.fetchMessage()
          display.allTicketsOutput(ticketsList)
          display.areAllTicketsRetrieved(ticketsList.nextPage)
          nextPage = ticketsList.nextPage
        } else nextPage = null
        scrolling = nextPage
      }
    } else if (userInput === FETCH_TICKET_BY_ID) {
      display.fetchMessage()
      const ticketId = display.getTicketId()
      const ticket = await requester.retrieveTicketById(ticketId)
      display.singleTicketOutput(ticket)
    } else {
      display.invalidInputMessage()
    }
  }
})()
