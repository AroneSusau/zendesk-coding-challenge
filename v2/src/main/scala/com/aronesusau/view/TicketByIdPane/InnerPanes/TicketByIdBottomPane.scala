package com.aronesusau.view.TicketByIdPane.InnerPanes

import java.awt.{BorderLayout, Color, Component, GridLayout}

import com.aronesusau.model.Ticket
import javax.swing.border.{EmptyBorder, LineBorder}
import javax.swing.{JLabel, JPanel, JTextArea}

case class TicketByIdBottomPane() extends JPanel {

  setLayout(new BorderLayout())

  val idLabel = new JLabel("<html><b>Id:</b></html> ")
  val requesterIdLabel = new JLabel("<html><b>UID:</b></html> ")
  val subjectIdLabel = new JLabel("<html><b>Subject:</b></html> ")
  val descriptionIdLabel = new JTextArea()
  val loadingIcon = new JLabel()

  val topPanel = new JPanel()
  val topTitlePanel = new JPanel()

  subjectIdLabel.setBorder(new EmptyBorder(0, 0, 10, 10))

  descriptionIdLabel.setEditable(false)
  descriptionIdLabel.setLineWrap(true)
  descriptionIdLabel.setBorder(new LineBorder(Color.LIGHT_GRAY))

  topTitlePanel.setLayout(new GridLayout(1, 5, 10, 2))
  topPanel.setLayout(new GridLayout(2, 1, 10, 2))

  val c1: Component = topTitlePanel.add(idLabel)
  val c2: Component = topTitlePanel.add(requesterIdLabel)
  val c3: Component = topTitlePanel.add(loadingIcon)
  val c4: Component = topTitlePanel.add(new JPanel())
  val c5: Component = topPanel.add(topTitlePanel)
  val c6: Component = topPanel.add(subjectIdLabel)
  val c7: Unit = add(topPanel, BorderLayout.NORTH)
  val c8: Component = add(descriptionIdLabel)

  def pushDataToPanel(ticket: Ticket): Unit = {
    idLabel.setText("<html><b>Id:</b> " + ticket.id + "</html")
    requesterIdLabel.setText("<html><b>UID:</b> " + ticket.requesterId + "</html")
    subjectIdLabel.setText("<html><b>Subject:</b> " + ticket.subject + "</html")
    descriptionIdLabel.setText(ticket.description)
  }

}
