package com.aronesusau.controller

import scalaj.http._
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}

case class Ticket(createdAt: String, requesterId: String, subject: String, description: String) {

  override def toString: String =
    s"$createdAt : $requesterId\n$subject\n$description"
}

case object Requester extends App {

  val token: String = sys.env("CODING_CHALLENGE_TOKEN")


  val url: String = "https://aronesusau.zendesk.com/api/v2/tickets.json?per_page=5"
  val jsonResponse = get(url, token).body
  val jsonParsed = (parseJson(jsonResponse) \ "tickets").get

  val tickets: IndexedSeq[Ticket] = jsonParsed match {
    case JsArray(value) => value.map(ticket => {
      val createdAt = (ticket \ "created_at").get.toString()
      val requesterId = (ticket \ "requester_id").get.toString()
      val subject = (ticket \ "subject").get.toString()
      val description = (ticket \ "description").get.toString()

      Ticket(createdAt, requesterId, subject, description)
    })
  }

  def get(url: String, token: String): HttpResponse[String] =
    Http(url).header("Authorization",s"Bearer $token").asString

  def parseJson(json: String): JsValue =
    Json.parse(json)

  def getTicketById(id: Int): JsObject = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets/$id.json"
    val response: String = get(url, token).body
    println(token)
    Json.parse(response).as[JsObject]
  }


}
