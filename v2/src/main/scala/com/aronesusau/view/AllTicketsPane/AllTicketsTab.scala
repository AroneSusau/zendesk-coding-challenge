package com.aronesusau.view.AllTicketsPane

import java.awt.BorderLayout

import com.aronesusau.view.AllTicketsPane.InnerPanes.{AllTicketsBottomPane, AllTicketsTopPane}
import javax.swing.JPanel

case class AllTicketsTab() extends JPanel {

  setLayout(new BorderLayout())

  add(AllTicketsTopPane(), BorderLayout.NORTH)
  add(AllTicketsBottomPane())

}
