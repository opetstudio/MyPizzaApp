/* @flow */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';


class UserGroupMessageLoader extends React.Component {
    componentWillMount() {
        console.log('[MessageGroupLoaderContainer.UserGroupMessageLoader] componentWillMount. ', this.props);
    }
    componentWillReceiveProps(nextProps) {
        console.log('[MessageGroupLoaderContainer.UserGroupMessageLoader] componentWillReceiveProps. ', nextProps);
    }
    render() {
        console.log('[MessageGroupLoaderContainer.UserGroupMessageLoader] render. ', this.props);
        return null;
    }
}

const query1 = gql`query CurrentMessageGroupForUser($user_id: String!, $group_id: String!) {
    user_group_message(group_id:$group_id, user_id:$user_id){
        id
        message
        sender
        receiver
        createdTimeOnDevice
        modifiedon
        status
        type }}`;
const Loader1 = connect((state, ownProps) => {
    return {};
}, (dispatch) => {
    return bindActionCreators({}, dispatch);
})(graphql(query1, {
    options: ({
        user_id,
        group_id
    }) => ({
        pollInterval: 0,
        variables: {
            user_id,
            group_id
        }
    }),
    props: ({
        ownProps,
        data
    }) => {
        // console.log('[GroupsContainer] mapDataToProps data=', data);
        // ownProps = props dari mapStateToProps (redux)
        // lastMessageTime
        return {
            user_group_message: _.orderBy(data.user_group_message || [], ['modifiedon'], ['desc']),
            stopPolling: data.stopPolling,
            startPolling: data.startPolling,
            loading: data.loading
        };
    }
})(UserGroupMessageLoader));

const query2 = gql`query CurrentGroupForUser($user_id: String!) {
    user_group(user_id:$user_id) {
      id
      name
      picture
      status
      createdon
      lastMessage
      lastMessageTime
      modifiedon }}`


class MessageGroupLoaderContainer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentWillMount() {
            console.log('[MessageGroupLoaderContainer] componentWillMount. ', this.props);
            this.state.user_group = this.props.user_group;

            graphql(query2, {
                options: {
                    variables: {
                        user_id: '6285342805673'
                    }
                },
                props: ({
                    ownProps,
                    data
                }) => {
                    // console.log('[GroupsContainer] mapDataToProps data=', data);
                    // ownProps = props dari mapStateToProps (redux)
                    // lastMessageTime
                    return {
                        user_group: _.orderBy(data.user_group || [], ['lastMessageTime'], ['desc']),
                        stopPolling: data.stopPolling,
                        startPolling: data.startPolling,
                        loading: data.loading
                    };
                }
            })();
        }

        componentWillReceiveProps(nextProps) {
            console.log('[MessageGroupLoaderContainer] componentWillReceiveProps. ', nextProps);
            this.setState({
                user_group: nextProps.user_group
            });
        }
        render() {
                if (!this.state.user_group || this.state.user_group.length === 0) return null;

                console.log('[MessageGroupLoaderContainer] render. ', this.props);
                const loader = [];
                this.state.user_group.forEach((group) => {
                        loader.push( < Loader1 user_id = {
                                this.props.user_id
                            }
                            group_id = {
                                group.id
                            }
                            />);
                        });
                    return (<View> { loader } </View>);
                    }
                }


const graph1 = graphql(query2, {
    options: ({
        user_id
    }) => ({
        pollInterval: 0,
        variables: {
            user_id
        }
    }),
    props: ({
        ownProps,
        data
    }) => {
        // console.log('[GroupsContainer] mapDataToProps data=', data);
        // ownProps = props dari mapStateToProps (redux)
        // lastMessageTime
        return {
            user_group: _.orderBy(data.user_group || [], ['lastMessageTime'], ['desc']),
            stopPolling: data.stopPolling,
            startPolling: data.startPolling,
            loading: data.loading
        };
    }
})(MessageGroupLoaderContainer);
const Loader2 = connect((state, ownProps) => {
    // console.log('[MessageGroupLoaderContainer] mapStateToProps ownProps=', ownProps);
    // console.log('[MessageGroupLoaderContainer] mapStateToProps state=', state);
    return {};
}, (dispatch) => {
    return bindActionCreators({}, dispatch);
})(MessageGroupLoaderContainer);

export default Loader2;