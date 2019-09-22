package com.aronesusau.controller

import com.aronesusau.model
import com.aronesusau.model.Ticket

import scalaj.http._
import scala.util.{Failure, Success, Try}

import play.api.libs.json.{JsArray, JsError, JsObject, JsSuccess, JsValue, Json}

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
    (response \ "error").validate[JsObject] match {
      case JsSuccess(value, _) =>
        Failure(
          VerboseException(
            value("title").as[String],
            value("message").as[String]))
      case JsError(_) =>
        (response \ "error").validate[String] match {
          case JsSuccess(value, _) => Failure(VerboseException(value, response("description").as[String]))
          case JsError(_) => Success(response)
        }
    }
  }

  def getTickets[A, B, C](
                           url: String,
                           perPage: Int,
                           pageNumber: Int,
                           id: Int,
                           success: B => A,
                           failure: C => A,
                           exception: String => A
                         ): A = {
    val token = model.Token.value
    val response = get(url, token)
    response match {
      case Success(value: B) => success(value)
      case Failure(exception: C) => failure(exception)
      case _ => exception("Undexpected response from get request")
    }
  }

  def getAllTickets(perPage: Int, pageNumber: Int): IndexedSeq[Ticket] = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets.json?per_page=$perPage&page=$pageNumber"
    getTickets(url, perPage, pageNumber, 0,
      (json: JsObject) => json("tickets").as[JsArray].value.map(extractTicket),
      (exception: VerboseException) => IndexedSeq(Ticket("", "", exception.title + ": " + exception.message, "")),
      (message: String) => IndexedSeq(Ticket("", "", message, "")))
  }

  def getTicketById(id: Int): Ticket = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets/$id.json"
    getTickets(url, 0, 0, id,
      (json: JsObject) => extractTicket(json("ticket")),
      (exception: VerboseException) => Ticket("", "", exception.title, exception.message),
      (message: String) => Ticket("", "", message, ""))
  }

}
