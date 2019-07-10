import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text, Tab, Tabs, TabHeading} from 'native-base'

export default class FooterMenu extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(

            <Footer>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#00CBFF'}}>
                    <Tab heading="Tab 1" tabStyle={{backgroundColor: 'white'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color: '#00CBFF', fontWeight: 'normal'}}>
                        <Text>tab 1</Text>
                    </Tab>
                    <Tab heading="Tab 2" tabStyle={{backgroundColor: 'white'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color: '#00CBFF', fontWeight: 'normal'}}>
                        <Text>tab 2</Text>
                    </Tab>
                </Tabs>
            </Footer>

        )
    }
} 