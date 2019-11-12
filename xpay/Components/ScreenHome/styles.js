import { StyleSheet } from 'react-native'
import { Metrics, Colors as colors } from '../../Themes'

const width = Metrics.screenWidth
const height = Metrics.screenHeight

export const styles = StyleSheet.create({
  rect: {
    flex: 1,
    width: width,
    height: 250,
    backgroundColor: '#eb1c24'
  }
})
