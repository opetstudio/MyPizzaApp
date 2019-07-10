import React from 'react'
import { storiesOf } from '@storybook/react-native'
// import {
//   View,
//   Image,
//   TouchableOpacity
// } from 'react-native'
// import StyledText from '../StyledText'
// import {Images} from '../../Themes'

// import Button from './index'
import PrimaryButton from './PrimaryButton'

storiesOf('Button')
  .add('primaryButton', () => (
    // without title
    <PrimaryButton />
  ))
  .add('primaryButton with label', () => (
    // using title
    <PrimaryButton title={'Title'} />
  ))
  .add('primaryButton with gradient background', () => (
    // using title
    <PrimaryButton colors={'gradient'} title={'Gradient background'} />
  ))
  .add('primaryButton with green background', () => (
    // using title
    <PrimaryButton colors={'#0f0'} title={'Green Button'} />
  ))
  .add('primaryButton with red background', () => (
    // using title
    <PrimaryButton colors={'#f00'} title={'Red Button'} />
  ))
  .add('primaryButton with blue background', () => (
    // using title
    <PrimaryButton colors={'#00f'} title={'Blue Button'} />
  ))
  // .add('withImage', () => (
  //   <Button type='tab' onPress={() => { alert('test') }}>
  //     <View style={{backgroundColor: 'red'}}>
  //       <StyledText
  //         i18nKey='dashboard-more'
  //         textStyle='h13LtGreyS'
  //         upperCase={false}
  //     />
  //       <Image
  //         source={Images.chevronRight2}
  //     />
  //     </View>
  //   </Button>
  // ))
  // .add('link', () => (
  //   <Button
  //     onPress={() => {}}
  //     i18nKey={'view more'}
  //     upperCase={false}
  //     type='link'
  //     addedStyle={{backgroundColor: 'red'}}
  //     addedTextStyle={{color: 'blue'}}
  //   />
  // ))
  // .add('tab', () => (
  //   <Button
  //     onPress={() => {}}
  //     i18nKey={'tab menu'}
  //     upperCase={false}
  //     type='tab'
  //     addedStyle={{backgroundColor: 'red'}}
  //     addedTextStyle={{color: 'yellow'}}
  //   />
  // ))
  // .add('primary', () => (
  //   <Button
  //     onPress={() => {}}
  //     i18nKey={'Primary'}
  //     upperCase={false}
  //     addedStyle={{backgroundColor: 'red'}}
  //     addedTextStyle={{color: 'yellow'}}
  //   />
  // ))
  // .add('RowWithImageThums', () => (
  //   <RowList componentHeight={100} textUp='Contact Name'
  //     textDown='1234567890'
  //     Text='Mobile' />
  // ))
