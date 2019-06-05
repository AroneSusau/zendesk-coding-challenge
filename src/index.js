const Display = require('./modules/Display')
const view = new Display()

const HttpTicketRequest = require('./modules/HttpTicketRequest')
const requester = new HttpTicketRequest()

/**
 * Program entry point
 */
;(async function main() {
  view.printWelcomeMessage()

  let programRunning = true
  let PRINT_MENU = 'menu'
  let EXIT_PROGRAM = 'exit'
  let FETCH_ALL_TICKETS = '1'
  let FETCH_TICKET_BY_ID = '2'
  let FULL_LIST = true
  let SINGLE_BY_ID = false
  let API_ERROR = null

  let username = view.getCustomInput('\nPlease enter username..\n>')
  let password = view.getCustomInput('\nPlease enter password..\n>', {
    hideEchoBack: true
  })
  requester.setLoginCredentialsAndHeaders(username, password)

  while (programRunning) {
    let input = view.getGeneralInput()

    if (input === PRINT_MENU) {
      view.printMenu()
    } else if (input === EXIT_PROGRAM) {
      view.printGoodbyeMessage()
      programRunning = false
    } else if (input === FETCH_ALL_TICKETS) {
      // Get all tickets
      view.printRetrivingTickets()
      let response = await requester.retriveTickets(FULL_LIST)
      if (response != API_ERROR) {
        view.printSuccessMessage()
        view.multiTicketOutput(requester.formatTickets(response))
      }
    } else if (input === FETCH_TICKET_BY_ID) {
      // Get all ticket by id.
      let ticketId = view.getCustomInput('\nPlease enter ticket id\n>')
      view.printRetrivingTickets()
      let response = await requester.retriveTickets(SINGLE_BY_ID, ticketId)
      if (response != API_ERROR) {
        view.printSuccessMessage()
        view.singleTicketOutput(response)
      }
    } else {
      view.printInvalidInputMessage()
    }
  }
})()
