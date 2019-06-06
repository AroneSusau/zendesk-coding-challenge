const Display = require('./modules/Display')
const view = new Display()

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

  view.printWelcomeMessage()
  requester.setLoginCredentialsAndHeaders(view.getUsername(), view.getPassword())

  while (programRunning) {
    let input = view.getGeneralInput()

    if (input === PRINT_MENU) {
      view.printMenu()
    } else if (input === EXIT_PROGRAM) {
      programRunning = !programRunning
      view.printGoodbyeMessage()
    } else if (input === FETCH_ALL_TICKETS) {
      view.multiTicketOutput(await requester.retriveTickets(FULL_LIST))
    } else if (input === FETCH_TICKET_BY_ID) {
      view.singleTicketOutput(
        await requester.retriveTickets(SINGLE_BY_ID, view.getTicketId())
      )
    } else {
      view.printInvalidInputMessage()
    }
  }
})()
