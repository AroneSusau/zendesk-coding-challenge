'use-strict'
const HttpTicketRequest = require('./HttpTicketRequest')
const Ticket = require('./Ticket')
const requester = new HttpTicketRequest()
const console = require('console')
const readline = require('readline-sync')

/**
 * Prints menu help to console.
 */
const printMenu = () => {
  console.log('\n• Press 1 to view all tickets')
  console.log('• Press 2 to view a ticket')
  console.log('• Type "exit" to close the program')
}

/**
 * Paginates list of tickets if the list contains more
 * than 25 tickets.
 *
 * @param {Array} ticketsList List of all tickets retrived from Zendesk API.
 */
const paginateTicketOutput = ticketsObject => {
  let ticketsList = requester.formatTickets(ticketsObject.tickets)
  ticketsList.forEach((ticket, index, list) => {
    if (list.length < 25) {
      console.log(ticket.toStringSummary())
    } else {
      // Pauses program if 25 or more results are returned.
      if (index % 10 === 0 && index != 0) {
        readline.question('\nEnter anything for more..\n')
      }
      console.log(ticket.toStringSummary())
    }
  })
}

/**
 * Makes a fetch request to Zendesk API for a single ticket by id and displays it to console.
 */
const singleTicketOutput = apiResponse => {
  const formattedTicket = new Ticket(apiResponse.ticket)
  console.log(formattedTicket.toStringAllDetails())
}

/**
 * Makes a fetch request to Zendesk API for a single ticket and displays it to console.
 */
const viewTicketsManager = async displayTicketsMethod => {
  let apiResponse

  console.log('\nRetriving tickets from zendesk..\n')
  apiResponse = await requester.fetchZendeskTickets()

  if (apiResponse.tickets !== undefined || apiResponse.ticket !== undefined) {
    displayTicketsMethod(apiResponse)
  }
}

/**
 * Sets the user credentials for Zendesk API authentication.
 */
const setInitialCredentials = () => {
  const username = readline.question('\nPlease enter your username..\n>')
  const password = readline.question('\nPlease enter your password..\n>', {
    hideEchoBack: true
  })
  requester.setLoginCredentialsAndHeaders(username, password)
}

/**
 * Program entry point.
 */
const main = async () => {
  console.log('Welcome to the ticket viewer')

  let ticketViewerInUse = true
  setInitialCredentials()

  while (ticketViewerInUse) {
    let userAction = readline.question(
      '\nType "menu" to view options or "exit" to close the program.\n\n>'
    )

    if (userAction === 'menu') {
      printMenu()
    } else if (userAction === '1') {
      // View all tickets
      requester.setUrlForAllTickets()
      await viewTicketsManager(paginateTicketOutput)
    } else if (userAction === '2') {
      // View a single ticket
      let ticketId = readline.question('\nPlease enter the ticket id..\n>')
      requester.setUrlForSingleTicket(ticketId)
      await viewTicketsManager(singleTicketOutput)
    } else if (userAction === 'exit') {
      // Close program
      console.log('\nThank you for using the viewer :)')
      ticketViewerInUse = false
    } else {
      console.log('\nSorry, invalid command entered!')
    }
  }
}

main()
