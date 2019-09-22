package com.aronesusau.view

import com.aronesusau.controller.TabsEventListener
import com.aronesusau.view.AllTicketsPane.AllTicketsTab
import com.aronesusau.view.TicketByIdPane.TicketByIdTab
import javax.swing.JTabbedPane

case class MainTabbedPane() extends JTabbedPane {

  val allTicketsTab: AllTicketsTab = AllTicketsTab()
  val ticketByIdTab: TicketByIdTab = TicketByIdTab()
  val tabsEventListener: TabsEventListener = TabsEventListener(allTicketsTab, ticketByIdTab)

  addTab("All Tickets", allTicketsTab)
  addTab("Ticket By Id", ticketByIdTab)

  // All Tickets Event Listeners
  allTicketsTab.allTicketsTopPane.goBtn.addActionListener(tabsEventListener.allTicketsGoButtonListener)
  allTicketsTab.allTicketsTopPane.prevBtn.addActionListener(tabsEventListener.allTicketsPrevButtonListener)
  allTicketsTab.allTicketsTopPane.nextBtn.addActionListener(tabsEventListener.allTicketsNextButtonListener)

  // Ticket By Id Event Listeners
  ticketByIdTab.ticketByIdTopPane.goButton.addActionListener(tabsEventListener.ticketByIdGoButtonListener)

}
