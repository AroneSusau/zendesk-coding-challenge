'use-strict'
const console = require('console')
const readline = require('readline')
const message = require('./Message')
const inquirer = readline.Interface({
  input: process.stdin,
  output: process.stdout
})
// Disables debug output in testing environment
console.log = process.env.NODE_ENV != 'test' ? console.log : function() {}

class Display {
  /**
   * Prompt user for input while in general menu.
   *
   * @param {String} question Question to display to user.
   *
   * @returns {String} Input from user.
   */
  getInput(question) {
    return new Promise((resolve, reject) => {
      try {
        inquirer.question(question, answer => {
          resolve(answer)
          inquirer.close()
        })
      } catch (error) {
        reject(error)
      }
    })
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
   * Prints out multiple tickets in summary form and praginates the output if the tickets has a length greater than 25.
   *
   * @param {Array} tickets List of all tickets retrieved from Zendesk API.
   */
  printAllTickets(tickets) {
    const scrollLimit = 10
    const pageLimit = 25
    const fetchLimit = 50
    this.print(message.success)
    this.print(message.tableTitles)
    tickets.forEach((ticket, index, list) => {
      if (tickets.length < pageLimit) {
        this.print(ticket.toStringSummary())
      } else {
        // Pauses program if more that 25 results are returned to paginate list.
        if (index % scrollLimit === 0 && index != 0) {
          const pageCount = Math.floor(list.count / scrollLimit)
          const pageNumber = Math.floor(
            list.page * (list.count / scrollLimit / (list.count / fetchLimit)) +
              index / scrollLimit
          )
          this.getInput(`\n${pageNumber}/${pageCount} Press enter for more..\n`)
          this.print(message.tableTitles)
        }
        this.print(ticket.toStringSummary())
      }
    })
  }

  /**
   * Prints full details for individual ticket.
   *
   * @param {Object} ticket Ticket object returned from Zendesk API.
   */
  printSingleTicket(ticket) {
    this.print(message.success)
    this.print(ticket.toStringAllDetails())
  }
}

module.exports = Display
