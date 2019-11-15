import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native'
import AppConfig from './AppConfig'
import {setSession, getSession} from '../Lib/Utils'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '15',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    // Reducer keys that you do NOT want stored to persistence here.
    blacklist: ['login', 'search', 'nav'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    // whitelist: [],
    transforms: [immutablePersistenceTransform]
  }
}

function getCurrentReducerVersion () {
  return new Promise((resolve) => {
    const currentReducerVersion = getSession('currentReducerVersion')
    // const socket = new WebSocket("ws://localhost:1555");
    resolve(currentReducerVersion)
  })
}
const nextReducerVersion = REDUX_PERSIST.reducerVersion
async function checkVersion () {
  const currentReducerVersion = await getCurrentReducerVersion()
  console.log('currentReducerVersionSession===>', currentReducerVersion)
  console.log('nextReducerVersion===>', nextReducerVersion)
  if (currentReducerVersion !== nextReducerVersion) {
    setSession({currentReducerVersion: nextReducerVersion, [AppConfig.loginFlag]: false})
  }
}
checkVersion()
// console.log('currVersion===>', currVersion)
// console.log('nextReducerVersion===>', nextReducerVersion)
// if (currVersion !== nextReducerVersion) {
//   setSession({currentReducerVersion: nextReducerVersion, [AppConfig.loginFlag]: false})
// }

export default REDUX_PERSIST
