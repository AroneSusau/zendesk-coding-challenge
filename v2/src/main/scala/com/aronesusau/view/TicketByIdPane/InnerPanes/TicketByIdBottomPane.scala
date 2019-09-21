package com.aronesusau.view.TicketByIdPane.InnerPanes

import java.awt.{BorderLayout, Color, GridLayout}

import javax.swing.border.{EmptyBorder, LineBorder, TitledBorder}
import javax.swing.{ImageIcon, JLabel, JPanel, JTextArea}

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
  topTitlePanel.add(idLabel)
  topTitlePanel.add(requesterIdLabel)
  topTitlePanel.add(loadingIcon)
  topTitlePanel.add(new JPanel())

  topPanel.setLayout(new GridLayout(2, 1, 10, 2))
  topPanel.add(topTitlePanel)
  topPanel.add(subjectIdLabel)

  add(topPanel, BorderLayout.NORTH)
  add(descriptionIdLabel)

}
