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

  let username = view.getCustomInput('\nPlease enter username..\n>')
  let password = view.getCustomInput('\nPlease enter password..\n>', {
    hideEchoBack: true
  })
  requester.setLoginCredentialsAndHeaders(username, password)

  while (programRunning) {
    let input = view.getGeneralInput()

    if (input === 'menu') {
      view.printMenu()
    } else if (input === 'exit') {
      view.printGoodbyeMessage()
      programRunning = false
    } else if (input === '1') {
      // Get all tickets from Zendesk API.
      view.printRetrivingTickets()
      let response = await requester.retriveTickets(true)
      if (response != null) {
        view.printSuccessMessage()
        view.multiTicketOutput(requester.formatTickets(response))
      }
    } else if (input === '2') {
      // Get all ticket by id from Zendesk API.
      let ticketId = view.getCustomInput('\nPlease enter ticket id\n>')
      view.printRetrivingTickets()
      let response = await requester.retriveTickets(false, ticketId)
      if (response != null) {
        view.printSuccessMessage()
        view.singleTicketOutput(response)
      }
    } else {
      view.printInvalidInputMessage()
    }
  }
})()
