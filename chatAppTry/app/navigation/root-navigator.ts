import { createStackNavigator } from "react-navigation"
import { ChatScreen } from "../screens/chat-screen/chat-screen"
import { PrimaryNavigator } from "./primary-navigator"
import {
} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars

export const RootNavigator = createStackNavigator(
  {
    chatScreen: { screen: ChatScreen },
    primaryStack: { screen: PrimaryNavigator },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
