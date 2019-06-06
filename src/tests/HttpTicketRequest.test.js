'use-strict'
const HttpTicketRequest = require('../modules/HttpTicketRequest')
const Ticket = require('../modules/Ticket')

describe('HttpTicketRequet', () => {
  // All tickets request
  it('HAPPY PATH - ALL TICKETS: should return tickets array when provided correct credentials for template fetch request.', async () => {
    const requester = new HttpTicketRequest()
    requester.setUrlForAllTickets()
    requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
    const list = await requester.templateFetchRequest()
    expect(list.tickets).not.toBeNull()
  })

  it('HAPPY PATH - ALL TICKETS: should tickets array when provided correct credentials for full request method', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
    const apiResponse = await requester.retrieveAllTickets()
    expect(apiResponse.tickets).not.toBeNull()
    expect(apiResponse.count).not.toBeNull()
  })

  it('HAPPY PATH - ALL TICKETS: should return an object with the correct count when provided the url', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
    const apiResponse = await requester.retrieveAllTickets(
      'https://aronesusau.zendesk.com/api/v2/tickets.json?per_page=25'
    )
    expect(apiResponse.tickets).not.toBeNull()
    expect(apiResponse.nextPage).not.toBeNull()
  })

  it('should fail authentication for all tickets when provided incorrect credentials.', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('username', 'password')
    requester.setUrlForAllTickets()
    const apiResponse = await requester.templateFetchRequest()
    expect(apiResponse).toEqual({
      error: "Couldn't authenticate you"
    })
  })

  it('should return null for all tickets when provided incorrect credentials', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('username', 'password')
    const apiResponse = await requester.retrieveAllTickets()
    expect(apiResponse).toBeNull()
  })

  // Single ticket request
  it('HAPPY PATH - SINGLE TICKET:should return a ticket object when provided correct credentials for simple fetch request.', async () => {
    const requester = new HttpTicketRequest()
    requester.setUrlForSingleTicket(2)
    requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
    const apiResponse = await requester.templateFetchRequest()
    expect(apiResponse.ticket).not.toBeNull()
  })

  // Single ticket request
  it('HAPPY PATH - SINGLE TICKET:should return a ticket object when provided correct credentials for full fetch request.', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
    const ticket = await requester.retrieveTicketById(2)
    expect(ticket instanceof Ticket).not.toBeNull()
  })

  it('should fail authentication for a single ticket when provided incorrect credentials.', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('username', 'password')
    requester.setUrlForSingleTicket(2)
    const apiResponse = await requester.templateFetchRequest()
    expect(apiResponse).toEqual({
      error: "Couldn't authenticate you"
    })
  })

  it('should return null for a single ticket when provided incorrect credentials', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('username', 'password')
    const apiResponse = await requester.retrieveTicketById(2)
    expect(apiResponse).toBeNull()
  })

  it('should return null for a single ticket when provided an incorrect ticket id', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
    const apiResponse = await requester.retrieveTicketById(-100)
    expect(apiResponse).toBeNull()
  })

  // Url change methods
  it('should change URL to the get all tickets endpoint when called', () => {
    const requester = new HttpTicketRequest()
    requester.setUrlForAllTickets()
    expect(requester.url).toMatch(
      'https://aronesusau.zendesk.com/api/v2/tickets.json?per_page=100'
    )
  })

  it('should change URL to the single ticket endpoint with the correct id when called', () => {
    const requester = new HttpTicketRequest()
    requester.setUrlForSingleTicket(123)
    expect(requester.url).toMatch(
      'https://aronesusau.zendesk.com/api/v2/tickets/123.json'
    )
  })

  // Format tickets
  it('should format all tickets correctly when passed empty objects', () => {
    const requester = new HttpTicketRequest()
    const mock = [{}, {}, {}]
    expect(requester.formatTickets(mock)).toEqual([
      new Ticket(),
      new Ticket(),
      new Ticket()
    ])
  })

  // Handles errors
  it('should return which ever object is passed into it', () => {
    const requester = new HttpTicketRequest()
    expect(requester.handlesErrors({ mock: 'mock' })).toEqual({ mock: 'mock' })
    expect(
      requester.handlesErrors({ ok: false, status: 401, statusText: 'mock' })
    ).toEqual({ ok: false, status: 401, statusText: 'mock' })
    expect(
      requester.handlesErrors({ ok: false, status: 404, statusText: 'mock' })
    ).toEqual({ ok: false, status: 404, statusText: 'mock' })
    expect(
      requester.handlesErrors({ ok: false, status: 400, statusText: 'mock' })
    ).toEqual({ ok: false, status: 400, statusText: 'mock' })
    expect(requester.handlesErrors({ ok: false, status: 0, statusText: 'mock' })).toEqual(
      { ok: false, status: 0, statusText: 'mock' }
    )
  })

  // Sets login credentials and headers
  it('HAPPY PATH: should set the correct base64 credentials when provided the username and password', () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('mock', 'mock')
    expect(requester.login.base64).toMatch('bW9jazptb2Nr')
  })

  it('HAPPY PATH: should set the correct base64 credentials when provided the username and password', () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('mock', 'mock')
    expect(requester.headers.has('Authorization')).toBeTruthy()
  })
})
