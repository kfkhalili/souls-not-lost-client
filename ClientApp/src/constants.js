//env => PROD || STAGING
export const STAGING = 'STAGING'
export const PROD = 'PROD'
export const env = PROD
export const IS_STAGING = env === STAGING

export const enableFCM = false

export const API =  env === 'PROD' ?  'https://www.soulsnotlost.com/' :  "https://localhost:5001/";
