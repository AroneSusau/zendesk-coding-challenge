package com.aronesusau.controller

import com.aronesusau.model

import scalaj.http._
import scala.util.{Failure, Success, Try}

import play.api.libs.json.{JsError, JsObject, JsSuccess, JsValue, Json}

case class Requester() {

  private val token: String = model.Token.value

  def get(url: String, token: String): Try[JsValue] = {
    val request = Http(url).header("Authorization", s"Bearer $token")
    val response = request.asString
    val json = Json.parse(response.body)
    errorHandling(json)
  }

  def errorHandling(response: JsValue): Try[JsValue] = {
    (response \ "error").validate[JsObject] match {
      case JsSuccess(value, _) =>
        val errorMsg: String = value("title").as[String] + " " + value("message").as[String]
        Failure(new Exception(errorMsg))
      case JsError(_) =>
        (response \ "error").validate[String] match {
          case JsSuccess(value, _) =>
            val errorMsg: String = value + ": " + response("description").as[String]
            Failure(new Exception(errorMsg))
          case JsError(_) => Success(response)
        }
    }
  }

  def getAllTickets(perPage: Int, pageNumber: Int): Try[JsValue] = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets.json?per_page=$perPage&page=$pageNumber"
    get(url, token)
  }

  def getTicketById(id: Int): Try[JsValue] = {
    val url: String = s"https://aronesusau.zendesk.com/api/v2/tickets/$id.json"
    get(url, token)
  }

}
