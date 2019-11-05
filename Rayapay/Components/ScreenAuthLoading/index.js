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
    console.log('componentWillMount=')
    this._bootstrapAsync()
  }
  componentDidUpdate (prevProps) {
    console.log('ScreenAuthLoadingcomponentDidUpdate prevProps=', prevProps)
    console.log('ScreenAuthLoadingcomponentDidUpdate this.props=', this.props)
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const isLogin = await isLoggedIn(this.props.sessionToken)
    console.log('_bootstrapAsync isLogin=>>>>>>>', isLogin)
    console.log('_bootstrapAsync this.props.isLoggedIn=>>>>>>>', this.props.isLoggedIn)
    if (isLogin && !this.props.isLoggedIn) {
      this.props.sessionPatch({isLoggedIn: true})
    }
    if (!isLogin && this.props.isLoggedIn) {
      this.props.sessionPatch({isLoggedIn: false})
    }
    this.props.navigation.navigate(isLogin ? 'loggedinNavigator' : 'unloggedinNavigator')
  };

  // Render any loading content that you like here
  render () {
    console.log('ScreenAuthLoading render this.props=', this.props)
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}
export default ScreenAuthLoading
