package com.aronesusau.view.TicketByIdTab

import java.awt.{Component, Font, GridLayout}
import javax.swing._

private[aronesusau] case class TicketByIdButtonPanel() extends JPanel {

  val textLabel: JLabel                 = new JLabel("Enter Id: ")
  val spinnerModel: SpinnerNumberModel  = new SpinnerNumberModel()
  val jSpinner: JSpinner                = new JSpinner(spinnerModel)
  val goButton: JButton                 = new JButton(new ImageIcon("resources/search.png"))
  val c1: Component                     = add(textLabel)
  val c2: Component                     = add(jSpinner)
  val c3: Component                     = add(goButton)
  val c4: Component                     = add(new JLabel())
  val c5: Component                     = add(new JLabel())
  val c6: Component                     = add(new JLabel())
  val c7: Component                     = add(new JLabel())
  val c8: Component                     = add(new JLabel())

  textLabel.setFont(new Font("perPage", Font.PLAIN, 11))
  setLayout(new GridLayout(1, 8))

  def getSpinnerValue: Int = Integer.parseInt(jSpinner.getValue.toString)

}
