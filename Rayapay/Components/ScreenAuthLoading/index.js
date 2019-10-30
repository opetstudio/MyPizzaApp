import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native'
import {isLoggedIn} from '../../Lib/Utils'

class ScreenAuthLoading extends React.Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync = this._bootstrapAsync.bind(this)
  }
  componentWillMount () {
    this._bootstrapAsync()
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const isLogin = isLoggedIn(this.props.isLoggedIn)
    console.log('isLogin=', isLogin)
    this.props.navigation.navigate(isLogin ? 'loggedinNavigator' : 'unloggedinNavigator')
  };

  // Render any loading content that you like here
  render () {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}
export default ScreenAuthLoading
