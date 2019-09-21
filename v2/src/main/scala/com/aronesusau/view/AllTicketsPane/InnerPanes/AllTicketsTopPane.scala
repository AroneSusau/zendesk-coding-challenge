package com.aronesusau.view.AllTicketsPane.InnerPanes

import java.awt.{Dimension, Font, GridLayout}

import javax.swing.{ImageIcon, JButton, JLabel, JPanel, JSpinner}

case class AllTicketsTopPane() extends JPanel {

  setLayout(new GridLayout(1, 8))

  val perPageLabel: JLabel = new JLabel("Per page:")
  val perPageInput: JSpinner = new JSpinner()

  val goBtn: JButton = new JButton(new ImageIcon("resources/search.png"))
  val prevBtn: JButton = new JButton(new ImageIcon("resources/arrow-left.png"))
  val nextBtn: JButton = new JButton(new ImageIcon("resources/arrow-right.png"))

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
