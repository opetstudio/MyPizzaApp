import { Platform } from 'react-native';
import Config from 'react-native-config';

import localconfig from '../localconfig';

const firebase_config = require('./db');

const firebase_config_prod = firebase_config;

const environment = Config.environment || 'production';

export const conf = {
  docker_ios: {},
  docker_android: {},
  development_ios: {},
  development_android: {},
  development_device_android: {},
  production: {},
  staging: {}
};

const myip = localconfig.myip || Config.myip;
const localhost = {
  ios: myip,
  android: '10.0.2.2'
};
const host_prod = 'api.rayaku.id'; // rayaku-production
// const ip_production = '51.15.193.104'; // rayaku-production
const host_staging = '45.77.249.229'; // rayaku-testbed
const host_coins_prod = '207.148.73.106'; // ip API for rayacoins
const protocol_dev = 'http://';
const protocol_prod = 'https://';

const getPrefix = (prefix, namespace) => {
  if (prefix === '') return '';
  if (!prefix) return `/${namespace}`;
  return `/${prefix}`;
};

const list_services = [
  { namespace: 'rayaku-celery-rabbitmq-contacts-py', port: 3004 },
  { namespace: 'rayaku-celery-rabbitmq-login-py', port: 3005 },
  { namespace: 'rayaku-fcm-js', port: 3001 },
  {
    namespace: 'rayaku-file-js',
    port: 3002,
    // host: localhost.android,
  },
  {
    namespace: 'rayaku-nginx-upload-progress',
    port: 3002,
    // host: localhost.android,
  },
  {
    namespace: 'rayaku-file-py',
    port: 8180,
    // host_prod: '51.15.193.104:8180',
    // protocol_prod: 'http://',
    // prefix: ''
    // host: localhost.android,
  },
  {
    namespace: 'rayaku-coins-referal', port: 5000, host_prod: host_coins_prod
  },
  {
    namespace: 'rayaku-graphql',
    port: 3000,
    // host: '10.0.2.2',
    // host: localhost.ios,
  }
];
list_services.forEach((v) => {
  conf.docker_ios[v.namespace] = { host: `${protocol_dev + localhost.ios}:${v.port}` };
  conf.docker_android[v.namespace] = { host: `${protocol_dev + localhost.android}:${v.port}` };
  conf.development_ios[v.namespace] = { host: `${protocol_dev + localhost.ios}:${v.port}` };
  conf.development_android[v.namespace] = { host: `${protocol_dev + localhost.android}:${v.port}` };
  conf.development_device_android[v.namespace] = { host: `${protocol_dev + myip}:${v.port}` };
  conf.staging[v.namespace] = { host: `${protocol_dev + (v.host || host_staging)}:${v.port}` };
  conf.production[v.namespace] = {
    host: `${(v.protocol_prod || protocol_prod) + (v.host_prod || host_prod) + getPrefix(v.prefix, v.namespace)}`
  };
});

console.log('conf===>', conf);

