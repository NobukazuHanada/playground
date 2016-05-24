import Http 
import Html exposing (div, text)
import Html.Attributes
import Json.Decode as D exposing ((:=))
import Task exposing (..)
import Debug exposing (log)


main =
   Signal.map (\result -> div [] [text result]) myMailbox.signal


helloWorldTask : Task Http.Error String
helloWorldTask =
  Http.get (D.object1 identity ("msg" := D.string)) "http://localhost:8080"


myMailbox : Signal.Mailbox String
myMailbox = Signal.mailbox ""

sendMe : String -> Task x ()
sendMe = Signal.send myMailbox.address

sendMeError : Http.Error -> Task x ()
sendMeError error = 
  sendMe <| case error of
    Http.Timeout ->
      "timeout"
                      
    Http.UnexpectedPayload msg ->
        "unexpect payload : " ++ msg
                                   
    Http.BadResponse code msg ->
      "bad respose, code : " ++ (toString code) ++ " msg : " ++ msg

                             

port helloWorldRunner : Task x ()
port helloWorldRunner =
    helloWorldTask `andThen` sendMe
                   `onError` sendMeError
                   
  
                            
 
                           
