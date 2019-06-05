const console = require('console')
const readline = require('readline-sync')
const Ticket = require('./Ticket')

class Display {
  /**
   * Display Constructor
   */
  constructor() {
    this.ticketsPerPage = 10
    this.ticketsPageLimit = 25
    // console colours
    this.reset = '\x1b[0m'
    this.bright = '\x1b[1m'
    this.dim = '\x1b[2m'
    this.underscore = '\x1b[4m'
    this.fgGreen = '\x1b[32m'
    this.fgYellow = '\x1b[33m'
    this.fgBlue = '\x1b[34m'
    this.fgMagenta = '\x1b[35m'
    this.fgCyan = '\x1b[36m'
  }

  /**
   * Prints help menu to console.
   */
  printMenu() {
    console.log(`\n• Press ${this.dim}1${this.reset} to view all tickets`)
    console.log(`• Press ${this.dim}2${this.reset} to view a ticket`)
    console.log(`• Type ${this.dim}exit${this.reset} to close the program`)
  }

  /**
   * Prints welcome message when program is first started.
   */
  printProgramOpen() {
    console.log(
      `${this.bright}${this.fgMagenta}Welcome to the ticket viewer${this.reset}`
    )
  }

  /**
   * Prints farewell message when program is exited.
   */
  printProgramClose() {
    console.log(
      `${this.fgGreen + this.bright}Thank you for using the viewer :)${this.fgCyan +
        this.bright} Goodbye!\n`
    )
    console.log(`${this.reset + this.dim}Created By Arone Susau\n`)
  }

  /**
   * Prints invalid warning when invalid command entered.
   */
  printInvalidCommand() {
    console.log(`\n${this.dim}Sorry, invalid command entered!${this.reset}`)
  }

  /**
   * Simple update message for Zendesk API.
   */
  printRetrivingTickets() {
    console.log(`\n${this.fgYellow}Retriving tickets from zendesk..${this.reset}`)
  }

  printSuccess() {
    console.log(`${this.fgGreen}Sucessfully Retrived Tickets${this.reset}\n`)
  }

  /**
   * Prompt user for input while in general menu.
   *
   * @returns {String} Input from user.
   */
  getGeneralInput() {
    return readline.question(
      `\nType "${this.fgBlue}menu${this.reset}" to view options or "${this.fgBlue}exit${
        this.reset
      }" to close the program.\n>`
    )
  }

  /**
   * Prompt user for input and allow for custom options.
   *
   * @param {String} question Prompt user for input.
   * @param {Object} options Options for readline.
   *
   * @returns {String} Input from user.
   */
  getCustomInput(question, options) {
    return readline.question(question, options)
  }

  /**
   * Prints out multiple tickets in summary form and praginates the output if the ticketsList has a greater length than 25.
   *
   * @param {Array} ticketsList List of all tickets retrived from Zendesk API.
   */
  multiTicketOutput(ticketsList) {
    console.log('Id', 'Subject'.padStart(9, ' '), 'Description'.padStart(53, ' '))
    ticketsList.forEach((ticket, index, list) => {
      if (list.length < this.ticketPageLimit) {
        console.log(ticket.toStringSummary())
      } else {
        // Pauses program if 25 or more results are returned.
        if (index % this.ticketsPerPage === 0 && index != 0) {
          const pageCount = Math.floor(list.length / this.ticketsPerPage)
          const currentPage = Math.floor(index / this.ticketsPerPage)
          readline.question(`\n${currentPage}/${pageCount} - Enter anything for more..\n`)
          console.log('Id', 'Subject'.padStart(9, ' '), 'Description'.padStart(53, ' '))
        }
        console.log(ticket.toStringSummary())
      }
    })
  }

  /**
   * Prints full details for individual ticket.
   *
   * @param {Object} ticket Ticket object returned from Zendesk API.
   */
  singleTicketOutput(ticket) {
    console.log(new Ticket(ticket).toStringAllDetails())
  }
}

module.exports = Display
