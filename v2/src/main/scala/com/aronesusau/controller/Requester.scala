package com.aronesusau.controller

import scalaj.http._
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}
import com.aronesusau.model.Ticket
import com.aronesusau.model.optionLike.{Achieved, Failed, Optional}


case class Requester() {

  val token: String = sys.env.get("CODING_CHALLENGE_TOKEN") match {
    case Some(value) => value
    case None => throw new Exception("CODING_CHALLENGE_TOKEN Not Set.");
  }

  def get(url: String, token: String): HttpResponse[String] =
    Http(url).header("Authorization", s"Bearer $token").asString

  def parseJson(json: String): JsValue =
    Json.parse(json)

  def printToken(): Unit = println(token)

  def extract(jsValue: JsValue, key: String): JsValue =
    (jsValue \ key).get

  def extractSingleTicketData(initial: Optional[JsValue]): Ticket = {
    initial match {
      case Failed(title, message) => Ticket("", "", title, message)
      case Achieved(value) => value match {
        case JsObject(value) =>
          val ticket = value("ticket")
          val id: String = extract(ticket, "id").toString()
          val requesterId: String = extract(ticket, "requester_id").toString()
          val subject: String = extract(ticket, "subject").toString()
          val description: String = extract(ticket, "description").toString()
          Ticket(id, requesterId, subject, description)
      }
    }
  }

  def errorHandling(response: JsValue): Optional[JsValue] = {
    val isResponseEmpty: Boolean = (response \ "error").isEmpty

    isResponseEmpty match {
      case true => Achieved(response)
      case false => {
        val errorResp = response("error")
        (errorResp \ "title").isEmpty match {
          case true => Failed(
            errorResp.toString(),
            response("description").toString())
          case false => Failed(
            (errorResp \ "title").get.toString(),
            (errorResp \ "message").get.toString())
        }
      }
    }
  }

  def getTicketById(id: Int): Ticket = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets/$id.json"
    val response: String = get(url, token).body
    val data: Optional[JsValue] = errorHandling(Json.parse(response))
    extractSingleTicketData(data)
  }


}
