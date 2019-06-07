'use-strict'
//Program Entry Point
;(async function main() {
  const Display = require('./components/Display/Display')
  const display = new Display()
  const message = require('./components/Display/Message')
  const HttpTicketRequest = require('./components/HttpTicketRequest/HttpTicketRequest')

  // Named Arguments
  const { MENU, EXIT, GET_ALL_TICKETS, GET_TICKET_BY_ID } = require('./config')
  const requester = new HttpTicketRequest(process.env.USERNAME, process.env.PASSWORD)
  let PROGRAM_RUNNING = true

  display.print(message.welcome)

  // Main program loop
  while (PROGRAM_RUNNING) {
    let userInput = display.getInput(message.main)
    if (userInput === GET_ALL_TICKETS) {
      let scrolling = true
      const apiCaller = await requester.fetchAllTickets()
      display.print(message.fetch)
      while (scrolling) {
        const tickets = await apiCaller()
        tickets ? display.printAllTickets(tickets) : (scrolling = false)
      }
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
