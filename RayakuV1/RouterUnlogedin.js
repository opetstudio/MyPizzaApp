import {
  StackNavigator,
} from 'react-navigation';

import OverviewSlideShow from './components/OverviewSlideShow';
import LoginScreen from './screens/LoginScreen';
import SignupOverviewScreen from './screens/SignupOverviewScreen';
import Terms from './components/WebViewTerms';
import PrivacyPolicy from './components/WebViewPrivacy';

const RouterUnlogedin = StackNavigator({
  Home: { screen: OverviewSlideShow },
  Profile: { screen: LoginScreen },
  SignupOverview: { screen: SignupOverviewScreen },
  Terms: { screen: Terms },
  PrivacyPolicy: { screen: PrivacyPolicy },
}, {
  headerMode: 'none'
});

export default RouterUnlogedin;
