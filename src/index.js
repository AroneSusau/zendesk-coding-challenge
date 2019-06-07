'use-strict'
//Program Entry Point
;(async function main() {
  const Display = require('./components/Display/Display')
  const display = new Display()
  const message = require('./components/Display/Message')
  const HttpTicketRequest = require('./components/HttpTicketRequest/HttpTicketRequest')
  const requester = new HttpTicketRequest()

  // Named Arguments
  const {
    USERNAME,
    PASSWORD,
    PRINT_MENU,
    EXIT_PROGRAM,
    FETCH_ALL_TICKETS,
    HAVE_ERROR_OCCUR,
    FETCH_TICKET_BY_ID
  } = require('./config')
  let PROGRAM_RUNNING = true
  display.print(message.welcome)
  requester.setLoginCredentialsAndHeaders(USERNAME, PASSWORD)

  const fetchAllTickets = async () => {
    let nextPage = null
    let scrolling = true
    while (scrolling) {
      const ticketsList = await requester.retrieveAllTickets(nextPage)
      if (ticketsList != HAVE_ERROR_OCCUR) {
        display.print(message.fetch)
        display.printAllTickets(ticketsList)
        display.print(ticketsList.nextPage ? message.more : message.done)
        nextPage = ticketsList.nextPage
      } else nextPage = null
      scrolling = nextPage
    }
  }

  // Main program loop
  while (PROGRAM_RUNNING) {
    let userInput = await display.getInput(message.main)
    if (userInput === FETCH_ALL_TICKETS) {
      fetchAllTickets()
    } else if (userInput === FETCH_TICKET_BY_ID) {
      display.print(message.fetch)
      const ticketId = await display.getInput(message.id)
      const ticket = await requester.retrieveTicketById(ticketId)
      display.printSingleTicket(ticket)
    } else if (userInput === PRINT_MENU) {
      display.print(message.menu)
    } else if (userInput === EXIT_PROGRAM) {
      PROGRAM_RUNNING = !PROGRAM_RUNNING
      display.print(message.goodbye)
    } else {
      display.print(message.invalidInput)
    }
  }
})()
