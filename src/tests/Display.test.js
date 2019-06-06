'use-strict'
const Display = require('./../modules/Display')
const Ticket = require('./../modules/Ticket')

describe('Display', () => {
  it('should not return any output as all methods are console output', () => {
    const display = new Display()
    const mockList = [new Ticket(), new Ticket()]
    expect(display.welcomeMessage()).toBeFalsy()
    expect(display.goodbyeMessage()).toBeFalsy()
    expect(display.successMessage()).toBeFalsy()
    expect(display.invalidInputMessage()).toBeFalsy()
    expect(display.tableTitles()).toBeFalsy()
    expect(display.fetchMessage()).toBeFalsy()
    expect(display.areAllTicketsRetrieved(true)).toBeFalsy()
    expect(display.areAllTicketsRetrieved(false)).toBeFalsy()
    expect(display.allTicketsOutput(mockList)).toBeFalsy()
    expect(display.allTicketsOutput(false)).toBeFalsy()
    expect(display.singleTicketOutput(new Ticket())).toBeFalsy()
    expect(display.singleTicketOutput(false)).toBeFalsy()
  })
})
