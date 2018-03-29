import { Handler, Context, Callback } from 'aws-lambda';

interface CostInput {
      length: number;
      height: number;
}

// This is what is required by Callback type argument 2;
interface CostResponse {
      statusCode: number;
        body: string;
}

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



