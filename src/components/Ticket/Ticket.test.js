'use-strict'
const Ticket = require('./Ticket')

// Constructor tests
describe('Ticket', () => {
  it('HAPPY PATH: should not change the tickets attributes value if the values are not null', () => {
    const mockTicket = {
      id: 123,
      subject: 'Hello World!',
      description: 'foo bar',
      requester_id: 123123
    }
    expect(new Ticket(mockTicket)).toEqual({
      id: 123,
      subject: 'Hello World!',
      description: 'foo bar',
      requesterId: 123123
    })
  })

  it('should format the ticket into the correct structure when provided an unformatted ticket object.', () => {
    const mockTicket = { testAttribute: null }
    expect(new Ticket(mockTicket)).toEqual({
      id: 0,
      subject: 'None',
      description: 'None',
      requesterId: 0
    })
  })

  // Output text tests
  it('HAPPY PATH: should return a condensed summary of the Ticket', () => {
    const mock = new Ticket(undefined)
      .getSummaryDetails()
      .split(' ')
      .join('')
    expect(mock).toEqual('\x1b[2m0NoneNone...\x1b[0m')
  })

  it('HAPPY PATH: should return all detail descriptions of the Ticket', () => {
    const mock = new Ticket(undefined)
      .getAllDetails()
      // eslint-disable-next-line no-control-regex
      .replace(/\x1b\[0m|\x1b\[2m|\r?\n|\r| /g, '')
    expect(mock).toEqual('Requester:0Id:0Subject:NoneDescriptionNone')
  })
})
