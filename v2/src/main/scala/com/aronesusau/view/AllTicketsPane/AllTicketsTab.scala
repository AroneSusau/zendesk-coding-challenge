package com.aronesusau.view.AllTicketsPane

import java.awt.{BorderLayout, Color, Component}

import com.aronesusau.view.AllTicketsPane.InnerPanes.AllTicketsTopPane
import javax.swing.table.{DefaultTableModel, TableCellRenderer}
import javax.swing.{JPanel, JScrollPane, JTable}

case class AllTicketsTab() extends JPanel {

  val tableModel: DefaultTableModel = new DefaultTableModel(0, 0)
  tableModel.addColumn("Id")
  tableModel.addColumn("UID")
  tableModel.addColumn("Subject")

  val table: JTable = new JTable(tableModel) {
    override def prepareRenderer(renderer: TableCellRenderer, row: Int, column: Int): Component = {
      val comp: Component  = super.prepareRenderer(renderer, row, column)
      comp.setBackground(if (row % 2 == 0) Color.WHITE else new Color(220, 220, 220))
      comp
    }
  }
  table.getColumnModel.getColumn(0).setPreferredWidth(30)
  table.getColumnModel.getColumn(1).setPreferredWidth(100)
  table.getColumnModel.getColumn(2).setPreferredWidth(400)

  val scrollPane: JScrollPane = new JScrollPane(table)
  val allTicketsTopPane: AllTicketsTopPane = AllTicketsTopPane()

  setLayout(new BorderLayout())

  add(allTicketsTopPane, BorderLayout.NORTH)
  add(scrollPane)

}
