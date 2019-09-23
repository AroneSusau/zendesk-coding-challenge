package com.aronesusau.controller.EventListener

import java.awt.event.ActionEvent

import com.aronesusau.view.MainTabbedPane
import play.api.libs.json.{JsObject, JsValue}
import scala.util.{Failure, Success, Try}

case class AllTicketsListener(mainTabbedPane: MainTabbedPane) extends ListenerTrait {

  def genericAllTickets(setPageNumber: () => Unit): Unit = {
    setPageNumber()
    val response: Try[JsValue] = paginate()
    response match {
      case Success(value) =>
        val tickets = value("tickets").as[IndexedSeq[JsObject]].map(extractTicket)
        mainTabbedPane.allTicketsTab.pushDataToPanel(tickets)
      case Failure(exception) => throwError(exception)
    }
  }

  // All Tickets Event Listeners
  def allTicketsGoButtonListener(e: ActionEvent): Unit =
    genericAllTickets(resetPageNumber)

  def allTicketsPrevButtonListener(e: ActionEvent): Unit =
    genericAllTickets(decrementPageNumber)

  def allTicketsNextButtonListener(e: ActionEvent): Unit =
    genericAllTickets(incrementPageNumber)

  def paginate(): Try[JsValue] = requester.getAllTickets(getPerPageNumber, pageNumber)

  def getPerPageNumber: Int = mainTabbedPane.allTicketsTab.allTicketsButtonPanel.getSpinnerValue

}
