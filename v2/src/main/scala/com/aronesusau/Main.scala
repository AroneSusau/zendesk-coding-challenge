package com.aronesusau

import com.aronesusau.view.BaseFrame
import javax.swing.SwingUtilities

object Main extends App {
  SwingUtilities invokeLater (() => new BaseFrame())
}
