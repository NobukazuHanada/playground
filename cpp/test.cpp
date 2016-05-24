#include <iostream>
#include <string>

int main( void )
{
  std::string hoge = "foobar";
  if( !hoge.empty() )
    {
      hoge = hoge.substr(3);
      std::cout << hoge << std::endl;
    }
  return 0;
}
