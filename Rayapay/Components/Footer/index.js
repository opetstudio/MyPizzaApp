import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text, Tab, Tabs, TabHeading, Icon} from 'native-base'

export default class FooterMenu extends Component{
    constructor(props) {
    super(props);
     this.state = {
         tab1: true,
        tab2: false,
        };
    }
    toggleTab1() {
        this.setState({
        tab1: true,
        tab2: false,
        });
    }
    toggleTab2() {
        this.setState({
        tab1: false,
        tab2: true,
        });
    }
    render(){
        return(

            <Footer>
                {/*<Tabs tabBarUnderlineStyle={{ backgroundColor: '#00CBFF', width: 100, marginHorizontal: 37}}>
                    <Tab heading="Beranda" tabStyle={{backgroundColor: 'white', border: 0}} textStyle={{color: '#505050'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color: '#00CBFF', fontWeight: 'normal'}}>
                    </Tab>
                    <Tab heading="Bill Payment" tabStyle={{backgroundColor: 'white', border: 0}} textStyle={{color: '#505050'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color: '#00CBFF', fontWeight: 'normal'}}>
                    </Tab>
                </Tabs> */}
                <FooterTab>
                    <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
                        <Text>Beranda</Text>
                    </Button>
                    <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
                        <Text>Bill Payment</Text>
                    </Button>
                </FooterTab>
            </Footer>

        )
    }
} 