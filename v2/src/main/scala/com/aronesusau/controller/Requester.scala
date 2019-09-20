package com.aronesusau.controller

import scalaj.http._
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}
import com.aronesusau.model.Ticket


case class Requester() {

  val token: String = sys.env.get("CODING_CHALLENGE_TOKEN") match {
    case Some(value) => value
    case None => throw new Exception("CODING_CHALLENGE_TOKEN Not Set.");
  }

  //  val url: String = "https://aronesusau.zendesk.com/api/v2/tickets.json?per_page=5"
  //  val jsonResponse = get(url, token).body
  //  val jsonParsed = (parseJson(jsonResponse) \ "tickets").get
  //
  //  val tickets: IndexedSeq[Ticket] = jsonParsed match {
  //    case JsArray(value) => value.map(ticket => {
  //      val createdAt = (ticket \ "created_at").get.toString()
  //      val requesterId = (ticket \ "requester_id").get.toString()
  //      val subject = (ticket \ "subject").get.toString()
  //      val description = (ticket \ "description").get.toString()
  //
  //      Ticket(createdAt, requesterId, subject, description)
  //    })
  //  }

  def get(url: String, token: String): HttpResponse[String] =
    Http(url).header("Authorization", s"Bearer $token").asString

  def parseJson(json: String): JsValue =
    Json.parse(json)

  def printToken(): Unit = println(token)

  def extract(jsValue: JsValue, key: String): JsValue =
    (jsValue \ key).get

  // TODO: Change return value to be Option[Ticket] for any potential failed requests
  def extractSingleTicketData(initial: JsValue): Ticket = {
    initial match {
      case JsObject(value) => {
        val ticket: JsValue = value("ticket")
        val createdAt = extract(ticket, "created_at").toString()
        val requesterId = extract(ticket, "requester_id").toString()
        val subject = extract(ticket, "subject").toString()
        val description = extract(ticket, "description").toString()
        Ticket(createdAt, requesterId, subject, description)
      }
    }
  }

  def getTicketById(id: Int): Ticket = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets/$id.json"
    val response: String = get(url, token).body
    val data: JsValue = Json.parse(response)
    extractSingleTicketData(data)
  }


}
