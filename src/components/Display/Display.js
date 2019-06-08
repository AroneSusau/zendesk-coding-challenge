'use-strict'
const console = require('console')
const readline = require('readline-sync')
const message = require('./Message')
// Disables console output in testing environment
console.log = process.env.NODE_ENV != 'test' ? console.log : function() {}

class Display {
  /**
   * Prompt user for input while in general menu.
   *
   * @param {String} question Question to display to user.
   * @returns {String} Input from user.
   */
  getInput(question) {
    return readline.question(question)
  }

  /**
   * Prints message to console
   *
   * @param {String} message Message to be displayed to console
   */
  print(message) {
    console.log(message)
  }

  /**
   * Prints out all tickets in summary form.
   *
   * @param {Array} Tickets list of all tickets retrieved from Zendesk API.
   */
  printAllTickets(tickets) {
    this.print(message.success)
    this.print(message.tableTitles)
    tickets.forEach(ticket => this.print(ticket.getSummaryDetails()))
    // Prints current page / total number of pages
    this.print(`\n${tickets.page}/${tickets.count / tickets.perPage}`)
  }

  /**
   * Prints out a single ticket's details if the object passed through is not null.
   *
   * @param {Object} ticket Ticket returned from Zendesk API
   */
  printSingleTicket(ticket) {
    if (ticket) {
      this.print(message.success)
      this.print(ticket.getAllDetails())
    }
  }
}

module.exports = Display
