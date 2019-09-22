package com.aronesusau.controller

import com.aronesusau.model
import scalaj.http._
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}
import com.aronesusau.model.Ticket

import scala.util.{Failure, Success, Try}

case class Requester() {

  case class VerboseException(title: String, message: String) extends Exception

  def get(url: String, token: String): Try[JsValue] = {
    val request = Http(url).header("Authorization", s"Bearer $token")
    val response = request.asString
    val json = Json.parse(response.body)
    errorHandling(json)
  }

  def extractTicket(ticket: JsValue): Ticket = {
    val id: String = (ticket \ "id").get.toString()
    val requesterId: String = (ticket \ "requester_id").get.toString()
    val subject: String = (ticket \ "subject").get.toString()
    val description: String = (ticket \ "description").get.toString()
    Ticket(id, requesterId, subject, description)
  }

  def errorHandling(response: JsValue): Try[JsValue] = {
    if ((response \ "error").isEmpty) {
      Success(response)
    } else {
      val errorResp = response("error")
      if ((errorResp \ "title").isEmpty) {
        val title = errorResp.toString()
        val message = (response \ "description").get.toString()
        Failure(VerboseException(title, message))
      } else {
        val title = (errorResp \ "title").get.toString()
        val message = (errorResp \ "message").get.toString()
        Failure(VerboseException(title, message))
      }
    }
  }

  def getTickets[A, B, C](url: String, perPage: Int, pageNumber: Int, id: Int, success: B => A, failure: C => A): A = {
    val token = model.Token.value
    val response = get(url, token)
    response match {
      case Success(value: B) => success(value)
      case Failure(exception: C) => failure(exception)
      case _ => throw new Exception("Unexpected try object returned from get")
    }
  }

  def getAllTickets(perPage: Int, pageNumber: Int = 1): IndexedSeq[Ticket] = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets.json?per_page=$perPage&page=$pageNumber"
    getTickets(url, perPage, pageNumber, 0,
      (json: JsObject) => json("tickets").as[JsArray].value.map(extractTicket),
      (exception: VerboseException) => IndexedSeq(Ticket("", "", exception.title + ": " + exception.message, "")))
  }

  def getTicketById(id: Int): Ticket = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets/$id.json"
    getTickets(url, 0, 0, id,
      (json: JsObject) => extractTicket(json("ticket")),
      (exception: VerboseException) => Ticket("", "", exception.title, exception.message))
  }


}
