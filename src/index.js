'use-strict'
//Program Entry Point
;(async function main() {
  const Display = require('./components/Display/Display')
  const display = new Display()
  const message = require('./components/Display/Message')
  const TicketFetcher = require('./components/TicketFetcher/TicketFetcher')
  const { MENU, EXIT, GET_ALL_TICKETS, GET_TICKET_BY_ID, TOKEN } = require('./config')
  const requester = new TicketFetcher(TOKEN)
  let PROGRAM_RUNNING = true
  
  display.print(message.welcome)

  // Main program loop
  while (PROGRAM_RUNNING) {
    let userInput = display.getInput(message.main)

    if (userInput === GET_ALL_TICKETS) {
      // Get all tickets
      const apiCaller = await requester.fetchAllTickets()
      let scrolling = true
      display.print(message.fetch)

      while (scrolling) {
        const tickets = await apiCaller()

        if (tickets != null) {
          display.printAllTickets(tickets)

          if (tickets.nextPage != null) {
            // Check if user wants to continue scrolling
            scrolling = display.getInput(message.continueScrolling) == 'n' ? 0 : 1
          }

          display.printNextPageMessage(scrolling, tickets.nextPage)
        } else scrolling = false
      }
    } else if (userInput === GET_TICKET_BY_ID) {
      // Get ticket by id
      const ticketId = display.getInput(message.id)
      display.print(message.fetch)
      display.printSingleTicket(await requester.fetchTicketById(ticketId))
    } else if (userInput === MENU) {
      // Print menu
      display.print(message.menu)
    } else if (userInput === EXIT) {
      // Exit program
      PROGRAM_RUNNING = !PROGRAM_RUNNING
      display.print(message.goodbye)
    } else {
      // Invalid Input
      display.print(message.invalidInput)
    }
  }
})()
