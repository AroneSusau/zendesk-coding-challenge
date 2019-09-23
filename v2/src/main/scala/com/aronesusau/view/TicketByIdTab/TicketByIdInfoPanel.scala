package com.aronesusau.view.TicketByIdTab

import java.awt.{BorderLayout, Color, Component, GridLayout}
import javax.swing.border.{EmptyBorder, LineBorder}
import javax.swing.{JLabel, JPanel, JTextArea}

private[aronesusau] case class TicketByIdInfoPanel() extends JPanel {

  setLayout(new BorderLayout())

  val idLabel: JLabel               = new JLabel("<html><b>Id:</b></html> ")
  val requesterIdLabel: JLabel      = new JLabel("<html><b>UID:</b></html> ")
  val subjectIdLabel: JLabel        = new JLabel("<html><b>Subject:</b></html> ")
  val descriptionIdLabel: JTextArea = new JTextArea()
  val loadingIcon: JLabel           = new JLabel()
  val topPanel: JPanel              = new JPanel()
  val topTitlePanel: JPanel         = new JPanel()
  val c1: Component                 = topTitlePanel.add(idLabel)
  val c2: Component                 = topTitlePanel.add(requesterIdLabel)
  val c3: Component                 = topTitlePanel.add(loadingIcon)
  val c4: Component                 = topTitlePanel.add(new JPanel())
  val c5: Component                 = topPanel.add(topTitlePanel)
  val c6: Component                 = topPanel.add(subjectIdLabel)
  val c7: Unit                      = add(topPanel, BorderLayout.NORTH)
  val c8: Component                 = add(descriptionIdLabel)

  topTitlePanel.setLayout(new GridLayout(1, 5, 10, 2))
  topPanel.setLayout(new GridLayout(2, 1, 10, 2))
  subjectIdLabel.setBorder(new EmptyBorder(0, 0, 10, 10))
  descriptionIdLabel.setBorder(new LineBorder(Color.LIGHT_GRAY))
  descriptionIdLabel.setEditable(false)
  descriptionIdLabel.setLineWrap(true)

}
