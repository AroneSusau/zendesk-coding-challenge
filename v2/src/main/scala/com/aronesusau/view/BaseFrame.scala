package com.aronesusau.view


import java.awt.Component

import javax.swing.JFrame


class BaseFrame() extends JFrame {

  val c1: Component = add(MainTabbedPane())

  setTitle("Ticket Viewer")
  setSize(600, 400)
  setResizable(false)
  setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE)
  setVisible(true)

}
