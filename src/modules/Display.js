'use-strict'
const console = require('console')
const readline = require('readline-sync')
// Disables debug output in testing environment
console.log = process.env.NODE_ENV != 'test' ? console.log : function() {}

class Display {
  /**
   * Display Constructor
   */
  constructor() {
    this.subjectPadding = 9
    this.descriptionPadding = 53
    // console colours
    this.reset = '\x1b[0m'
    this.bright = '\x1b[1m'
    this.dim = '\x1b[2m'
    this.underline = '\x1b[4m'
    this.fgRed = '\x1b[31m'
    this.fgGreen = '\x1b[32m'
    this.fgYellow = '\x1b[33m'
    this.fgBlue = '\x1b[34m'
    this.fgMagenta = '\x1b[35m'
    this.fgCyan = '\x1b[36m'
  }

  /**
   * Prints help menu to console.
   */
  menu() {
    console.log(`\n• Press ${this.dim}1${this.reset} to view all tickets`)
    console.log(`• Press ${this.dim}2${this.reset} to view a ticket`)
    console.log(`• Type ${this.dim}exit${this.reset} to close the program`)
  }

  /**
   * Prints welcome message when program is first started.
   */
  welcomeMessage() {
    console.log(
      `${this.bright + this.fgMagenta}Welcome to the ticket viewer${this.reset}\n`
    )
  }

  /**
   * Prints farewell message when program is exited.
   */
  goodbyeMessage() {
    console.log(
      `${this.fgGreen + this.bright}\nThank you for using the Ticket Viewer :)${this
        .fgCyan + this.bright}Goodbye!\n`
    )
    console.log(`${this.reset + this.dim}Created By Arone Susau\n`)
  }

  /**
   * Prints invalid input warning when invalid command entered.
   */
  invalidInputMessage() {
    console.log(`\n${this.dim}Sorry, invalid command entered!${this.reset}`)
  }

  /**
   * Simple update message for successful API requests.
   */
  successMessage() {
    console.log(`${this.fgGreen}Sucessfully Retrived Tickets${this.reset}\n`)
  }

  fetchMessage() {
    console.log(`\n\x1b[33mRetrieving tickets from zendesk..\x1b[0m`)
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
      }" to close the program.\n${this.fgRed}>${this.reset}`
    )
  }

  /**
   * Template prompt for username input
   *
   * @returns {String} Username for basic authentication
   */
  getUsername() {
    return readline.question(`${this.dim + this.underline}Username${this.reset}: `)
  }

  /**
   * Template prompt for password input
   *
   * @returns {String} Password for basic authentication
   */
  getPassword() {
    return readline.question(`${this.dim + this.underline}Password${this.reset}: `, {
      hideEchoBack: true
    })
  }

  /**
   * Template prompt for ticket id input
   *
   * @returns {String} Ticket id for API request.
   */
  getTicketId() {
    return readline.question(`\n${this.dim}Enter Ticket Id${this.reset}: `)
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
   * Prints tickets titles to console.
   */
  tableTitles() {
    console.log(
      'Id',
      'Subject'.padStart(this.subjectPadding, ' '),
      'Description'.padStart(this.descriptionPadding, ' ')
    )
  }

  /**
   * Update message to console if more tickets need to be dispalyed.
   *
   * @param {Mixed} moreComing List of all tickets
   */
  areAllTicketsRetrieved(moreComing) {
    moreComing
      ? console.log(`\n${this.dim + this.fgBlue}Fetching more tickets..${this.reset}`)
      : console.log(`\n${this.dim + this.fgGreen}All tickets received.${this.reset}`)
  }

  /**
   * Prints out multiple tickets in summary form and praginates the output if the tickets has a length greater than 25.
   *
   * @param {Array} tickets List of all tickets retrieved from Zendesk API.
   */
  allTicketsOutput(tickets) {
    this.successMessage()
    this.tableTitles()
    const scrollLimit = 10
    const pageLimit = 25
    const fetchLimit = 50
    tickets.forEach((ticket, index, list) => {
      if (tickets.length < pageLimit) {
        console.log(ticket.toStringSummary())
      } else {
        // Pauses program if more that 25 results are returned to paginate list.
        if (index % scrollLimit === 0 && index != 0) {
          const pageCount = Math.floor(list.count / scrollLimit)
          const pageNumber = Math.floor(
            list.page * (list.count / scrollLimit / (list.count / fetchLimit)) +
              index / scrollLimit
          )
          readline.question(`\n${pageNumber}/${pageCount}Press enter for more..\n`)
          this.tableTitles()
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
    this.successMessage()
    console.log(ticket.toStringAllDetails())
  }
}

module.exports = Display
