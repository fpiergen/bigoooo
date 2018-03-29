"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const costCalculator_1 = require("./costCalculator");
const cost = (event, context, callback) => {
    let costCalculator = new costCalculator_1.CostCalculator(JSON.parse(event.body));
    // TODO error handling!!!
    costCalculator.calculateCost().then((cost1) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                cost: cost1
            })
        };
        callback(undefined, response);
    }, (err) => { callback(err, { statusCode: 911, body: JSON.stringify(err) }); });
};
exports.cost = cost;
/*
//const cost: Handler = async (event: any, context: Context, callback: Callback) => {
    let cost = await costCalculator.calculateCost();

    const response: CostResponse = {
        statusCode: 200,
        body: JSON.stringify({
            cost: cost
        })
    };

    callback(undefined, response);
*/
// DO this if yo do not want to make the method async.
//# sourceMappingURL=handler.js.map