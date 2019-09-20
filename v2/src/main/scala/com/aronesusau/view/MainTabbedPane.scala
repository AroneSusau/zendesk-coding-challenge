package com.aronesusau.view

import java.awt.event.{ActionEvent, ActionListener}

import com.aronesusau.controller.Requester
import com.aronesusau.view.AllTicketsPane.AllTicketsTab
import com.aronesusau.view.TicketByIdPane.TicketByIdTab
import javax.swing.JTabbedPane
import play.api.libs.json.JsObject

case class MainTabbedPane() extends JTabbedPane {

  val allTicketsTab: AllTicketsTab = AllTicketsTab()
  val ticketByIdTab: TicketByIdTab = TicketByIdTab()

  addTab("All Tickets", allTicketsTab)
  addTab("Ticket By Id", ticketByIdTab)

  allTicketsTab.allTicketsTopPane.goBtn.addActionListener((e: ActionEvent) => {
    println(e.toString)
  })

  allTicketsTab.allTicketsTopPane.prevBtn.addActionListener((e: ActionEvent) => {
    println(e.toString)
  })

  allTicketsTab.allTicketsTopPane.nextBtn.addActionListener((e: ActionEvent) => {
    println(e.toString)
  })

  ticketByIdTab.ticketByIdTopPane.goButton.addActionListener((e: ActionEvent) => {
    val id: Int = Integer.parseInt(ticketByIdTab.ticketByIdTopPane.jSpinner.getValue.toString)
    val response: JsObject = Requester.getTicketById(id)

    println(id)
    println(response)
  })

}
