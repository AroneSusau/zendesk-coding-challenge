'use-strict'
const HttpTicketRequest = require('../modules/HttpTicketRequest')

describe('HttpTicketRequet', () => {
  it('HAPPY PATH: should return object when provided correct credentials.', async () => {
    const requester = new HttpTicketRequest()
    requester.setUrlForAllTickets()
    requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
    const list = await requester.fetchZendeskTickets()
    expect(list).not.toBeNull()
  })

  it('should fail authentication when provided incorrect credentials.', async () => {
    const requester = new HttpTicketRequest()
    requester.setLoginCredentialsAndHeaders('username', 'password')
    requester.setUrlForAllTickets()
    const apiResponse = await requester.fetchZendeskTickets()
    expect(apiResponse).toEqual({
      error: "Couldn't authenticate you"
    })
  })
})
