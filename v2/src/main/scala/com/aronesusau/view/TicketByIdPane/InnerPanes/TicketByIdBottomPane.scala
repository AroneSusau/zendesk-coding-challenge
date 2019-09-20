package com.aronesusau.view.TicketByIdPane.InnerPanes

import java.awt.{BorderLayout, Color, GridLayout}

import javax.swing.border.LineBorder
import javax.swing.{JLabel, JPanel, JTextArea}

case class TicketByIdBottomPane() extends JPanel {

  setLayout(new GridLayout(2, 1))

  val createdAtLabel = new JLabel()
  val requesterIdLabel = new JLabel()
  val subjectIdLabel = new JLabel()
  val descriptionIdLabel = new JTextArea()

  val topPanel = new JPanel()

  descriptionIdLabel.setEditable(false)
  descriptionIdLabel.setLineWrap(true)

  topPanel.setLayout(new GridLayout(3, 3))
  topPanel.setBorder(new LineBorder(Color.BLACK))
  topPanel.add(createdAtLabel)
  topPanel.add(requesterIdLabel)
  topPanel.add(subjectIdLabel)

  add(topPanel)
  add(descriptionIdLabel)

}
