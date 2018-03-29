"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
class CostCalculator {
    constructor(wallSections) {
        this.wallSections = wallSections;
    }
    calculateCost() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._getRate();
            let cost = 0;
            for (let wallSection of this.wallSections) {
                let area = this._calculateArea(wallSection.length, wallSection.height);
                cost = cost + area * this.rate;
            }
            cost = Math.round(cost);
            return cost;
        });
    }
    _calculateArea(length, height) {
        let area = length * (height / 12);
        return area;
    }
    _getRate() {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                TableName: 'TaperedStoneWall',
                Limit: 1,
            };
            let dynamodb = new aws_sdk_1.DynamoDB(); // This should get all the correct defaults for production???
            if (process.env.IS_OFFLINE) {
                dynamodb = new aws_sdk_1.DynamoDB({
                    region: 'localhost',
                    endpoint: 'http://localhost:8000'
                });
            }
            let response = yield dynamodb.scan(params).promise();
            this.rate = response.Items[0].rate.N; // successful response
        });
    }
}
exports.CostCalculator = CostCalculator;
// OR this way...
/*

   await dynamodb.scan(params).promise().then((data)=>{
   this.rate = data.Items[0].taperedStraightWall.N; // successful response
   });
 */
/*
   dynamodb.scan(params, function(err, data) {
   if (err)
   console.log(err); // an error occurred
   else
   this.rate = Number(data.Items[0].taperedStraightWall.N); // successful response
   });
 */
//# sourceMappingURL=costCalculator.js.map