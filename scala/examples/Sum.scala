import scala.io._

def toInt(in: String) : Option[Int] =
  try {
    Some(Integer.parseInt(in.trim))
  } catch {
    case e: NumberFormatException => None
  }

def sum(in: Seq[String]) = {
  val ints = in.flatMap(s => toInt(s))
  ints.foldLeft(0)((a,b) => a + b)
}

val a = <b>foo</b>

println("Enter some numbers and press ctrl-D (Unix/Mac) ctrl-Z (Windows)")

val input = Source.fromInputStream(System.in)

val lines = input.getLines.toList

println("Sum " + sum(lines))
