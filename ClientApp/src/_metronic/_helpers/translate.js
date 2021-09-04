import en from  '../i18n/messages/en.json'
import ar from  '../i18n/messages/ar.json'

export const a  = 'test'

const i18nConf = JSON.parse(localStorage.getItem("i18nConfig"));
export const translate = (id)=>{
    const lang =  i18nConf?.selectedLang || "en";
    const isAr = lang === 'ar'
    const srcLang = isAr ? ar : en

    let value = id
    try {
        value = srcLang?.[id]
    } catch (error) {
        return value
    }
    return value

}
