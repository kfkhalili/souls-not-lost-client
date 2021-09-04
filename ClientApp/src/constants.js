//env => PROD || STAGING
export const STAGING = 'STAGING'
export const PROD = 'PROD'
export const env = STAGING
export const IS_STAGING = env === STAGING

export const enableFCM = false

export const API =  env === 'PROD' ?  'https://webapi.ocost.co/api' :  "http://localhost:5001/";
