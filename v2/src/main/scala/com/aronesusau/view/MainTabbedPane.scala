package com.aronesusau.view

import java.awt.event.ActionEvent

import com.aronesusau.controller.Requester
import com.aronesusau.model.Ticket
import com.aronesusau.view.AllTicketsPane.AllTicketsTab
import com.aronesusau.view.TicketByIdPane.TicketByIdTab
import javax.swing.JTabbedPane

case class MainTabbedPane() extends JTabbedPane {

  val allTicketsTab: AllTicketsTab = AllTicketsTab()
  val ticketByIdTab: TicketByIdTab = TicketByIdTab()
  val requester: Requester = Requester()

  addTab("All Tickets", allTicketsTab)
  addTab("Ticket By Id", ticketByIdTab)

  // All Tickets
  allTicketsTab.allTicketsTopPane.goBtn.addActionListener((e: ActionEvent) => {
    println(e.toString)
  })

  allTicketsTab.allTicketsTopPane.prevBtn.addActionListener((e: ActionEvent) => {
    println(e.toString)
  })

  allTicketsTab.allTicketsTopPane.nextBtn.addActionListener((e: ActionEvent) => {
    println(e.toString)
  })

  // Ticket by Id
  ticketByIdTab.ticketByIdTopPane.goButton.addActionListener((e: ActionEvent) => {
    val id: Int = Integer.parseInt(ticketByIdTab.ticketByIdTopPane.jSpinner.getValue.toString)
    val ticket: Ticket = requester.getTicketById(id)
    val ticketDetailPanel = ticketByIdTab.ticketByIdBottomPane

    ticketDetailPanel.createdAtLabel.setText(ticket.createdAt)
    ticketDetailPanel.requesterIdLabel.setText(ticket.requesterId)
    ticketDetailPanel.subjectIdLabel.setText(ticket.subject)
    ticketDetailPanel.descriptionIdLabel.setText(ticket.description)

  })

}
