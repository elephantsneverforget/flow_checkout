const getUrl = require('getUrl');
const getReferrerUrl = require('getReferrerUrl');
const createQueue = require('createQueue');
const setCookie = require('setCookie');
const queryPermission = require('queryPermission');
const log = require('logToConsole');

let fail = false;

if (data.storeInCookieOption) {
  // Check if URL has any of the params listed
  const paramsToFind = data.triggerParameters.split(',');
  const queryString = getUrl('query');
  const queryParams = queryString.length ? queryString.split('&') : [];
  if (queryParams.filter(pair => paramsToFind.indexOf(pair.split('=')[0]) > -1).length) {
    if (queryPermission('set_cookies', data.urlCookieName)) {
      setCookie(data.urlCookieName, getUrl(), {
        domain: 'auto',
        path: '/'
      });
    } else {
      log('Invalid permissions for writing ' + data.urlCookieName + ' cookie!');
      fail = true;
    }
  }
  
  // Check if referrer host does not contain current hostname
  const referrerHost = getReferrerUrl('host');
  if (referrerHost.indexOf(getUrl('host')) === -1 && referrerHost !== '') {
    if (queryPermission('set_cookies', data.referrerCookieName)) {
      setCookie(data.referrerCookieName, getReferrerUrl(), {
        domain: 'auto',
        path: '/'
      });
    } else {
      log('Invalid permissions for writing ' + data.referrerCookieName + ' cookie!');
      fail = true;
    }
  }
}

if (data.originalLocationOption) {
  // Push the current URL into dataLayer with the given key
  if (queryPermission('access_globals', 'readwrite', data.dataLayerName)) {
    const dataLayerPush = createQueue(data.dataLayerName);
    const obj = {event: 'originalLocation'};
    obj[data.dataLayerKey] = getUrl();
    dataLayerPush(obj);
  } else {
    log('Invalid permissions for creating ' + data.dataLayerName + ' queue!');
    fail = true;
  }
}

if (fail) { data.gtmOnFailure(); } else { data.gtmOnSuccess(); }