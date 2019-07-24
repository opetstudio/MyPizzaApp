import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import {
  IconNB,
  Icon,
  Button,
  Fab
} from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FabShareStyle'

class FabCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  render () {
    return (
      <View style={{ }}>
        <Fab
          active={this.state.active}
          direction='up'
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position='bottomRight'
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name='menu' />
          {/* <Button style={{ backgroundColor: '#34A34F' }}>
            <IconNB name='logo-whatsapp' />
          </Button> */}
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name='add' />
          </Button>
          {/* <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name='chatboxes' />
          </Button> */}
          {/* <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <IconNB name='ios-mail' />
          </Button> */}
        </Fab>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FabCreate)
