package com.aronesusau.view.TicketByIdPane

import java.awt.BorderLayout

import com.aronesusau.view.TicketByIdPane.InnerPanes.{TicketByIdBottomPane, TicketByIdTopPane}
import javax.swing.JPanel

case class TicketByIdTab() extends JPanel{

  val ticketByIdTopPane = TicketByIdTopPane()
  val ticketByIdBottomPane = TicketByIdBottomPane()

  setLayout(new BorderLayout())

  add(ticketByIdTopPane, BorderLayout.NORTH)
  add(ticketByIdBottomPane)

}
