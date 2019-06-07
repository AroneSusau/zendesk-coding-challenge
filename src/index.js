'use-strict'
//Program Entry Point
;(async function main() {
  const Display = require('./components/Display/Display')
  const display = new Display()
  const message = require('./components/Display/Message')
  const HttpTicketRequest = require('./components/HttpTicketRequest/HttpTicketRequest')
  const requester = new HttpTicketRequest(process.env.USERNAME, process.env.PASSWORD)

  // Named Arguments
  const {
    PRINT_MENU,
    EXIT_PROGRAM,
    FETCH_ALL_TICKETS,
    HAVE_ERROR_OCCUR,
    FETCH_TICKET_BY_ID
  } = require('./config')
  let PROGRAM_RUNNING = true

  display.print(message.welcome)

  // Seperated into own function for readability
  const fetchAllTickets = async () => {
    let nextPage = null
    let scrolling = true
    while (scrolling) {
      display.print(message.fetch)
      const ticketsList = await requester.retrieveAllTickets(nextPage)
      if (ticketsList != HAVE_ERROR_OCCUR) {
        display.printAllTickets(ticketsList)
        display.print(ticketsList.nextPage ? message.more : message.done)
        nextPage = ticketsList.nextPage
      } else nextPage = null
      scrolling = nextPage
    }
  }

  const fetchSingleTicket = async () => {
    const ticketId = display.getInput(message.id)
    display.print(message.fetch)
    const ticket = await requester.retrieveTicketById(ticketId)
    if (ticket) {
      display.print(message.success)
      display.print(ticket.toStringSummary())
    }
  }

  // Main program loop
  while (PROGRAM_RUNNING) {
    let userInput = display.getInput(message.main)
    if (userInput === FETCH_ALL_TICKETS) {
      await fetchAllTickets()
    } else if (userInput === FETCH_TICKET_BY_ID) {
      await fetchSingleTicket()
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