// conf.docker_ios = {
//   'rayaku-celery-rabbitmq-contacts-py': { host: `${protocol_dev + localhost.ios}:3004` },
//   'rayaku-celery-rabbitmq-login-py': { host: `${protocol_dev + localhost.ios}:3005` },
//   'rayaku-fcm-js': { host: `${protocol_dev + localhost.ios}:3001` },
//   'rayaku-file-js': { host: `${protocol_dev + localhost.ios}:3002` },
//   'rayaku-graphql': { host: `${protocol_dev + localhost.ios}:3000` },
// }; // for ios
// conf.docker_android = {
//   'rayaku-celery-rabbitmq-contacts-py': { host: `${protocol_dev + localhost.android}:3004` },
//   'rayaku-celery-rabbitmq-login-py': { host: `${protocol_dev + localhost.android}:3005` },
//   'rayaku-fcm-js': { host: `${protocol_dev + localhost.android}:3001` },
//   'rayaku-file-js': { host: `${protocol_dev + localhost.android}:3002` },
//   'rayaku-graphql': { host: `${protocol_dev + localhost.android}:3000` },
// };
// conf.development_ios = {
//   'rayaku-celery-rabbitmq-contacts-py': { host: `${protocol_dev + localhost.ios}:8087` },
//   'rayaku-celery-rabbitmq-login-py': { host: `${protocol_dev + localhost.ios}:8086` },
//   'rayaku-fcm-js': { host: `${protocol_dev + localhost.ios}:8088` },
//   'rayaku-file-js': { host: `${protocol_dev + localhost.ios}:8089` },
//   'rayaku-graphql': { host: `${protocol_dev + localhost.ios}:8090` },
// }; // for ios
// conf.development_android = {
//   'rayaku-celery-rabbitmq-contacts-py': { host: `${protocol_dev + localhost.android}:8087` },
//   'rayaku-celery-rabbitmq-login-py': { host: `${protocol_dev + localhost.android}:8086` },
//   'rayaku-fcm-js': { host: `${protocol_dev + localhost.android}:8088` },
//   'rayaku-file-js': { host: `${protocol_dev + localhost.android}:8089` },
//   'rayaku-graphql': { host: `${protocol_dev + localhost.android}:8090` },
// }; // for android
// conf.development_device_android = {
//   'rayaku-celery-rabbitmq-contacts-py': { host: '192.168.22.212:8087' },
//   'rayaku-celery-rabbitmq-login-py': { host: '192.168.22.212:8086' },
//   'rayaku-fcm-js': { host: '192.168.22.212:8088' },
//   'rayaku-file-js': { host: '192.168.22.212:8089' },
//   'rayaku-graphql': { host: '192.168.22.212:8090' },
// }; // for android device
// conf.production = {
//   'rayaku-celery-rabbitmq-contacts-py': { host: `${protocol_prod + ip_production}/rayaku-celery-rabbitmq-contacts-py` },
//   'rayaku-celery-rabbitmq-login-py': { host: `${protocol_prod + ip_production}/rayaku-celery-rabbitmq-login-py` },
//   'rayaku-fcm-js': { host: `${protocol_prod + ip_production}/rayaku-fcm-js` },
//   'rayaku-file-js': { host: `${protocol_prod + ip_production}/rayaku-file-js` },
//   'rayaku-graphql': { host: `${protocol_prod + ip_production}/rayaku-graphql` },
//   'rayaku-coins-referal': { host: `${protocol_prod + ip_api}:5000` }, // rayaku-coins-referal production
// }; // mesin crawler rayasem

// // for pre production
// conf.productionxxx = {
//   'rayaku-celery-rabbitmq-contacts-py': { host: `${protocol_dev + ip_staging}:8081` },
//   'rayaku-celery-rabbitmq-login-py': { host: `${protocol_dev + ip_staging}:8082` },
//   'rayaku-fcm-js': { host: `${protocol_dev + ip_staging}:8083` },
//   'rayaku-file-js': { host: `${protocol_dev + ip_staging}:8084` },
//   'rayaku-graphql': { host: `${protocol_dev + ip_staging}:8085` },
// }; // mesin nodejs testbed

// conf.staging = {
//   'rayaku-celery-rabbitmq-contacts-py': { host: `${protocol_dev + ip_staging}:3004` },
//   'rayaku-celery-rabbitmq-login-py': { host: `${protocol_dev + ip_staging}:3005` },
//   'rayaku-fcm-js': { host: `${protocol_dev + ip_staging}:3001` },
//   'rayaku-file-js': { host: `${protocol_dev + ip_staging}:3002` },
//   'rayaku-graphql': { host: `${protocol_dev + ip_staging}:3000` },
// }; // mesin nodejs testbed
// conf.staging = {
//   'rayaku-celery-rabbitmq-contacts-py': { host: `${protocol_dev + ip_staging}:8183` },
//   'rayaku-celery-rabbitmq-login-py': { host: `${protocol_dev + ip_staging}:8181` },
//   'rayaku-fcm-js': { host: `${protocol_dev + ip_staging}:8184` },
//   'rayaku-file-js': { host: `${protocol_dev + ip_staging}:8185` },
//   'rayaku-graphql': { host: `${protocol_dev + ip_staging}:8186` },
// }; // mesin nodejs testbed

export const firebase_account = {
  prod: firebase_config_prod,
  dev: firebase_config,
};
export const getFirebaseConf = () => {
  if (environment === 'production') return firebase_account.prod;
  return firebase_account.dev;
};
export const getConf = (apiName) => {
  // console.log('getConf ', environment);

  if (environment === 'development'
  || environment === 'docker' || environment === 'development_device') {
    console.log('getConfxx ', environment);
    // console.log('getConfxx ', apiName);
    // console.log('getConfxx ', Platform.OS);
    return {
      host: conf[`${environment}_${Platform.OS}`][apiName].host
    };
  }
  console.log('getConfyy ', environment);
  console.log('getConfxx ', apiName);

  return {
    host: conf[`${environment}`][apiName].host
  };
};
export const proxyName = environment === 'development' ? '' : 'nginx';
