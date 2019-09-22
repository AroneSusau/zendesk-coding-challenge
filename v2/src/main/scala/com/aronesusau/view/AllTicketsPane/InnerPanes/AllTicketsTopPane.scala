package com.aronesusau.view.AllTicketsPane.InnerPanes

import java.awt.{Component, Font, GridLayout}

import javax.swing.border.EmptyBorder
import javax.swing.{ImageIcon, JButton, JLabel, JPanel, JSpinner}

case class AllTicketsTopPane() extends JPanel {

  setLayout(new GridLayout(1, 8))
  setBorder(new EmptyBorder(0, 0, 10, 5))

  val perPageLabel: JLabel = new JLabel("Per page:")
  val perPageInput: JSpinner = new JSpinner()

  val goBtn: JButton = new JButton(new ImageIcon("resources/search.png"))
  val prevBtn: JButton = new JButton(new ImageIcon("resources/arrow-left.png"))
  val nextBtn: JButton = new JButton(new ImageIcon("resources/arrow-right.png"))

  perPageLabel.setFont(new Font("perPage", Font.PLAIN, 11))

  // Empty placeholders in grid.
  val c1: Component = add(perPageLabel)
  val c2: Component = add(perPageInput)
  val c3: Component = add(goBtn)
  val c4: Component = add(new JPanel())
  val c5: Component = add(new JPanel())
  val c6: Component = add(new JPanel())
  val c7: Component = add(prevBtn)
  val c8: Component = add(nextBtn)

  def getSpinnerValue: Int = {
    Integer.parseInt(perPageInput.getValue.toString)
  }
}
