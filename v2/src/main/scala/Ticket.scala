case class Ticket(description: String, subject: String) {
  override def toString: String = s"\nSubject: $subject\n$description"
}