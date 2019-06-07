'use-strict'
const TicketFetcher = require('./TicketFetcher')
const Ticket = require('../Ticket/Ticket')
const { USERNAME, PASSWORD } = require('../../config')

describe('TicketFetcher', () => {
  // All tickets request
  it('HAPPY PATH - ALL TICKETS: should return tickets array when provided correct credentials', async () => {
    const requester = new TicketFetcher(USERNAME, PASSWORD)
    const apiResponse = await requester.fetchAllTickets()
    expect(await apiResponse()).not.toBeNull()
  })

  it('HAPPY PATH - ALL TICKETS: should return an object with the correct length when provided the nextUrl param', async () => {
    const requester = new TicketFetcher(USERNAME, PASSWORD)
    const apiResponse = await requester.fetchAllTickets()
    expect(apiResponse.length).not.toBeNull()
  })
  it('should return null for all tickets when provided incorrect credentials', async () => {
    const requester = new TicketFetcher('username', 'password')
    const apiResponse = await requester.fetchAllTickets()
    expect(await apiResponse()).toBeNull()
  })

  // Single ticket request - fetchTicketById
  it('HAPPY PATH - SINGLE TICKET:should return a ticket object when provided correct credentials for full fetch request.', async () => {
    const requester = new TicketFetcher(USERNAME, PASSWORD)
    const ticket = await requester.fetchTicketById(2)
    expect(ticket instanceof Ticket).not.toBeNull()
  })

  it('should return null for a single ticket when provided incorrect credentials', async () => {
    const requester = new TicketFetcher('username', 'password')
    const apiResponse = await requester.fetchTicketById(2)
    expect(apiResponse).toBeNull()
  })

  it('should return null for a single ticket when provided an incorrect ticket id', async () => {
    const requester = new TicketFetcher(USERNAME, PASSWORD)
    const apiResponse = await requester.fetchTicketById(-100)
    expect(apiResponse).toBeNull()
  })

  // Format tickets
  it('HAPPY PATH: should format all tickets correctly when passed empty objects', () => {
    const requester = new TicketFetcher()
    const mock = [{}, {}, {}]
    expect(requester.formatTickets(mock)).toEqual([
      new Ticket(),
      new Ticket(),
      new Ticket()
    ])
  })

  // Handles errors TODO

  // Sets login credentials and headers
  it('HAPPY PATH: should set the correct base64 credentials when provided the username and password', () => {
    const requester = new TicketFetcher('mock', 'mock')
    expect(requester.login).toMatch('bW9jazptb2Nr')
  })
})
