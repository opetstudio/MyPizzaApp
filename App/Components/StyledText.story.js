import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {View} from 'react-native'

import StyledText from './StyledText'
import I18n from '../I18n'

const textMessage = I18n.t

storiesOf('Styled Text')
  .add('h21MedWhiteT2NLS uppercase', () => (
    <View style={{backgroundColor: 'green', paddingTop: 50, paddingBottom: 50}}>
      <StyledText textStyle='h21MedWhiteT2NLS' upperCase>
        {textMessage('content styled text')}
      </StyledText>
    </View>
  ))
  .add('h21MedWhiteT2NLS', () => (
    <View style={{backgroundColor: 'green', paddingTop: 50, paddingBottom: 50}}>
      <StyledText textStyle='h21MedWhiteT2NLS'>
        {textMessage('content styled text')}
      </StyledText>
    </View>
  ))
