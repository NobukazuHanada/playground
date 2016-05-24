import scala.reflect.runtime.{universe => ru}
import ru._

trait Option[+A] {
  def map[B](f : A => B ) : Option[B] = this match {
    case Some(a) => Some(f(a))
    case None => None
  }

  def flatMap[B]( f : A => Option[B] ) = this match {
    case Some(a) => f(a)
    case None => None
  }

  def getOrElse[B >: A](default: => B) : B = this match{
    case Some(a) => a
    case None => default
  }
  

  def filter(f : A => Boolean) : Option[A] = this.flatMap(a => if(f(a)) this else None)

  def ap[B](optF: Option[A => B]) =
   optF match {
      case Some(f) =>
         this.map(f)
      case None =>
         None
    }

}

case class Some[+A] (get : A) extends Option[A] 
case object None extends Option[Nothing]


class Person{
  var name = ""
}

class Teacher extends Person { val age = 10 }




object Hello {

  def map2[A,B,C](a : Option[A], b : Option[B], f : (A,B) => C) : Option[C] = 
    b.ap(a.map(f.curried))

  def map2a[A,B,C](ma: Option[A], mb : Option[B], f : (A,B) => C) : Option[C] =
    ma.flatMap( (a) => 
      mb.flatMap( (b) =>
        Some( f(a,b) ) ))


  def getType[A : TypeTag](obj:A) : Type = typeOf[A]

  val sub = (x : Double, y : Double) => x - y
  val square = (x:Double) => math.pow(x,2)
  def flip[a, b, c]: (a => b => c) => b => a => c = f => x => y => f(y)(x)

  def mean(xs : Seq[Double]) : Option[Double] = 
    if (xs.isEmpty) None
    else Some(xs.sum / xs.length)

  //def variance(xs : Seq[Double]) : Option[Double] =
  //  mean(xs).flatMap(ave =>  
  //           xs.map( sub.curried(ave).andThen(flip(math.pow.curried))))
                   

  def main(args:Array[String]) {
    println("hello")
   // println(variance(List(10.0,20.0,30.0)))
    println(map2a(Some(1),Some(2), (x:Int,y:Int)=> x + y))
  }
}
