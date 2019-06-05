'use-strict'
const Ticket = require('../modules/Ticket')

describe('Ticket', () => {
  it('should return an instanceof a Ticket', () => {
    const mockTicket = new Ticket({})
    expect(mockTicket instanceof Ticket).toBe(true)
  })

  it('should format the tickets into the correct structure when provided an unformatted ticket object.', () => {
    const mockTicket = { testAttribute: null }
    expect(new Ticket(mockTicket)).toEqual({
      id: 0,
      subject: 'None',
      description: 'None',
      requesterId: 0
    })
  })

  it('should not change the tickets attributes value if the values are not null', () => {
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

  it('should return a Ticket object with default attributes when the constructor is passed an invalid value', () => {
    expect(new Ticket(undefined)).toEqual({
      id: 0,
      subject: 'None',
      description: 'None',
      requesterId: 0
    })
  })
})
