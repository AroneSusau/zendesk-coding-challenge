package com.aronesusau.view.AllTicketsTab

import com.aronesusau.model.Ticket

import java.awt.{BorderLayout, Color, Component}
import javax.swing.table.{DefaultTableModel, TableCellRenderer}
import javax.swing.{JPanel, JScrollPane, JTable}

private[aronesusau] case class AllTicketsTabPanel() extends JPanel {

  setLayout(new BorderLayout())

  val tableModel: DefaultTableModel                 = new DefaultTableModel(0, 0)
  val table: JTable                                 = new JTable(tableModel) {
    override def prepareRenderer(renderer: TableCellRenderer, row: Int, column: Int): Component = {
      val comp: Component = super.prepareRenderer(renderer, row, column)
      comp.setBackground(if (row % 2 == 0) Color.WHITE else new Color(220, 220, 220))
      comp
    }
  }

  val scrollPane: JScrollPane                       = new JScrollPane(table)
  val allTicketsButtonPanel: AllTicketsButtonPanel  = AllTicketsButtonPanel()
  val c1: Unit                                      = add(allTicketsButtonPanel, BorderLayout.NORTH)
  val c2: Component                                 = add(scrollPane)

  tableModel.addColumn("Id")
  tableModel.addColumn("UID")
  tableModel.addColumn("Subject")
  table.getColumnModel.getColumn(0).setPreferredWidth(30)
  table.getColumnModel.getColumn(1).setPreferredWidth(100)
  table.getColumnModel.getColumn(2).setPreferredWidth(400)

  def pushDataToPanel(tickets: IndexedSeq[Ticket]): Unit = {
    tableModel.setRowCount(0)
    tickets.foreach(ticket => {
      tableModel.addRow(Array[AnyRef](
        ticket.id,
        ticket.requesterId,
        ticket.subject ))
    })}

}

