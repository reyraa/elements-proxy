import { Promise } from 'es6-promise';
import Lisk from 'lisk-js'

const testNet = {
  name: 'Testnet',
  testnet: true,
  ssl: false,
  node: '',
  randomPeer: true,
  port: '7000',
  // port: 443,
  bannedPeers: [],
};

const activePeer = Lisk.api(testNet);

export default ({ endpoint, data }) =>
  new Promise((resolve, reject) => {
    console.log(endpoint);
    if (endpoint === 'getAccount') {
      activePeer.getAccount(data.address, (data) => {
        if (data.success) {
          resolve(data.account);
        } else if (!data.success && data.error === 'Account not found') {
          resolve({
            address: data.address,
            balance: 0,
          });
        } else {
          reject(data);
        }
      });
    } else {
      activePeer.sendRequest(`${endpoint.replace(/^\/|\/$/, '')}/`, data, (res) => {
        if (res.success) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    }
  });
