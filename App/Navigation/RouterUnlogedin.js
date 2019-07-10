import {
  createStackNavigator as StackNavigator, createAppContainer
} from 'react-navigation'
import ScreenOnboard from '../Components/ScreenOnboard'
import styles from './Styles/NavigationStyles'
import {isIphoneX} from '../Lib/helper/platform'

const RouterUnlogedin = StackNavigator({
  ScreenOnboard: { screen: ScreenOnboard }
}, {
  headerMode: 'none',
  initialRouteName: 'ScreenOnboard',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})

const App = createAppContainer(RouterUnlogedin)

export default App
