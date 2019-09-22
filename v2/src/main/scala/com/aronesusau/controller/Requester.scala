package com.aronesusau.controller

import com.aronesusau.model
import scalaj.http._
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}
import com.aronesusau.model.Ticket
import com.aronesusau.model.optionLike.{Achieved, Failed, Optional}

case class Requester() {

  val token = model.Token.value

  def get(url: String, token: String): Optional[JsValue] = {
    val request = Http(url).header("Authorization", s"Bearer $token")
    val response = request.asString
    val json = Json.parse(response.body)
    errorHandling(json)
  }

  def extract(jsValue: JsValue, key: String): JsValue =
    (jsValue \ key).get

  def extractSingleTicket(initial: Optional[JsValue], param: String): Ticket = {
    initial match {
      case Failed(title, message) => Ticket("", "", title, message)
      case Achieved(value) => value match {
        case JsObject(value) =>
          val ticket: JsValue = value(param)
          extractTicket(ticket)
        case _ => throw new Exception("Unexpected JsValue returned from request.")
      }
    }
  }

  def extractAllTickets(initial: Optional[JsValue]): IndexedSeq[Ticket] = {
    initial match {
      case Failed(title, message) => IndexedSeq(Ticket("", "", s"$title: $message", ""))
      case Achieved(value) => value match {
        case JsObject(ticketsObj) => ticketsObj("tickets").as[JsArray].value.map(extractTicket)
        case _ => throw new Exception("Unexpected JsValue returned from request.")
      }
    }
  }

  def extractTicket(ticket: JsValue): Ticket = {
    val id: String = extract(ticket, "id").toString()
    val requesterId: String = extract(ticket, "requester_id").toString()
    val subject: String = extract(ticket, "subject").toString()
    val description: String = extract(ticket, "description").toString()
    Ticket(id, requesterId, subject, description)
  }

  def errorHandling(response: JsValue): Optional[JsValue] = {
    if ((response \ "error").isEmpty) Achieved(response)
    else {
      val errorResp = response("error")
      if ((errorResp \ "title").isEmpty)
        Failed(errorResp.toString(), response("description").toString())
      else
        Failed((errorResp \ "title").get.toString(), (errorResp \ "message").get.toString())
    }
  }

  def getAllTickets(perPage: Int, pageNumber: Int = 1): IndexedSeq[Ticket] = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets.json?per_page=$perPage&page=$pageNumber"
    extractAllTickets(get(url, token))
  }

  def getTicketById(id: Int): Ticket = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets/$id.json"
    extractSingleTicket(get(url, token), "ticket")
  }


}
