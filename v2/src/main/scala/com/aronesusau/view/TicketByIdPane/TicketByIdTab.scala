package com.aronesusau.view.TicketByIdPane

import java.awt.{BorderLayout, Component}

import com.aronesusau.view.TicketByIdPane.InnerPanes.{TicketByIdBottomPane, TicketByIdTopPane}
import javax.swing.JPanel

case class TicketByIdTab() extends JPanel {

  val ticketByIdTopPane = TicketByIdTopPane()
  val ticketByIdBottomPane = TicketByIdBottomPane()

  setLayout(new BorderLayout())

  val c1: Unit = add(ticketByIdTopPane, BorderLayout.NORTH)
  val c2: Component = add(ticketByIdBottomPane)

}
