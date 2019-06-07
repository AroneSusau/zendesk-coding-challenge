'use-strict'
//Program Entry Point
;(async function main() {
  const Display = require('./components/Display/Display')
  const display = new Display()
  const message = require('./components/Display/Message')
  const HttpTicketRequest = require('./components/HttpTicketRequest/HttpTicketRequest')

  // Named Arguments
  const { MENU, EXIT, GET_ALL_TICKETS, EMPTY, GET_TICKET_BY_ID } = require('./config')
  const requester = new HttpTicketRequest(process.env.USERNAME, process.env.PASSWORD)
  let PROGRAM_RUNNING = true

  display.print(message.welcome)

  // Seperated into own function for readability
  const fetchAllTickets = async () => {
    let scrolling = true
    while (scrolling) {
      display.print(message.fetch)
      const tickets = await requester.fetchAllTickets()
      if (tickets != EMPTY) {
        display.printAllTickets(tickets)
        display.print(tickets.nextPage ? message.more : message.done)
      } else scrolling = !scrolling
    }
  }

  // Main program loop
  while (PROGRAM_RUNNING) {
    let userInput = display.getInput(message.main)
    if (userInput === GET_ALL_TICKETS) {
      await fetchAllTickets()
    } else if (userInput === GET_TICKET_BY_ID) {
      const ticketId = display.getInput(message.id)
      display.print(message.fetch)
      const ticket = await requester.fetchTicketById(ticketId)
      display.printSingleTicket(ticket)
    } else if (userInput === MENU) {
      display.print(message.menu)
    } else if (userInput === EXIT) {
      PROGRAM_RUNNING = !PROGRAM_RUNNING
      display.print(message.goodbye)
    } else {
      display.print(message.invalidInput)
    }
  }
})()
