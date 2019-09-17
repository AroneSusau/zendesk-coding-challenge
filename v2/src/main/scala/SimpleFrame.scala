import java.awt.BorderLayout

import javax.swing.JFrame

case class SimpleFrame() extends JFrame {

  add(ToolBar())

  this.setSize(800, 500)
  this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE)
  this.setResizable(false)
  this.setVisible(true)

}
