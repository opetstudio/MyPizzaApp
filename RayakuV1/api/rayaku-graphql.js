import {
    Platform
} from 'react-native';
import client from '../apolloClient';
import { adsQuery } from '../actions/GraphqlAction';

export const fetchGroup = () =>
    new Promise((resolve, reject) => {
        client.query({
            query: adsQuery,
            variables: {
                first: 2
            },
            operationName: 'fetchGroup',
            errorPolicy: 'all'
        }).then((resp) => {
            console.log('[rayaku-graphql] resp: ', resp);
            // if (resp.data) {
            // 	dispatch({ type: 'FETCH_ADS_FULFILLED', payload: resp.data.allAds });
            // }
            resolve(true);
        }).catch((e) => {
            console.log('[rayaku-graphql] e: ', e);
            // reject(e);
        });

    });