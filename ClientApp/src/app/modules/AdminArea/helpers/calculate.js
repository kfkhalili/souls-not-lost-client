import * as _ from "lodash"

export const getAggregatorAmount = ({quantity, amount, vat}) => {
    if (_.isNumber(quantity) && _.isNumber(amount) && _.isNumber(vat))
        return quantity *(amount + vat)
    return "invalid inputs"
}
export const getAggregatorsCal = (aggregators = [], key) => {
    let result = 0;
    if(aggregators.length === 1)
        return  aggregators[0][key]
    if(aggregators.length > 1)
    result = aggregators.reduce((total, current)=>(total + current[key]),0);

    if (_.isNumber(result))
        return result
    else
        return "invalid inputs"
}
export const vatAggregators =  (aggregators = [], vat) => {
        return aggregators.map((aggregator)=>({
            ...aggregator,
            vat:aggregator.amount*vat/100}));
}
export const getTotalAggregators = (aggregators = [], key) => {
    let result = 0;
    aggregators.forEach((aggregator) => {
        result += getAggregatorAmount(aggregator)
    });
    if (_.isNumber(result))
        return result
    else
        return "invalid inputs"
}
