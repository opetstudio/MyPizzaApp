import React from 'react'
import PropTypes from 'prop-types'
import RNFetchBlob from 'rn-fetch-blob'
import {StyleSheet, Dimensions, View, Platform, Text} from 'react-native'
import {styles} from './styles'

import Pdf from 'react-native-pdf'

class RNPDFViewer extends React.Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    textSearch: PropTypes.string,
    playbackUrl: PropTypes.string,
    currentPath: PropTypes.string,
    page: PropTypes.number.isRequired,
    screenWidth: PropTypes.number.isRequired,
    screenHeight: PropTypes.number.isRequired
  }
    // // Defaults for props
  static defaultProps = {
    page: 1
  }
  constructor (props) {
    super(props)
    this.state = {
      page: this.props.page,
      textSearch: '',
      playbackUrl: this.props.playbackUrl,
      currentPath: this.props.currentPath,
      loadFromServer: false,
      isCache: false,
      source: this.props.currentPath,
      bookId: this.props.bookId
    }
    this._downloadPDF = this._downloadPDF.bind(this)
    this._movePDF = this._movePDF.bind(this)
    __DEV__ && console.log('RNPDFViewer.constructor', this.props)
  }
  componentWillReceiveProps (nextProps) {
    __DEV__ && console.log('RNPDFViewer.componentWillReceiveProps', nextProps)
    this.setState({
      textSearch: nextProps.textSearch,
      playbackUrl: nextProps.playbackUrl,
      currentPath: nextProps.currentPath
    })
  }
  _downloadPDF (currPath, callback) {
    let dirs = RNFetchBlob.fs.dirs
    let storage = dirs.DCIMDir + '/jemaatApp/'
    __DEV__ && console.log('RNPDFViewer.downloadPDF storage ', storage)
    __DEV__ && console.log('RNPDFViewer.downloadPDF currPath ', currPath)
    RNFetchBlob
        .config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
        //   fileCache: true,
          path: storage + this.state.bookId + '.pdf'
        //   path: dirs.DocumentDir + '/' + this.state.bookId + '.pdf'
        })
        .fetch('GET', 'file://' + currPath, {
            // some headers ..
        })
        .then((res) => {
            // the temp file path
          __DEV__ && console.log('RNPDFViewer.downloadPDF success The file saved to ', res.path())
          callback(res.path())
        })
        .catch(e => {
          __DEV__ && console.log('RNPDFViewer.downloadPDF error ', e)
        })
  }
  _movePDF (currPath, callback) {
    let dirs = RNFetchBlob.fs.dirs
    __DEV__ && console.log(dirs.DocumentDir)
    __DEV__ && console.log(dirs.CacheDir)
    __DEV__ && console.log(dirs.DCIMDir)
    __DEV__ && console.log(dirs.DownloadDir)
    __DEV__ && console.log(dirs.SDCardDir)
    __DEV__ && console.log(dirs.MusicDir)
    let storage = dirs.DocumentDir + '/jemaatApp'
    // let storage = dirs.DCIMDir + '/jemaatApp'
    __DEV__ && console.log('RNPDFViewer._movePDF storage ', storage)
    __DEV__ && console.log('RNPDFViewer._movePDF currPath ', currPath)
    const FROM_PATH = currPath
    const TO_PATH = storage + '/' + this.state.bookId + '.pdf'

    // RNFetchBlob.fs.exists(currPath)
    // .then((exist) => {
    //   __DEV__ && console.log(`file===> ${exist ? '' : 'not'} exists`, currPath)
    // //   RNFetchBlob.fs.mkdir(storage)
    // //     .then(() => {
    //       RNFetchBlob.fs.cp(FROM_PATH, TO_PATH)
    //         .then((res) => {
    //           __DEV__ && console.log('RNPDFViewer._movePDF res ', res)
    //           callback(TO_PATH)
    //         })
    //         .catch((e) => {
    //           __DEV__ && console.log('RNPDFViewer._movePDF error ', e)
    //         })
    //     // })
    //     // .catch((e) => {
    //     //   __DEV__ && console.log('RNPDFViewer._movePDF error mkdir ', e)
    //     // })
    // })
    // .catch((err) => {
    //   __DEV__ && console.log('RNPDFViewer._movePDF error mkdir ', err)
    // })

    // RNFetchBlob
    //     .config({
    //         // add this option that makes response data to be stored as a file,
    //         // this is much more performant.
    //     //   fileCache: true,
    //       path: storage + this.state.bookId + '.pdf'
    //     //   path: dirs.DocumentDir + '/' + this.state.bookId + '.pdf'
    //     })
    //     .fetch('GET', 'file://' + currPath, {
    //         // some headers ..
    //     })
    //     .then((res) => {
    //         // the temp file path
    //       __DEV__ && console.log('RNPDFViewer.downloadPDF success The file saved to ', res.path())
    //       callback(res.path())
    //     })
    //     .catch(e => {
    //       __DEV__ && console.log('RNPDFViewer.downloadPDF error ', e)
    //     })
  }
  render () {
    __DEV__ && console.log('RNPDFViewer.render: ', this.props)
    // const textSearch = this.props.textSearch
    const page = parseInt(this.state.textSearch || this.state.page)
    const playbackUrl = this.state.playbackUrl
    // const source = {uri: 'file:///sdcard/test.pdf'}
    // const source = {uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true}
    return (
      // <VideoPlayer
      //   source={{ uri: this.props.playbackUrl }}
      //   // source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
      //   onBack={() => this.props.navigation.goBack()}
      //   subtitle={this.props.subtitle}
      //   // navigator={this.props.navigator}
      //   />

      <View style={[styles.container, {width: this.props.screenWidth, height: this.props.screenHeight}]}>
        <Pdf
          source={{uri: this.state.source, cache: this.state.isCache}}
        //   source={{ uri: this.props.playbackUrl, cache: true }}
          onLoadComplete={(numberOfPages, filePath) => {
            __DEV__ && console.log(`number of pages: ${numberOfPages}`)
            __DEV__ && console.log(`number of pages: ${filePath}`)
            if (this.state.loadFromServer) {
                // cp from cache to drive
            //   this._movePDF(filePath, (newPath) => {
              this.state.source = filePath
              this.state.currentPath = filePath
              this.state.loadFromServer = false
              this.props.bookSetCurrentPath(this.props.bookId, filePath)
            //   })
            }
          }}
          onPageChanged={(page, numberOfPages) => {
            __DEV__ && console.log(`current page: ${page}`)
            this.props.bookSetCurrentPage(this.props.bookId, page)
          }}
          onError={(error) => {
            __DEV__ && console.log('error===>', error.message)
            if (error.message === 'No such file or directory' || error.message === 'no pdf source!') {
              __DEV__ && console.log('setState===>>>', this.props)
              __DEV__ && console.log('setState===>>>playbackUrl', playbackUrl)
                // download from server
            //   this._downloadPDF((newPath) => {
            //     __DEV__ && console.log('success download newpath', newPath)
              this.setState({
                source: playbackUrl,
                isCache: true,
                loadFromServer: true
              })
            //     this.state.source = newPath
            //     this.state.currentPath = newPath
            //     this.state.loadFromServer = false
            //     this.props.bookSetCurrentPath(this.props.bookId, newPath)
            //   })
            }
          }}
          page={page || 1}
          style={[{position: 'absolute', backgroundColor: '#000'}, {width: this.props.screenWidth, height: this.props.screenHeight}]} />
      </View>
    )
  }
}

export default RNPDFViewer
