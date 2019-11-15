import React, { Component } from "react";
import { StyleProvider } from "native-base";

import getTheme from '../native-base-theme/components';
import variables from "../native-base-theme/variables/commonColor";
// import variables from "../native-base-theme/variables/material";

import App from "../Containers/App";
// import getTheme from "../Themes/components";
// import variables from "../Themes/variables/commonColor";

export default class Setup extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <App />
      </StyleProvider>
    );
  }
}
