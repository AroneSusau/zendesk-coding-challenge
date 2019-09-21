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

  // All Tickets
  allTicketsTab.allTicketsTopPane.goBtn.addActionListener((_: ActionEvent) => {
    val perPage: Int = Integer.parseInt(allTicketsTab.allTicketsTopPane.perPageInput.getValue.toString)
    val tickets: IndexedSeq[Ticket] = requester.getAllTickets(perPage)
    pushDataToPanel(tickets)
    resetPage()
  })

  allTicketsTab.allTicketsTopPane.prevBtn.addActionListener((_: ActionEvent) => {
    if (pageNumber > 0) {
      decrementPage()
      pushDataToPanel(paginate())
    }
  })

  allTicketsTab.allTicketsTopPane.nextBtn.addActionListener((_: ActionEvent) => {
    incrementPage()
    val tickets: IndexedSeq[Ticket] = paginate()

    if (tickets.nonEmpty) {
      pushDataToPanel(tickets)
    } else decrementPage()
  })

  // Ticket by Id
  ticketByIdTab.ticketByIdTopPane.goButton.addActionListener((_: ActionEvent) => {
    val id: Int = Integer.parseInt(ticketByIdTab.ticketByIdTopPane.jSpinner.getValue.toString)
    val ticket: Ticket = requester.getTicketById(id)
    val ticketDetailPanel = ticketByIdTab.ticketByIdBottomPane

    ticketDetailPanel.idLabel.setText("<html><b>Id:</b> " + ticket.id + "</html")
    ticketDetailPanel.requesterIdLabel.setText("<html><b>UID:</b> " + ticket.requesterId + "</html")
    ticketDetailPanel.subjectIdLabel.setText("<html><b>Subject:</b> " + ticket.subject + "</html")
    ticketDetailPanel.descriptionIdLabel.setText(ticket.description)
  })

  def paginate(): IndexedSeq[Ticket] = {
    val perPage: Int = Integer.parseInt(allTicketsTab.allTicketsTopPane.perPageInput.getValue.toString)
    requester.getAllTickets(perPage, pageNumber)
  }

  def incrementPage(): Unit = {
    pageNumber += 1
  }

  def decrementPage(): Unit = {
    if (pageNumber > 1) pageNumber -= 1
  }

  def resetPage(): Unit = {
    pageNumber = 1
  }

  def pushDataToPanel(tickets: IndexedSeq[Ticket]): Unit = {
    allTicketsTab.tableModel.setRowCount(0)
    tickets.foreach(ticket => {
      allTicketsTab.tableModel.addRow(Array[AnyRef](
        ticket.id,
        ticket.requesterId,
        ticket.subject
      ))
    })
  }

}
