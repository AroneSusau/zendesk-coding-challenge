package com.aronesusau.view.AllTicketsPane

import java.awt.BorderLayout

import com.aronesusau.view.AllTicketsPane.InnerPanes.AllTicketsTopPane
import javax.swing.{JPanel, JScrollPane, JTable}

case class AllTicketsTab() extends JPanel {

  val table: JTable = new JTable(20, 5)
  val scrollPane: JScrollPane = new JScrollPane(table)
  val allTicketsTopPane: AllTicketsTopPane = new AllTicketsTopPane()

  setLayout(new BorderLayout())

  add(allTicketsTopPane, BorderLayout.NORTH)
  add(scrollPane)

}
