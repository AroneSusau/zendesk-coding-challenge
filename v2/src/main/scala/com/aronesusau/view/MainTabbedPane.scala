package com.aronesusau.view

import com.aronesusau.controller.EventListener.{AllTicketsListener, TicketByIdListener}
import com.aronesusau.view.AllTicketsTab.AllTicketsTabPanel
import com.aronesusau.view.TicketByIdTab.TicketByIdPanel
import javax.swing.{JOptionPane, JTabbedPane}

private[aronesusau] case class MainTabbedPane() extends JTabbedPane {

  val allTicketsTab: AllTicketsTabPanel       = AllTicketsTabPanel()
  val ticketByIdTab: TicketByIdPanel          = TicketByIdPanel()
  val allTicketsListener: AllTicketsListener  = AllTicketsListener(this)
  val ticketByIdListener: TicketByIdListener  = TicketByIdListener(this)
  val c1: Unit                                = addTab("All Tickets", allTicketsTab)
  val c2: Unit                                = addTab("Ticket By Id", ticketByIdTab)

  // All Tickets Event Listeners
  allTicketsTab.allTicketsButtonPanel.goBtn.addActionListener(allTicketsListener.allTicketsGoButtonListener)
  allTicketsTab.allTicketsButtonPanel.prevBtn.addActionListener(allTicketsListener.allTicketsPrevButtonListener)
  allTicketsTab.allTicketsButtonPanel.nextBtn.addActionListener(allTicketsListener.allTicketsNextButtonListener)

  // Ticket By Id Event Listeners
  ticketByIdTab.ticketByIdButtonPanel.goButton.addActionListener(ticketByIdListener.ticketByIdGoButtonListener)

}
