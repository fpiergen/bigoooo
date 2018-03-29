"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cost_calculator_1 = require("./cost-calculator");
const cost = (event, context, callback) => {
    let costCalculator = new cost_calculator_1.CostCalculator(JSON.parse(event.body));
    let cost = costCalculator.calculateCost();
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            cost: cost
        })
    };
    callback(undefined, response);
};
/*
const cost: Handler = (event: any, context: Context, callback: Callback) => {

          let wallSections: Array<CostInput> =JSON.parse(event.body);
          console.log(wallSections);
          let cost: number;
          cost = _calculateCost(wallSections);

    const response: CostResponse = {
        statusCode: 200,
    //    body: {cost:  cost }
        body: JSON.stringify({
            cost: cost
        })
    };

    callback(undefined, response);
};

export { cost }

function _calculateCost(wallSections:Array<CostInput>): number {

      let rate: number = 40; // $40 per square foot.
      let cost: number = 0;
      for (let wallSection of wallSections) {
          let area = _calculateArea(wallSection.length, wallSection.height);
          cost = cost + area*rate;
      }
      cost = Math.round(cost)
      return cost;

  }

  function _calculateArea( length: number, height: number ): number {
      let area: number = length * (height/12);
      return area;
  }

 */
//# sourceMappingURL=handler.js.map