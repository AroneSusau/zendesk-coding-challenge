'use-strict'
const console = require('console')
const readline = require('readline-sync')
const Ticket = require('./Ticket')

class Display {
  /**
   * Display Constructor
   */
  constructor() {
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
      `${this.fgGreen + this.bright}\nThank you for using the viewer :)${this.fgCyan +
        this.bright} Goodbye!\n`
    )
    console.log(`${this.reset + this.dim}Created By Arone Susau\n`)
  }

  /**
   * Prints invalid warning when invalid command entered.
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
   * Template prompt for ticket id
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
   * Prints out multiple tickets in summary form and praginates the output if the ticketsList has a length greater than 25.
   *
   * @param {Array} ticketsList List of all tickets retrived from Zendesk API.
   */
  multipleTicketOutput(ticketsList) {
    if (ticketsList) {
      const subjectPadding = 9
      const descriptionPadding = 53
      const ticketsPerPage = 10
      const ticketsPageLimit = 25
      this.successMessage()
      console.log(
        'Id',
        'Subject'.padStart(subjectPadding, ' '),
        'Description'.padStart(descriptionPadding, ' ')
      )
      ticketsList.forEach((ticket, index, list) => {
        if (ticket instanceof Ticket) {
          if (list.length < ticketsPageLimit) {
            console.log(ticket.toStringSummary())
          } else {
            // Pauses program if 25 or more results are returned.
            if (index % ticketsPerPage === 0 && index != 0) {
              const pageCount = Math.floor(list.length / ticketsPerPage)
              const currentPage = Math.floor(index / ticketsPerPage)
              readline.question(
                `\n${currentPage}/${pageCount} - Press enter for more..\n`
              )
              console.log(
                'Id',
                'Subject'.padStart(subjectPadding, ' '),
                'Description'.padStart(descriptionPadding, ' ')
              )
            }
            console.log(ticket.toStringSummary())
          }
        } else {
          console.log(`${this.fgRed}Invalid Ticked - Cannot Display`, this.reset)
        }
      })
    }
  }

  /**
   * Prints full details for individual ticket.
   *
   * @param {Object} ticket Ticket object returned from Zendesk API.
   */
  singleTicketOutput(ticket) {
    if (ticket) {
      if (ticket instanceof Ticket) {
        this.successMessage()
        console.log(ticket.toStringAllDetails())
      } else {
        console.log(`${this.fgRed}Invalid Ticked - Cannot Display`, this.reset)
      }
    }
  }
}

module.exports = Display
