'use-strict'
const HttpTicketRequest = require('./HttpTicketRequest')
const requester = new HttpTicketRequest()
const console = require('console')

const readline = require('readline-sync')

function TicketViewerConsole() {
	console.log('Welcome to the ticket viewer.')
	let ticketViewInUse = true

	while (ticketViewInUse) {
		let userAction = readline.question(
			'Type "menu" to view options or "quit" to exit.\n\n>'
		)

		if (userAction === 'menu') {
			printMenu()
		} else if (userAction === 'quit') {
			console.log('\nThank you for using the viewer :)')
			ticketViewInUse = false
		} else if (userAction === '1') {
			viewAllTickets()
		} else if (userAction === '2') {
			viewASingleTickets()
		} else {
			console.log('Sorry, invalid command entered!')
		}
	}
}

TicketViewerConsole()

const printMenu = () => {
	console.log('Press 1 to view all tickets')
	console.log('Press 2 to view a ticket')
	console.log('Type quit to exit')
}

const viewAllTickets = () => {
	let pageNumber = 1
	let ticketsPerPage = 25
	let username = 'arone.s@live.com.au'
	let password = 'Ponus558957@'
	let ticketObject

	requester.setLoginCredentials(username, password)
	ticketObject = await requester.fetchZendeskTickets(pageNumber, ticketsPerPage)
}

const viewASingleTickets = () => {}
