package com.aronesusau.model

private[aronesusau] case class Ticket(id: String, requesterId: String, subject: String, description: String) {

  override def toString: String =
    s"$id : $requesterId\n$subject\n$description"

}
