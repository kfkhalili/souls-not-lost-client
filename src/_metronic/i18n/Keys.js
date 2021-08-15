import enMessages from "./messages/en";
import result from  "./messages/en.json"

let keys = {
    ...result}
Object.keys(enMessages).forEach((key)=>{
    keys[key] = key
})
export const I18EN = keys;

