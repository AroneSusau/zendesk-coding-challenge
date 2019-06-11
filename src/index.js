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
  let userInput

  display.print(message.welcome)

  // Object containing all possible user actions.
  const actions = {
    [MENU]: () => {
      display.print(message.menu)
    },

    [EXIT]: () => {
      display.print(message.goodbye)
      PROGRAM_RUNNING = false
    },

    [GET_TICKET_BY_ID]: async () => {
      const ticketId = display.getInput(message.id)
      display.print(message.fetch)
      display.printSingleTicket(await requester.fetchTicketById(ticketId))
    },

    [GET_ALL_TICKETS]: async () => {
      const apiCaller = await requester.fetchAllTickets()
      let scrolling = true
      display.print(message.fetch)

      while (scrolling) {
        const tickets = await apiCaller()
        if (tickets != null) {
          display.printAllTickets(tickets)
          scrolling = tickets.nextPage && !display.getInput(message.continueScrolling)
          display.printNextPageMessage(scrolling, tickets.nextPage)
        } else scrolling = false
      }
    }
  }

  // Main Loop
  while (PROGRAM_RUNNING) {
    userInput = display.getInput(message.main)

    if (userInput in actions) {
      await actions[userInput]()
    } else {
      display.print(message.invalidInput)
    }
  }
})()
