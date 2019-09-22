package com.aronesusau.view.TicketByIdPane.InnerPanes

import java.awt.{Font, GridLayout}

import javax.swing.{ImageIcon, JButton, JLabel, JPanel, JSpinner, SpinnerNumberModel}

case class TicketByIdTopPane() extends JPanel {

  setLayout(new GridLayout(1, 8))

  val textLabel = new JLabel("Enter Id: ")
  val spinnerModel = new SpinnerNumberModel()
  val jSpinner = new JSpinner(spinnerModel)
  val goButton = new JButton(new ImageIcon("resources/search.png"))

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

  def getSpinnerValue(): Int = {
    Integer.parseInt(jSpinner.getValue.toString)
  }

}
