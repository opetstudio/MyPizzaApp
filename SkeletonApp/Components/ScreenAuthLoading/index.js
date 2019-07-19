import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native'

class ScreenAuthLoading extends React.Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const sessionToken = await AsyncStorage.getItem('sessionToken')
    console.log('sessionToken===>', sessionToken)
    // const userToken = await AsyncStorage.getItem('userToken')
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate('Auth')
    this.props.navigation.navigate(sessionToken ? 'loggedinNavigator' : 'unloggedinNavigator')
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
