import { handler } from './netlify/functions/api.js';

const event = {
  httpMethod: 'GET',
  path: '/.netlify/functions/api/health',
  headers: {},
  queryStringParameters: {},
  body: null
};

const context = {};

handler(event, context)
  .then(res => console.log('Response:', res))
  .catch(err => console.error('Error:', err));
