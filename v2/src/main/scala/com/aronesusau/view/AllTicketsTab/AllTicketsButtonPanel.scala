package com.aronesusau.view.AllTicketsTab

import java.awt.{Component, Font, GridLayout}
import javax.swing.border.EmptyBorder
import javax.swing._

private[aronesusau] case class AllTicketsButtonPanel() extends JPanel {

  val perPageLabel: JLabel    = new JLabel("Per page:")
  val perPageInput: JSpinner  = new JSpinner()
  val goBtn: JButton          = new JButton(new ImageIcon("resources/search.png"))
  val prevBtn: JButton        = new JButton(new ImageIcon("resources/arrow-left.png"))
  val nextBtn: JButton        = new JButton(new ImageIcon("resources/arrow-right.png"))
  val c1: Component           = add(perPageLabel)
  val c2: Component           = add(perPageInput)
  val c3: Component           = add(goBtn)
  val c4: Component           = add(new JPanel())
  val c5: Component           = add(new JPanel())
  val c6: Component           = add(new JPanel())
  val c7: Component           = add(prevBtn)
  val c8: Component           = add(nextBtn)

  setLayout(new GridLayout(1, 8))
  setBorder(new EmptyBorder(0, 0, 10, 5))
  perPageLabel.setFont(new Font("perPage", Font.PLAIN, 11))

  def getSpinnerValue: Int = Integer.parseInt(perPageInput.getValue.toString)
}
