import { Handler, Context, Callback } from 'aws-lambda';
import {CostCalculator} from './costCalculator';


export interface WallInput {
      length: number;
      height: number;
}

// This is what is required by Callback argument 2 type;
interface CostResponse {
      statusCode: number;
      body: string;
}

const cost: Handler = (event: any, context: Context, callback: Callback) => {


    let costCalculator: CostCalculator = new CostCalculator(JSON.parse(event.body));

    // TODO error handling!!!
    costCalculator.calculateCost().then((cost1: number)=>{

        const response: CostResponse = {
            statusCode: 200,
            body: JSON.stringify({
                cost: cost1 
            })
        };

        callback(undefined, response);

    }, (err)=> {callback(err, {statusCode: 911, body: JSON.stringify(err)});} );
};

export { cost }

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

