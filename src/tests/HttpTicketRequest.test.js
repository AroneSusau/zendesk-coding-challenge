'use-strict'
const HttpTicketRequest = require('../modules/HttpTicketRequest')

describe('HttpTicketRequet', () => {
  // All tickets request
  it('HAPPY PATH - ALL TICKETS: returns tickets array when provided correct credentials.', async () => {
    const requester = new HttpTicketRequest()
    requester.setUrlForAllTickets()
    requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
    const list = await requester.templateFetchRequest()
    expect(list.tickets).not.toBeNull()
  })

  it('fails authentication for all tickets when provided incorrect credentials.', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('username', 'password')
    requester.setUrlForAllTickets()
    const apiResponse = await requester.templateFetchRequest()
    expect(apiResponse).toEqual({
      error: "Couldn't authenticate you"
    })
  })

  it('returns null for all tickets when provided incorrect credentials', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('username', 'password')
    const apiResponse = await requester.retrieveAllTickets()
    expect(apiResponse).toBeNull()
  })

  // Single ticket request
  it('HAPPY PATH - SINGLE TICKET: returns a ticket object when provided correct credentials.', async () => {
    const requester = new HttpTicketRequest()
    requester.setUrlForAllTickets(2)
    requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
    const list = await requester.templateFetchRequest()
    expect(list.ticket).not.toBeNull()
  })

  it('fails authentication for a single when provided incorrect credentials.', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('username', 'password')
    requester.setUrlForSingleTicket(2)
    const apiResponse = await requester.templateFetchRequest()
    expect(apiResponse).toEqual({
      error: "Couldn't authenticate you"
    })
  })

  it('returns null for a single ticket when provided incorrect credentials', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('username', 'password')
    const apiResponse = await requester.retrieveTicketById(2)
    expect(apiResponse).toBeNull()
  })
})
