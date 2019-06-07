'use-strict'
/**
 * Program Entry Point
 */
;(async function main() {
  // Client Display
  const View = require('./components/View/View')
  const view = new View()
  // Ticket Requester
  const HttpTicketRequest = require('./components/HttpTicketRequest/HttpTicketRequest')
  const requester = new HttpTicketRequest()

  // Named Arguments
  var {
    PROGRAM_RUNNING,
    PRINT_MENU,
    EXIT_PROGRAM,
    FETCH_ALL_TICKETS,
    HAVE_ERROR_OCCUR,
    FETCH_TICKET_BY_ID
  } = require('./config')

  view.welcomeMessage()
  requester.setLoginCredentialsAndHeaders(process.env.USERNAME, process.env.PASSWORD)

  // Main program loop
  while (PROGRAM_RUNNING) {
    let userInput = view.getGeneralInput()

    if (userInput === PRINT_MENU) {
      view.menu()
    } else if (userInput === EXIT_PROGRAM) {
      PROGRAM_RUNNING = !PROGRAM_RUNNING
      view.goodbyeMessage()
    } else if (userInput === FETCH_ALL_TICKETS) {
      let nextPage = null
      let scrolling = true
      while (scrolling) {
        let ticketsList = await requester.retrieveAllTickets(nextPage)
        if (ticketsList != HAVE_ERROR_OCCUR) {
          view.fetchMessage()
          view.allTicketsOutput(ticketsList)
          view.areAllTicketsRetrieved(ticketsList.nextPage)
          nextPage = ticketsList.nextPage
        } else nextPage = null
        scrolling = nextPage
      }
    } else if (userInput === FETCH_TICKET_BY_ID) {
      view.fetchMessage()
      const ticketId = view.getTicketId()
      const ticket = await requester.retrieveTicketById(ticketId)
      view.singleTicketOutput(ticket)
    } else {
      view.invalidInputMessage()
    }
  }
})()
