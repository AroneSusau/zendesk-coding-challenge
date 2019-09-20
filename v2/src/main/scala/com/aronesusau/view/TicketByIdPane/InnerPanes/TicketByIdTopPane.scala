package com.aronesusau.view.TicketByIdPane.InnerPanes

import java.awt.{ Font, GridLayout}
import javax.swing.{JButton, JLabel, JPanel, JSpinner, SpinnerNumberModel}

case class TicketByIdTopPane() extends JPanel {

  setLayout(new GridLayout(1, 8))

  val textLabel = new JLabel("Enter Ticket Id: ")
  val spinnerModel = new SpinnerNumberModel()
  val jSpinner = new JSpinner(spinnerModel)
  val goButton = new JButton("Go")

  spinnerModel.setMinimum(1)
  textLabel.setFont(new Font("perPage", Font.PLAIN, 11))

  add(textLabel)
  add(jSpinner)
  add(goButton)

  // Empty Placeholders for GridLayout
  add(new JLabel())
  add(new JLabel())
  add(new JLabel())
  add(new JLabel())
  add(new JLabel())

}
