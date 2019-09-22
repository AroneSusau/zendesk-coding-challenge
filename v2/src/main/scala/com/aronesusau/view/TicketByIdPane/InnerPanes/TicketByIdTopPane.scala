package com.aronesusau.view.TicketByIdPane.InnerPanes

import java.awt.{Component, Font, GridLayout}

import javax.swing.{ImageIcon, JButton, JLabel, JPanel, JSpinner, SpinnerNumberModel}

case class TicketByIdTopPane() extends JPanel {

  setLayout(new GridLayout(1, 8))

  val textLabel = new JLabel("Enter Id: ")
  val spinnerModel = new SpinnerNumberModel()
  val jSpinner = new JSpinner(spinnerModel)
  val goButton = new JButton(new ImageIcon("resources/search.png"))

  textLabel.setFont(new Font("perPage", Font.PLAIN, 11))

  val c1: Component = add(textLabel)
  val c2: Component = add(jSpinner)
  val c3: Component = add(goButton)
  val c4: Component = add(new JLabel())
  val c5: Component = add(new JLabel())
  val c6: Component = add(new JLabel())
  val c7: Component = add(new JLabel())
  val c8: Component = add(new JLabel())

  def getSpinnerValue(): Int = {
    Integer.parseInt(jSpinner.getValue.toString)
  }

}
