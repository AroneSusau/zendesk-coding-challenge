# Zendesk-Coding-Challange

A coding challenge provided by the Zendesk team for an internship opportunity.

## Challange Functional Requirements

- Connect to the Zendesk API.
- Request the tickets for your account.
- Page through tickets when more than 25 are returned.
- Display tickets in a list.
- Display individual ticket details.
- Happy path tests provided (minimum).

## Prerequisite Installations

- NodeJS v10.16.0 or greater
- NPM v6.9.0 or greater

## How to run main program on MacOS

1. Download the repository to your local machine.
2. Navigate to the repository directory in your MacOS Terminal or equivalent shell application.
3. Install all npm modules with the following code.

```
npm install
```

4. Run the program with the following code.

```
node src/modules/index
```

5. Run the tests with the following code.

```
npm run test
```

### Learning Resources

The following section contains links to super useful resources I found while building this application.

Zendesk docs quick links
[Tickets](https://developer.zendesk.com/rest_api/docs/support/tickets#show-ticket)

[Basic Authentication](https://developer.zendesk.com/rest_api/docs/support/introduction#basic-authentication)

[Pagination](https://developer.zendesk.com/rest_api/docs/support/introduction#pagination)

[Node Best Practices](https://github.com/i0natan/nodebestpractices)

Awesome tips that helped make my code more clean organised.

[Github MD Files Formatting](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)

[Jest Expect Refernce](https://jestjs.io/docs/en/expect.html)

[Readline-sync NPM Refernce](https://www.npmjs.com/package/readline-sync)
