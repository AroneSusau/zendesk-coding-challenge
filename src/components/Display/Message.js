/**
 * This file contains almost all the messages that are displayed to console.
 */

const set = {
  // Values for padding the table titles.
  subjectPadding: 10,
  descriptionPadding: 54,
  // Sets font settings for text.
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underline: '\x1b[4m',
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m'
}

module.exports = {
  main:
    `\nType "${set.fgBlue}menu${set.reset}" to view options` +
    ` or "${set.fgBlue}exit${set.reset}" to close the program.` +
    `\n${set.fgRed}>${set.reset}`,
  menu:
    `\n• Press ${set.dim}1${set.reset} to view all tickets\n` +
    `• Press ${set.dim}2${set.reset} to view a ticket\n• Type` +
    ` ${set.dim}exit${set.reset} to close the program`,
  id: `\n${set.dim}Enter ticket id..${set.reset}`,
  welcome: `${set.bright + set.fgMagenta}Welcome to the Ticket Viewer${set.reset}`,
  goodbye:
    `${set.fgGreen + set.bright}\nThank you for using the Ticket` +
    ` Viewer :)${set.fgCyan + set.bright} Goodbye!\n${set.reset + set.dim}` +
    `\nCreated By Arone Susau\n`,
  invalidInput: `\n${set.dim}Sorry, invalid command entered!${set.reset}`,
  success: `${set.fgGreen}Sucessfully Retrived Tickets${set.reset}\n`,
  fetch: `\n\x1b[33mRetrieving tickets from zendesk..\x1b[0m`,
  tableTitles:
    'Id' +
    'Subject'.padStart(set.subjectPadding, ' ') +
    'Description'.padStart(set.descriptionPadding, ' '),
  moreTicketsComing: `${set.fgBlue}Fetching more tickets..${set.reset}`,
  allTicketsReceived: `\n${set.fgGreen}All tickets received.${set.reset}`,
  continueScrolling:
    `\nPress enter to continue scrolling or type anything to stop..\n` +
    `${set.fgRed}>${set.reset}`,
  cancel: `\n${set.fgYellow + set.dim}Exiting Page Scroll${set.reset}`
}
