package com.aronesusau.view.AllTicketsPane.InnerPanes

import java.awt.FlowLayout

import javax.swing.{JButton, JPanel}

case class AllTicketsTopPane() extends JPanel {

  setLayout(new FlowLayout())

  add(new JButton("Per Page"))
  add(new JButton("Go"))
  add(new JButton("Reset"))
  add(new JButton("Prev"))
  add(new JButton("Next"))

}
