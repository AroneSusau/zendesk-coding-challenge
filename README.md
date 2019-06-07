# Zendesk-Coding-Challange

A console based application that is written in javascript using the NodeJS runtime. The app makes HTTP requests to the Zendesk API to retrieve account tickets displayed in either a summary table or full details format.

## Challange Requirements

- Connect to the Zendesk API.
- Request the tickets for your account.
- Page through tickets when more than 25 are returned.
- Display tickets in a list.
- Display individual ticket details.
- Happy path tests provided (minimum).

## Prerequisite Installations

- [NodeJS](https://nodejs.org/en/) v10.16.0 or greater
- NPM v6.9.0 or greater (At the time of making this documentation, NPM comes with the NodeJS installation)

## How to run (MacOS/Windows)

1. Download the repository to your local machine.
2. Navigate to the repository directory in your MacOS Terminal or equivalent command line application.
3. Install all npm modules with the following code.

```
npm install
```

4. Run the program with the following code.

```
npm start
```

5. Run the tests with the following code.

```
npm test
```

## Learning Resources

The following section contains links to resources I found super useful while building this application.

- Zendesk docs quick links

  - [Tickets](https://developer.zendesk.com/rest_api/docs/support/tickets#show-ticket)

  - [Basic Authentication](https://developer.zendesk.com/rest_api/docs/support/introduction#basic-authentication)

  - [Pagination](https://developer.zendesk.com/rest_api/docs/support/introduction#pagination)

- Awesome tips that helped make my code more clean organised.

  - [Node Best Practices](https://github.com/i0natan/nodebestpractices)

- Great reference that helped me format the Readme.md file.

  - [Github MD Files Formatting](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)

- As writing tests is something I'm improving at everyday, the Jest reference is a must need!

  - [Jest Expect Refernce](https://jestjs.io/docs/en/expect.html)

- Basic reference I found on stackoverflow for changing terminal output colours.
  - [Terminal Colour Reference](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)
