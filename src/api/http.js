import { Promise } from 'es6-promise';
import Lisk from 'lisk-js'

const testNet = {
  name: 'Testnet',
  testnet: true,
  ssl: true,
  port: 443,
  code: 1,
};

const activePeer = Lisk.api(testNet);

export default ({ endpoint, data }) =>
  new Promise((resolve, reject) => {
    activePeer.sendRequest(`${endpoint.replace(/^\/|\/$/, '')}/`, data, (res) => {
      if (res.success) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
