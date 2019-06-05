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
  console.log('\n• Press \x1b[2m1\x1b[0m to view all tickets')
  console.log('• Press \x1b[2m2\x1b[0m to view a ticket')
  console.log('• Type \x1b[2mexit\x1b[0m to close the program')
}

/**
 * Paginates list of tickets if the list contains more
 * than 25 tickets.
 *
 * @param {Array} ticketsList List of all tickets retrived from Zendesk API.
 */
const paginateTicketOutput = ticketsObject => {
  let ticketsList = requester.formatTickets(ticketsObject.tickets)
  const ticketsPerPage = 10
  const tickPageLimit = 25
  console.log('Id', 'Subject'.padStart(9, ' '), 'Description'.padStart(53, ' '))
  ticketsList.forEach((ticket, index, list) => {
    if (list.length < tickPageLimit) {
      console.log(ticket.toStringSummary())
    } else {
      // Pauses program if 25 or more results are returned.
      if (index % ticketsPerPage === 0 && index != 0) {
        const pageCount = Math.floor(list.length / ticketsPerPage)
        const currentPage = Math.floor(index / ticketsPerPage)
        readline.question(`\n${currentPage}/${pageCount} - Enter anything for more..\n`)
        console.log('Id', 'Subject'.padStart(9, ' '), 'Description'.padStart(53, ' '))
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

  console.log('\n\x1b[33mRetriving tickets from zendesk..\x1b[0m')
  apiResponse = await requester.fetchZendeskTickets()

  if (apiResponse.tickets !== undefined || apiResponse.ticket !== undefined) {
    console.log('\x1b[32mSucessfully Retrived Tickets\x1b[0m\n')
    displayTicketsMethod(apiResponse)
  }
}

/**
 * Sets the user credentials for Zendesk API authentication.
 */
const setInitialCredentials = () => {
  // LEAVE AS IS FOR TESTING PURPOSES - add username/password variables later.
  // const username = readline.question('\nPlease enter your username..\n>')
  // const password = readline.question('\nPlease enter your password..\n>', {
  //   hideEchoBack: true
  // })
  requester.setLoginCredentialsAndHeaders('Arone.s@live.com.au', 'Arone2019@')
}

/**
 * Program entry point.
 */
const main = async () => {
  console.log('\x1b[35m\x1b[1mWelcome to the ticket viewer\x1b[0m')

  let ticketViewerInUse = true
  setInitialCredentials()

  while (ticketViewerInUse) {
    let userAction = readline.question(
      '\nType "\x1b[34mmenu\x1b[0m" to view options or "\x1b[34mexit\x1b[0m" to close the program.\n>'
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
      console.log(
        '\n\x1b[32m\x1b[1mThank you for using the viewer :)\x1b[36m\x1b[1m Goodbye!\n'
      )
      console.log('\x1b[0m\x1b[2mCreated By Arone Susau\n')
      ticketViewerInUse = false
    } else {
      console.log('\n\x1b[2mSorry, invalid command entered!\x1b[0m')
    }
  }
}

main()
