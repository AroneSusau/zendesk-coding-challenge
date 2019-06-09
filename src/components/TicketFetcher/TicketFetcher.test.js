'use-strict'
const TicketFetcher = require('./TicketFetcher')
const Ticket = require('../Ticket/Ticket')
const { TOKEN } = require('../../config')

describe('TicketFetcher', () => {
  // Fetch all tickets
  it('HAPPY PATH - ALL TICKETS: should return tickets array when provided correct credentials', async () => {
    const requester = new TicketFetcher(TOKEN)
    const apiResponse = await requester.fetchAllTickets()
    expect(await apiResponse()).not.toBeNull()
  })

  it('should return null for all tickets when provided incorrect credentials', async () => {
    const requester = new TicketFetcher('token')
    const apiResponse = await requester.fetchAllTickets()
    expect(await apiResponse()).toBeNull()
  })

  // Fetch ticket by id
  it('HAPPY PATH - SINGLE TICKET: should return a ticket object when provided the correct credentials.', async () => {
    const requester = new TicketFetcher(TOKEN)
    const ticket = await requester.fetchTicketById(2)
    expect(ticket instanceof Ticket).not.toBeNull()
  })

  it('should return null for a single ticket when provided incorrect credentials', async () => {
    const requester = new TicketFetcher('username', 'password')
    const apiResponse = await requester.fetchTicketById(2)
    expect(apiResponse).toBeNull()
  })

  it('should return null for a single ticket when provided an invalid ticket id', async () => {
    const requester = new TicketFetcher(TOKEN)
    const apiResponse = await requester.fetchTicketById(-100)
    expect(apiResponse).toBeNull()
  })

  it('should return null for a single ticket when provided a valid interger, but the ticket does not exists', async () => {
    const requester = new TicketFetcher(TOKEN)
    // Will need to update id value in future as tickets id grow.
    const id = 10000000
    const apiResponse = await requester.fetchTicketById(id)
    expect(apiResponse).toBeNull()
  })

  // Format tickets
  it('should format all tickets correctly when passed empty objects', () => {
    const requester = new TicketFetcher()
    const mock = [{}, {}, {}]
    expect(requester.formatTickets(mock)).toEqual([
      new Ticket(),
      new Ticket(),
      new Ticket()
    ])
  })

  // Handle Errors
  it('should throw error for unknow status code received by Zendesk API', () => {
    const requester = new TicketFetcher(TOKEN)
    const mock = {
      status: -1,
      ok: false,
      statusText: 'mock'
    }
    try {
      requester.handlesErrors(mock)
    } catch (error) {
      expect(error).toContain(mock.statusText)
    }
  })

  // Regex Search for page number
  it('HAPPY PATH: should return the value of the page number passed into the url page query string', () => {
    const requester = new TicketFetcher(TOKEN)
    let pageNumber = 10
    const url = `https://aronesusau.zendesk.com/api/v2/tickets.json?page=${pageNumber}`
    const result = requester.getPageNumberFromUrl(url)
    expect(result).toEqual(--pageNumber)
  })

  it('should return -1 if the argument is not of type string', () => {
    const requester = new TicketFetcher(TOKEN)
    const mock = {}
    const result = requester.getPageNumberFromUrl(mock)
    expect(result).toEqual(-1)
  })
})
