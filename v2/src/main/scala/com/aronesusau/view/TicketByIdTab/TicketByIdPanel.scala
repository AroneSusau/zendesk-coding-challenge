package com.aronesusau.view.TicketByIdTab

import java.awt.{BorderLayout, Component}

import com.aronesusau.model.Ticket
import com.aronesusau.view.MainTabbedPane
import javax.swing.JPanel

private[aronesusau] case class TicketByIdPanel() extends JPanel {

  setLayout(new BorderLayout())

  val ticketByIdButtonPanel = TicketByIdButtonPanel()
  val ticketByIdInfoPanel   = TicketByIdInfoPanel()
  val c1: Unit              = add(ticketByIdButtonPanel, BorderLayout.NORTH)
  val c2: Component         = add(ticketByIdInfoPanel)

  def pushDataToPanel(ticket: Ticket): Unit = {
    ticketByIdInfoPanel.idLabel.setText("<html><b>Id:</b> " + ticket.id + "</html")
    ticketByIdInfoPanel.requesterIdLabel.setText("<html><b>UID:</b> " + ticket.requesterId + "</html")
    ticketByIdInfoPanel.subjectIdLabel.setText("<html><b>Subject:</b> " + ticket.subject + "</html")
    ticketByIdInfoPanel.descriptionIdLabel.setText(ticket.description)
  }

}
