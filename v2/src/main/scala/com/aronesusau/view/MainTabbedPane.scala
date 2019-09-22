package com.aronesusau.view

import java.awt.event.ActionEvent

import com.aronesusau.controller.Requester
import com.aronesusau.model.Ticket
import com.aronesusau.view.AllTicketsPane.AllTicketsTab
import com.aronesusau.view.TicketByIdPane.TicketByIdTab
import javax.swing.JTabbedPane

case class MainTabbedPane() extends JTabbedPane {

  var pageNumber = 1

  val allTicketsTab: AllTicketsTab = AllTicketsTab()
  val ticketByIdTab: TicketByIdTab = TicketByIdTab()
  val requester: Requester = Requester()

  addTab("All Tickets", allTicketsTab)
  addTab("Ticket By Id", ticketByIdTab)

  // All Tickets Event Listeners
  allTicketsTab.allTicketsTopPane.goBtn.addActionListener((_: ActionEvent) => {
    allTicketsTab.pushDataToPanel(paginate())
    resetPage()
  })

  allTicketsTab.allTicketsTopPane.prevBtn.addActionListener((_: ActionEvent) => {
    if (pageNumber > 0) {
      decrementPage()
      allTicketsTab.pushDataToPanel(paginate())
    }
  })

  allTicketsTab.allTicketsTopPane.nextBtn.addActionListener((_: ActionEvent) => {
    incrementPage()
    val tickets: IndexedSeq[Ticket] = paginate()

    if (tickets.nonEmpty) {
      allTicketsTab.pushDataToPanel(tickets)
    } else decrementPage()
  })

  // Ticket By Id Event Listeners
  ticketByIdTab.ticketByIdTopPane.goButton.addActionListener((_: ActionEvent) => {
    val id: Int = ticketByIdTab.ticketByIdTopPane.getSpinnerValue()
    val ticket: Ticket = requester.getTicketById(id)
    ticketByIdTab.ticketByIdBottomPane.updateTicketInfo(ticket)
  })

  // Helper functions
  def paginate(): IndexedSeq[Ticket] = {
    val perPage: Int = allTicketsTab.allTicketsTopPane.getSpinnerValue()
    requester.getAllTickets(perPage, pageNumber)
  }

  def incrementPage(): Unit = pageNumber += 1

  def decrementPage(): Unit = if (pageNumber > 1) pageNumber -= 1

  def resetPage(): Unit = pageNumber = 1

}
