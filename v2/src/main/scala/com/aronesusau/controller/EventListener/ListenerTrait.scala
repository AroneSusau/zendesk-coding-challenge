package com.aronesusau.controller.EventListener

import com.aronesusau.controller.Requester
import com.aronesusau.model.Ticket
import javax.swing.JOptionPane
import play.api.libs.json.JsValue

trait ListenerTrait {

  var pageNumber = 1
  val requester: Requester = Requester()

  def extractTicket(ticket: JsValue): Ticket = {
    val id: String = (ticket \ "id").get.toString()
    val requesterId: String = (ticket \ "requester_id").get.toString()
    val subject: String = (ticket \ "subject").get.toString()
    val description: String = (ticket \ "description").get.toString()
    Ticket(id, requesterId, subject, description)
  }

  def throwError(exception: Throwable): Unit = {
    val optionPane = new JOptionPane(exception.getMessage, JOptionPane.ERROR_MESSAGE)
    val dialog = optionPane.createDialog("Error")
    dialog.setAlwaysOnTop(true)
    dialog.setVisible(true)
  }

  def incrementPageNumber(): Unit = pageNumber += 1

  def decrementPageNumber(): Unit = if (pageNumber > 1) pageNumber -= 1

  def resetPageNumber(): Unit = pageNumber = 1

}
