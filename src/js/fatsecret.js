// I've take this code here https://gist.github.com/RandyLedbetter/e531e948a1c2dc318899643e413a4b54
import hmacsha1 from 'hmacsha1';
import { stringify } from 'query-string';

export default function fatsecret() {
  const API_PATH = 'https://platform.fatsecret.com/rest/server.api';
  const ACCESS_KEY = 'YOUR_ACCESS_KEY';
  const APP_SECRET = 'YOUR_APP_SECRET';
  const OAUTH_VERSION = '1.0';
  const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

  function getOauthParameters() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    return {
      oauth_consumer_key: ACCESS_KEY,
      oauth_nonce: `${timestamp}${Math.floor(Math.random() * 1000)}`,
      oauth_signature_method: OAUTH_SIGNATURE_METHOD,
      oauth_timestamp: timestamp,
      oauth_version: OAUTH_VERSION,
    };
  }

  function getSignature(queryParams, httpMethod = 'GET') {
    const signatureBaseString = [
      httpMethod,
      encodeURIComponent(API_PATH),
      encodeURIComponent(stringify(queryParams)),
    ].join('&');
    const signatureKey = `${APP_SECRET}&`;
    return hmacsha1(signatureKey, signatureBaseString);
  }

  function makeApiCall(methodParams, httpMethod = 'GET') {
    const queryParams = {
      ...getOauthParameters(),
      ...methodParams,
      format: 'json',
    };
    queryParams['oauth_signature'] = getSignature(queryParams, httpMethod);
    return fetch(`${API_PATH}?${stringify(queryParams)}`, { method: httpMethod });
  }

  this.searchFood = async (query, maxResults = 8) => {
    const methodParams = {
      method: 'foods.search',
      max_results: maxResults,
      search_expression: query,
    };
    const response = await makeApiCall(methodParams);
    return response.json();
  }

  this.getFood = async (foodId) => {
    const methodParams = {
      method: 'food.get',
      food_id: foodId,
    };
    const response = await makeApiCall(methodParams);
    return response.json();
  }
}