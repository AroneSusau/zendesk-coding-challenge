package com.aronesusau.view

import com.aronesusau.view.AllTicketsPane.AllTicketsTab
import com.aronesusau.view.TicketByIdPane.TicketByIdTab
import javax.swing.JTabbedPane

case class MainTabbedPane() extends JTabbedPane {

  val allTicketsTab: AllTicketsTab = AllTicketsTab()
  val ticketByIdTab: TicketByIdTab = TicketByIdTab()

  addTab("All Tickets", allTicketsTab)
  addTab("Ticket By Id", ticketByIdTab)

}
