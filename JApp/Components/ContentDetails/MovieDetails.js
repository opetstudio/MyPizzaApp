import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import StyledView from '../StyledView'
import StyledText from '../StyledText'
import { inMinutes } from '../../Utils/helper/dateHelper'

import CollapsibleDescription from './CollapsibleDescription'
// import ActionButton from './ActionButton'
// import LanguageInfo from './LanguageInfo'
// import CrewDetails from './CrewDetails'

import { styles } from './styles'

const propTypes = {
  content: PropTypes.object,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  genres: PropTypes.any,
  goToPackages: PropTypes.func,
  isLanguageSection: PropTypes.bool,
  isMetaDataSnippet: PropTypes.bool,
  likeContent: PropTypes.func,
  likedStatus: PropTypes.bool,
  loading: PropTypes.bool,
  locale: PropTypes.string,
  loggedInStatus: PropTypes.bool,
  loginAutomatically: PropTypes.func,
  myPackagesList: PropTypes.array,
  navigation: PropTypes.object,
  providerName: PropTypes.string,
  showCatst: PropTypes.bool,
  showPopup: PropTypes.func,
  subscriptions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  userProfile: PropTypes.object,
  wcmsBaseUrl: PropTypes.string
}

class MovieDetails extends PureComponent {
  render () {
    const {
      content: { language, subtitleLanguage, cast, directors, rating, year },
      content,
      goToPackages,
      isLanguageSection,
      isMetaDataSnippet,
      locale,
      loggedInStatus,
      navigation,
      providerName,
      subscriptions,
      myPackagesList,
      userProfile,
      loginAutomatically
    } = this.props

    const providerNameLowerCase = providerName.toLowerCase()
    const isDetialsSection =
      isMetaDataSnippet || content.descriptionEn || isLanguageSection
    const metaDataSnippet = isMetaDataSnippet ? (
      <View style={styles.snippet}>
        {year ? <StyledText textStyle='h12LtGreyS'>{year}</StyledText> : null}
        {rating && year ? (
          <StyledText addedStyle={styles.gapBetweenLine} textStyle='h12LtGreyS'>
            |
          </StyledText>
        ) : null}
        {rating ? (
          <StyledText textStyle='h12LtGreyS'>{rating}</StyledText>
        ) : null}
        {(content.runTime && rating) || (content.runTime && year && !rating) ? (
          <StyledText addedStyle={styles.gapBetweenLine} textStyle='h12LtGreyS'>
            |
          </StyledText>
        ) : null}
        {content.runTime ? (
          <StyledText textStyle='h12LtGreyS'>
            {inMinutes(content.runTime)}
          </StyledText>
        ) : null}
      </View>
    ) : null
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.headerView}>
            <View style={styles.titlePlusCpLogo}>
              <StyledText addedStyle={styles.titleText} textStyle='h2TnWhiteP'>
                {content.title}
              </StyledText>
              {/* <StyledText
                addedStyle={styles.spacingProvider}
                i18nKey={`content-details-${providerNameLowerCase}`}
              /> */}
            </View>
            {/* <ActionButton
              content={this.props.content}
              isLoggedIn={loggedInStatus}
              navigation={navigation}
              providerName={providerName}
              subscriptions={subscriptions}
              goToPackages={goToPackages}
              myPackagesList={myPackagesList}
              userProfile={userProfile}
              loginAutomatically={loginAutomatically}
            /> */}
          </View>

          {/* {isDetialsSection ? (
            <View style={styles.footerView}>
              <View style={styles.gapDetails} />
              <StyledText
                addedStyle={styles.detailText}
                textStyle='h4MedWhiteP'
                i18nKey='content-details'
                isUnderline
              />
              {metaDataSnippet}
            </View>
          ) : null} */}
          <View style={styles.gapFill} />
          <CollapsibleDescription
            locale={locale}
            content={this.props.content}
          />
          {isLanguageSection ? (
            <StyledView style={styles.details}>
              {/* <LanguageInfo
                language={language}
                subtitleLanguage={subtitleLanguage}
              /> */}
              {/* <CrewDetails i18nKey='content-cast' content={cast} />
              <CrewDetails i18nKey='content-director' content={directors} />
              <CrewDetails
                i18nKey='content-genres'
                content={content.genre_labels}
              /> */}
            </StyledView>
          ) : null}
        </View>
      </View>
    )
  }
}

MovieDetails.propTypes = propTypes
export default MovieDetails
