package com.aronesusau.view

import com.aronesusau.controller.TabsEventListener
import com.aronesusau.view.AllTicketsTab.AllTicketsTabPanel
import com.aronesusau.view.TicketByIdTab.TicketByIdPanel

import javax.swing.JTabbedPane

private[aronesusau] case class MainTabbedPane() extends JTabbedPane {

  val allTicketsTab: AllTicketsTabPanel     = AllTicketsTabPanel()
  val ticketByIdTab: TicketByIdPanel        = TicketByIdPanel()
  val tabsEventListener: TabsEventListener  = TabsEventListener(allTicketsTab, ticketByIdTab)
  val c1: Unit                              = addTab("All Tickets", allTicketsTab)
  val c2: Unit                              = addTab("Ticket By Id", ticketByIdTab)

  // All Tickets Event Listeners
  allTicketsTab.allTicketsButtonPanel.goBtn.addActionListener(tabsEventListener.allTicketsGoButtonListener)
  allTicketsTab.allTicketsButtonPanel.prevBtn.addActionListener(tabsEventListener.allTicketsPrevButtonListener)
  allTicketsTab.allTicketsButtonPanel.nextBtn.addActionListener(tabsEventListener.allTicketsNextButtonListener)

  // Ticket By Id Event Listeners
  ticketByIdTab.ticketByIdButtonPanel.goButton.addActionListener(tabsEventListener.ticketByIdGoButtonListener)

}
