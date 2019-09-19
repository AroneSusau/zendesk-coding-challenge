package com.aronesusau.view.AllTicketsPane.InnerPanes

import java.awt.FlowLayout

import javax.swing.{JButton, JLabel, JPanel, JSpinner, JTextField}

case class AllTicketsTopPane() extends JPanel {

  setLayout(new FlowLayout())

  val perPageLabel: JLabel = new JLabel("Tickets per page")
  val perPageInput: JSpinner = new JSpinner()
  val goBtn: JButton = new JButton("Go")
  val resetBtn: JButton = new JButton("Reset")
  val prevBtn: JButton = new JButton("Prev")
  val nextBtn: JButton = new JButton("Next")

  add(perPageLabel)
  add(perPageInput)
  add(goBtn)
  add(resetBtn)
  add(prevBtn)
  add(nextBtn)
}
