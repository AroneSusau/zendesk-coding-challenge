'use-strict'

class Ticket {
  /**
   * Ticket Class
   *
   * @param {Object} object Ticket object retured from Zendesk tickets API.
   */
  constructor(object) {
    this.id = object.id || 0
    this.subject = object.subject || 'None'
    this.description = object.description || 'None'
    this.requesterId = object.requester_id || 0
  }

  /**
   * Returns summary details for Ticket as a string.
   */
  toStringSummary() {
    const id = '\x1b[0mId: \x1b[2m' + this.id

    const subjectGap = 23 - this.id.toString().length
    const subject = '\x1b[0m Subject: \x1b[2m'.padStart(subjectGap, ' ') + this.subject

    const descriptionGap = 70 - this.subject.length
    const description =
      '\x1b[0m Description: \x1b[2m'.padStart(descriptionGap) +
      this.description.trim().substr(0, 40)

    return id + subject + description + '...\x1b[0m'
  }

  /**
   * Returns all details for Ticket as a string.
   */
  toStringAllDetails() {
    return (
      'Requester: ' +
      this.id +
      '\nId: ' +
      this.requesterId +
      '\nSubject: ' +
      this.subject +
      '\n\n' +
      this.description
    )
  }
}

module.exports = Ticket
