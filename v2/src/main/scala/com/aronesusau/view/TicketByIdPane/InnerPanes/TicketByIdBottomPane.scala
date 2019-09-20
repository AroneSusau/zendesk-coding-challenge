package com.aronesusau.view.TicketByIdPane.InnerPanes

import java.awt.{BorderLayout, GridLayout}

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

  descriptionIdLabel.setEditable(false)
  descriptionIdLabel.setLineWrap(true)

  topTitlePanel.setLayout(new GridLayout(1, 5))
  topTitlePanel.add(idLabel)
  topTitlePanel.add(requesterIdLabel)
  topTitlePanel.add(loadingIcon)
  topTitlePanel.add(new JPanel())

  topPanel.setLayout(new GridLayout(2, 1))
  topPanel.add(topTitlePanel)
  topPanel.add(subjectIdLabel)

  add(topPanel, BorderLayout.NORTH)
  add(descriptionIdLabel)

}
