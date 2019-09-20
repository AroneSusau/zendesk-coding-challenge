package com.aronesusau.model

case class Ticket(createdAt: String, requesterId: String, subject: String, description: String) {

  override def toString: String =
    s"$createdAt : $requesterId\n$subject\n$description"
}
