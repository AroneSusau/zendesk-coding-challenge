package com.aronesusau.controller.EventListener

import java.awt.event.ActionEvent

import com.aronesusau.view.MainTabbedPane
import play.api.libs.json.JsValue

import scala.util.{Failure, Success, Try}

case class TicketByIdListener(mainTabbedPane: MainTabbedPane) extends ListenerTrait {

  def ticketByIdGoButtonListener(e: ActionEvent): Unit = {
    val id: Int = mainTabbedPane.ticketByIdTab.ticketByIdButtonPanel.getSpinnerValue
    val response: Try[JsValue] = requester.getTicketById(id)
    response match {
      case Failure(exception) => throwError(exception)
      case Success(value) => mainTabbedPane.ticketByIdTab.pushDataToPanel(extractTicket(value("ticket")))
    }
  }

}
