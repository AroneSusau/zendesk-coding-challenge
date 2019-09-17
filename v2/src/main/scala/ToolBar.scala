import javax.swing.{JButton, JPanel, JTabbedPane}

case class ToolBar() extends JTabbedPane {

  addTab("Search By Id", AllTicketsPanel())
  addTab("All Tickets", SearchPanel())

}
