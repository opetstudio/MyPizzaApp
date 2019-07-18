import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
// import { AsyncStorage } from 'react-native'
import storage from 'redux-persist/lib/storage' // or whatever storage you are using

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '156',
  storeConfig: {
    key: 'primary',
    storage,
    // storage: AsyncStorage,
    // Reducer keys that you do NOT want stored t persistence here.
    blacklist: ['login', 'search', 'nav', 'popup'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    // whitelist: [],
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
