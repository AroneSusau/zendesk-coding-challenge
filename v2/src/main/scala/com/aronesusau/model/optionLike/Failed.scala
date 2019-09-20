package com.aronesusau.model.optionLike

case class Failed[+A](title: String, message: String) extends Optional[A]
