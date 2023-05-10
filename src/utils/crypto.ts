import { Buffer } from 'buffer';

import CryptoES from 'crypto-es';

const initVectorSizeBytes = 16;
const defaultKey = '1234567891234567';
export const encrypt = async (plainText: any, key = defaultKey) => {
  const secretKey = CryptoES.lib.WordArray.create(Buffer.from(key, 'utf-8'));
  const initVector = CryptoES.lib.WordArray.random(initVectorSizeBytes);

  const cipherText = CryptoES.AES.encrypt(plainText, secretKey, {
    mode: CryptoES.mode.CBC,
    padding: CryptoES.pad.Pkcs7,
    iv: initVector,
  });
  const dataArray = [
    Buffer.from(initVector.toString(CryptoES.enc.Base64), 'base64'),
    Buffer.from(cipherText.toString(CryptoES.format.Hex), 'hex'),
  ];
  const dataBuffer = Buffer.concat(dataArray);
  return dataBuffer.toString('base64');
};
export const decrypt = (data: string, key = defaultKey) => {
  const dataBuffer = Buffer.from(data, 'base64');
  const dataArray = Array.prototype.slice.call(dataBuffer);
  const initVector = Buffer.from(dataArray.slice(0, initVectorSizeBytes));

  const cipherText = Buffer.from(dataArray.slice(initVectorSizeBytes, dataArray.length));

  const secretKey = CryptoES.lib.WordArray.create(Buffer.from(key, 'utf-8'));

  const bytes = CryptoES.AES.decrypt(cipherText.toString('base64'), secretKey, {
    mode: CryptoES.mode.CBC,
    padding: CryptoES.pad.Pkcs7,
    iv: CryptoES.lib.WordArray.create(initVector),
  });
  const originalText = bytes.toString(CryptoES.enc.Utf8);

  return JSON.parse(originalText);
};
