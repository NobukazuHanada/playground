object Main extends App{
  def methodNobkzFunction(x:Int) = x + 3
  def functionValueNobkz = (x:Int) => x + 3

  methodNobkzFunction(functionValueNobkz(3))
}
