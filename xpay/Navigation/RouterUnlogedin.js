import {
  createStackNavigator as StackNavigator, createAppContainer
} from 'react-navigation'
import ScreenHome from '../Components/ScreenHome'
import styles from './Styles/NavigationStyles'
import {isIphoneX} from '../Lib/helper/platform'

const RouterUnlogedin = StackNavigator({
  ScreenHome: { screen: ScreenHome }
}, {
  headerMode: 'none',
  initialRouteName: 'ScreenHome',
  navigationOptions: {
    headerStyle: styles.header
  },
  cardStyle: isIphoneX ? { shadowColor: 'transparent' } : {}
})

const App = createAppContainer(RouterUnlogedin)

export default App
