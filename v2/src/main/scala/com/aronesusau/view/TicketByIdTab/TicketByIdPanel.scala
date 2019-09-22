package com.aronesusau.view.TicketByIdTab

import java.awt.{BorderLayout, Component}
import javax.swing.JPanel

private[aronesusau] case class TicketByIdPanel() extends JPanel {

  setLayout(new BorderLayout())

  val ticketByIdButtonPanel = TicketByIdButtonPanel()
  val ticketByIdInfoPanel   = TicketByIdInfoPanel()
  val c1: Unit              = add(ticketByIdButtonPanel, BorderLayout.NORTH)
  val c2: Component         = add(ticketByIdInfoPanel)

}
