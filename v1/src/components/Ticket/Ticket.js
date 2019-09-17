'use-strict'

class Ticket {
  /**
   * Ticket Class
   *
   * @param {Object} object Ticket object retured from Zendesk tickets API.
   */
  constructor(object) {
    object = typeof object === 'object' ? object : {}
    this.id = object.id || 0
    this.subject = object.subject || 'None'
    this.description = object.description || 'None'
    this.requesterId = object.requester_id || 0
  }

  /**
   * Returns summary details for Ticket as a string.
   *
   * @returns {String} Summary ticket details.
   */
  getSummaryDetails() {
    const id = '\x1b[2m' + this.id
    const subjectGap = 5 - this.id.toString().length
    const subject = ''.padStart(subjectGap, ' ') + this.subject
    const descriptionGap = 50 - this.subject.length
    const description =
      ''.padStart(descriptionGap, ' ') + this.description.substr(0, 50).trim()

    return id + subject + description + '...\x1b[0m'
  }

  /**
   * Returns all details for Ticket as a string.
   *
   * @returns {String} All ticket details.
   */
  getAllDetails() {
    return (
      'Requester: \x1b[2m' +
      this.id +
      '\n\x1b[0mId: \x1b[2m' +
      this.requesterId +
      '\n\x1b[0mSubject: \x1b[2m' +
      this.subject +
      '\x1b[0m\n\nDescription\n\x1b[2m' +
      this.description +
      '\x1b[0m'
    )
  }
}

module.exports = Ticket
