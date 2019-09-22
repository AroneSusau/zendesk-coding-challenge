package com.aronesusau.controller

import java.awt.event.ActionEvent

import com.aronesusau.model.Ticket
import com.aronesusau.view.AllTicketsPane.AllTicketsTab
import com.aronesusau.view.TicketByIdPane.TicketByIdTab

case class TabsEventListener(allTicketsTab: AllTicketsTab, ticketByIdTab: TicketByIdTab) {

  var pageNumber = 1
  val requester: Requester = Requester()

  // All Tickets Event Listeners
  def allTicketsGoButtonListener(e: ActionEvent): Unit = {
    allTicketsTab.pushDataToPanel(paginate())
    resetPageNumber()
  }

  def allTicketsPrevButtonListener(e: ActionEvent): Unit = {
    allTicketsTab.pushDataToPanel(paginate())
    resetPageNumber()
  }

  def allTicketsNextButtonListener(e: ActionEvent): Unit = {
    incrementPageNumber()
    val tickets: IndexedSeq[Ticket] = paginate()

    if (tickets.nonEmpty) allTicketsTab.pushDataToPanel(tickets)
    else decrementPageNumber()
  }

  // Ticket By Id Event Listeners
  def ticketByIdGoButtonListener(e: ActionEvent): Unit = {
    val id: Int = ticketByIdTab.ticketByIdTopPane.getSpinnerValue()
    val ticket: Ticket = requester.getTicketById(id)
    ticketByIdTab.ticketByIdBottomPane.pushDataToPanel(ticket)
  }

  // Helper functions
  def paginate(): IndexedSeq[Ticket] = requester.getAllTickets(getPerPageNumber, pageNumber)

  def getPerPageNumber: Int = allTicketsTab.allTicketsTopPane.getSpinnerValue()

  def incrementPageNumber(): Unit = pageNumber += 1

  def decrementPageNumber(): Unit = if (pageNumber > 1) pageNumber -= 1

  def resetPageNumber(): Unit = pageNumber = 1

}
