import * as React from "react"
import { View, ViewStyle } from "react-native"
import { NavigationScreenProps, NavigationParams } from "react-navigation"
import { Wallpaper } from "../../components"
import { GiftedChat } from "react-native-gifted-chat"
import WebSocket from "isomorphic-ws"

const FULL: ViewStyle = { flex: 1 }
const URL = "ws://localhost:3030"

export interface ChatScreenProps extends NavigationScreenProps<{}> {}
export class ChatScreen extends React.Component<ChatScreenProps, NavigationParams> {
  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected")
    }

    this.ws.onmessage = evt => {
      // これいらないんじゃ？と思ってので
      // const message = JSON.parse(evt.data)
      // this.addMessage(message)
      const message = JSON.parse(evt.data.toString("utf-8", 0))
      __DEV__ && console.tron.log(evt.data)
      this.addMessage([message])
    }

    this.ws.onclose = () => {
      console.log("disconnected")
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message => {
    this.setState(previousState => ({
      //stateで管理しているmessagesに受信したメッセージを追加
      messages: GiftedChat.append(previousState.messages, message),
    }))
  }

  //メッセージ内容をstateで管理
  state = {
    messages: [],
  }

  //「Send」ボタンが押された時に実行されるメソッド
  onSend = (messageString = []) => {
    __DEV__ && console.tron.log("?????????????????" + JSON.stringify(messageString))
    messageString.forEach(ms => {
      const message = {
        _id: ms._id,
        text: ms.text,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Tyler",
          avatar: "https://placeimg.com/140/140/any",
        },
      }
      this.ws.send(JSON.stringify(message))
    })
    this.addMessage(messageString)
  }

  render() {
    return (
      <View style={FULL}>
        <Wallpaper />
        <GiftedChat
          messages={this.state.messages} //stateで管理しているメッセージ
          onSend={message => this.onSend(message)} //送信ボタン押した時の動作
          user={{
            _id: 1,
          }}
        />
      </View>
    )
  }
}
