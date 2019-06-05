'use-strict'
const HttpTicketRequest = require('../modules/HttpTicketRequest')
const Ticket = require('./../modules/Ticket')

test('API returns object when provided correct credentials.', async () => {
  const requester = new HttpTicketRequest()
  requester.setUrlForAllTickets()
  requester.setLoginCredentialsAndHeaders('arone.s@live.com.au', 'Arone2019@')
  const list = await requester.fetchZendeskTickets()
  expect(list).not.toBeNull()
})

test('API returns failed authentication when provided incorrect credentials.', async () => {
  const requester = new HttpTicketRequest()
  requester.setLoginCredentialsAndHeaders('username', 'password')
  requester.setUrlForAllTickets()
  const apiResponse = await requester.fetchZendeskTickets()
  expect(apiResponse).toEqual({
    error: "Couldn't authenticate you"
  })
})

test('Ticket should be formatted into the correct data structure with defaults set.', () => {
  const testTicket = { testAttribute: null }
  const result = new Ticket(testTicket)
  expect(result).toEqual({
    id: 0,
    subject: 'None',
    description: 'None',
    requesterId: 0
  })
})
