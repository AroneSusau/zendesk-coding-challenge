'use-strict'
const HttpTicketRequest = require('./HttpTicketRequest')
const requester = new HttpTicketRequest()
const console = require('console')
const readline = require('readline-sync')

/**
 * Prints menu help to console.
 */
const printMenu = () => {
	console.log('\nPress 1 to view all tickets')
	console.log('Press 2 to view a ticket')
	console.log('Type quit to exit')
}

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
 *
 */
const viewAllTickets = async () => {
	let username = 'arone.s@live.com.au'
	let password = 'Arone2019@'
	let apiResponse
	let ticketsList

	console.log('\nRetriving tickets from zendesk..\n')

	requester.setLoginCredentials(username, password)
	apiResponse = await requester.fetchZendeskTickets()
	ticketsList = requester.formatTickets(apiResponse.tickets)

	ticketsList.forEach(paginateTicketOutput)
}

const viewASingleTickets = () => {}

/**
 * Program entry point.
 */
const main = async () => {
	console.log('Welcome to the ticket viewer.')
	let ticketViewInUse = true

	while (ticketViewInUse) {
		let userAction = readline.question(
			'\nType "menu" to view options or "exit" to end the program.\n\n>'
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
