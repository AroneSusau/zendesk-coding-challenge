package com.aronesusau.view.AllTicketsPane.InnerPanes

import javax.swing.border.TitledBorder
import javax.swing.{JScrollPane, JTable}

case class AllTicketsBottomPane() extends JScrollPane {

  val columnNames = Array("First Name", "Last Name", "Sport", "# of Years", "Vegetarian")
  val data = Array(Array("Kathy", "Smith", "Snowboarding", 5, false, Array("John", "Doe", "Rowing", 3, true), Array("Sue", "Black", "Knitting", 2), false), Array("Jane", "White", "Speed reading", 20, true), Array("Joe", "Brown", "Pool", 10, false))

  val table = new JTable(30, 5)

  setBorder(new TitledBorder("Ticket Information"))

  add(table)

}
