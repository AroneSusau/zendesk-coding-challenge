# Zendesk-Coding-Challange - Version 1: Original Submission

A command line interface based application that is written in javascript using the Node.js runtime. The app makes HTTP requests to the Zendesk API to retrieve account tickets displayed in either a summary table or full details format. The task had a one week deadline to create and submit the application.

## Challange Requirements

- Connect to the Zendesk API.
- Request the tickets for your account.
- Page through tickets when more than 25 are returned.
- Display tickets in a list.
- Display individual ticket details.
- Happy path tests provided (minimum).

## Prerequisite Installations

- [NodeJS](https://nodejs.org/en/) v10.16.0 or greater
- NPM v6.9.0 or greater (At the time of making this documentation, NPM comes with the Node.js installation)

## How to run (MacOS/Windows)

1. Download the repository to your local machine with the following code.

```
$ git clone https://github.com/AroneSusau/Zendesk-Coding-Challange
```

2. Navigate to the repository directory in your MacOS Terminal or equivalent command line application.
3. Install all npm modules with the following code.

```
$ npm install
```

4. Run the program with the following code.

```
$ npm start
```

#### Run Tests

1. Navigate to the repository directory in your MacOS Terminal or equivalent command line application.
2. Run the tests with the following code

```
$ npm test
```

## Architectural Design Overview

### Assumptions
- Users are familar with CLI usage.
- Ticket requests to the Zendesk API will always return JSON with the same structure.
- Error responses from the Zendesk API will always return JSON with the same structure.

### Main Component Description

- ```index.js``` : Program entry point, communicates data between components.
- ```Ticket.js``` : Data model for tickets.
- ```TicketFetcher.js``` : Makes requests to the Zendesk API and returns tickets.
- ```Display.js``` : Prints output and takes user input.
- ```Message.js``` : Contains general text for output, prompts, warnings, etc.

### Design Choices

#### Connect to the Zendesk API & Request the tickets for your account

Ticket requests within my application use the NPM node-fetch module which is a node.js version of the vanilla js ```window.fetch``` method. The module is lightweight and easy to use as it retains much of the functionality from the vanilla version.

Originally I had used a get request with Basic authentication as my primary method of sending credentials to the API, but after reading further into the Zendesk developer docs, I came to realise that hardcoding the admin username and password into a client application is far too insecure.

The application now uses OAuth 2.0 as the primary method of communicating credentials, using the ```Bearer Token``` syntax, within the request Authorization header. The token resides in the .env file and is read into the node process object on the attribute ```TOKEN``` in config.js. The benefit of having used OAuth 2.0 for credential authentical is that:

1. The login username and password are no longer hardcoded in plain text, which would have left them vulnerable to being compomised.
2. OAuth 2.0 allows scope limits to be set that can restrict token access to **_only reading ticket data_** from the Zendesk API.

#### Display tickets in a list & Display individual ticket details

I found that putting all of the string output methods and functionality into the Display class created a ridiculous amount of redundant code
and made readability quite cumbersome. I opted to add toString methods for both summary and full detail outputs onto the Ticket class and relocated the majority of string output into a separate _message.js_ Object. Moving most of the generic string output to the _message.js_ Object helped to:

1. Increase readbility of the Display.js class file.
2. Make all text output follow a more concise naming convention e.g: ```display.print(message.goodbye)```.

#### Page through tickets when more than 25 are returned

I had planned to have the TicketFetcher pull down the limit of 100 tickets per requests and display ten tickets per page. Then allow the user to page through until the tickets until they were complete, but I found that this method of logic was unintuitive and tedious as the calculations for something simple such as the current page number grew rather unwieldy. Also, retrieving the limit of tickets per request meant that you would be wasting bandwidth if the user decided to exit after the first page, so for those reasons I decided it would be best to allow the TicketFetch to pull only twenty-five tickets per request then display the entire twenty-five tickets in console, this meant that:

1. Users were only needing to make network requests for the exact number of pages they wanted to viw.
2. The code was cleaner and more readable due as the server handled most of the pagination processing.

## Learning Resources

The following section contains links to resources I found super useful while building this application.

- Zendesk docs quick links

  - [Tickets](https://developer.zendesk.com/rest_api/docs/support/tickets#show-ticket)

  - [Basic Authentication](https://developer.zendesk.com/rest_api/docs/support/introduction#basic-authentication)

  - [Pagination](https://developer.zendesk.com/rest_api/docs/support/introduction#pagination)
  
  - [OAuth 2.0](https://support.zendesk.com/hc/en-us/articles/203663836-Using-OAuth-authentication-with-your-application)

- Awesome tips that helped make my code more clean organised.

  - [Node Best Practices](https://github.com/i0natan/nodebestpractices)

- Great reference that helped me format the Readme.md file.

  - [Github MD Files Formatting](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)

- As writing tests is something I'm improving at everyday, the Jest reference is a must need!

  - [Jest Expect Reference](https://jestjs.io/docs/en/expect.html)

- Basic reference I found on stackoverflow for changing terminal output colours.

  - [Terminal Colour Reference](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)
