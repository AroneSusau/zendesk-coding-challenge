package com.aronesusau.view.AllTicketsPane

import java.awt.BorderLayout

import com.aronesusau.view.AllTicketsPane.InnerPanes.AllTicketsTopPane
import javax.swing.table.{DefaultTableModel, TableColumn}
import javax.swing.{JPanel, JScrollPane, JTable}

case class AllTicketsTab() extends JPanel {

  val tableModel: DefaultTableModel = new DefaultTableModel(0, 0)
  tableModel.addColumn("Id")
  tableModel.addColumn("UID")
  tableModel.addColumn("Subject")

  val table: JTable = new JTable(tableModel)
  table.getColumnModel.getColumn(0).setPreferredWidth(30)
  table.getColumnModel.getColumn(1).setPreferredWidth(100)
  table.getColumnModel.getColumn(2).setPreferredWidth(400)

  val scrollPane: JScrollPane = new JScrollPane(table)
  val allTicketsTopPane: AllTicketsTopPane = new AllTicketsTopPane()

  setLayout(new BorderLayout())

  add(allTicketsTopPane, BorderLayout.NORTH)
  add(scrollPane)

}
