'use-strict'
const HttpTicketRequest = require('../modules/HttpTicketRequest')

test('API returns object when provided correct credentials', async () => {
	const requester = new HttpTicketRequest()
	const list = await requester.fetchZendeskTickets()
	expect(list).not.toBeNull()
})

test('API returns failed authentication when provided incorrect credentials.', async () => {
	const requester = new HttpTicketRequest()
	requester.username = 'username'
	requester.password = 'password'
	const list = await requester.fetchZendeskTickets()
	expect(list).toEqual({
		error: "Couldn't authenticate you"
	})
})
