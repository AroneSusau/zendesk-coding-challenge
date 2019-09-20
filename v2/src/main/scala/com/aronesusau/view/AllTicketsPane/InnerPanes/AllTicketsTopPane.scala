package com.aronesusau.view.AllTicketsPane.InnerPanes

import java.awt.{ Font, GridLayout}
import javax.swing.{JButton, JLabel, JPanel, JSpinner}

case class AllTicketsTopPane() extends JPanel {

  setLayout(new GridLayout(1, 8))

  val perPageLabel: JLabel = new JLabel("Tickets per page:")
  val perPageInput: JSpinner = new JSpinner()
  val goBtn: JButton = new JButton("Go")
  val prevBtn: JButton = new JButton("Prev")
  val nextBtn: JButton = new JButton("Next")

  perPageLabel.setFont(new Font("perPage", Font.PLAIN, 11))

  add(perPageLabel)
  add(perPageInput)
  add(goBtn)

  // Empty placeholders in grid.
  add(new JPanel())
  add(new JPanel())
  add(new JPanel())

  add(prevBtn)
  add(nextBtn)
}
