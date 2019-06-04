'use-strict'
const HttpTicketRequest = require('./HttpTicketRequest')
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
 * @param {Ticket} ticket Individial ticket from Array.
 * @param {Number} index Current index value of array.
 * @param {Array} list
 */
const paginateTicketOutput = (ticket, index, list) => {
  if (list.length < 25) {
    console.log(ticket.toStringSummary())
  } else {
    // Pauses program if 25 or more results are returned.
    if (index % 10 === 0 && index != 0) {
      readline.question('\nEnter anything for more..\n')
    }
    console.log(ticket.toStringSummary())
  }
}

/**
 * Makes a
 */
const viewAllTickets = async () => {
  let apiResponse
  let ticketsList

  console.log('\nRetriving tickets from zendesk..\n')
  apiResponse = await requester.fetchZendeskTickets()

  if (apiResponse.tickets != undefined) {
    ticketsList = requester.formatTickets(apiResponse.tickets)
    ticketsList.forEach(paginateTicketOutput)
  }
}

const viewASingleTickets = () => {}

/**
 * Program entry point.
 */
const main = async () => {
  console.log('Welcome to the ticket viewer')

  const username = readline.question('\nPlease enter your username..\n>')
  const password = readline.question('\nPlease enter your password..\n>', {
    hideEchoBack: true
  })
  requester.setLoginCredentialsAndHeaders(username, password)

  let ticketViewInUse = true

  while (ticketViewInUse) {
    let userAction = readline.question(
      '\nType "menu" to view options or "exit" to close the program.\n\n>'
    )

    if (userAction === 'menu') {
      printMenu()
    } else if (userAction === '1') {
      await viewAllTickets()
    } else if (userAction === '2') {
      viewASingleTickets()
    } else if (userAction === 'exit') {
      console.log('\nThank you for using the viewer :)')
      ticketViewInUse = false
    } else {
      console.log('\nSorry, invalid command entered!')
    }
  }
}

main()
