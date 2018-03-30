import {WallInput} from './handler';
import { DynamoDB } from 'aws-sdk';

export class CostCalculator {

    private wallSections: Array<WallInput>;
    private rate: number;

    constructor(wallSections: Array<WallInput> ) {
        this.wallSections = wallSections;
    }

    public async calculateCost(): Promise<number> {

	await this._getRate();

	let cost: number = 0;

	for (let wallSection of this.wallSections) {
	    let area = this._calculateArea(wallSection.length, wallSection.height);
	    cost = cost + area*this.rate;
	}

	cost = Math.round(cost)

	return cost;

    }

    private _calculateArea( length: number, height: number ): number {
        let area: number = length * (height/12);
        return area;
    }

    private async _getRate() {

	var params = {
	    TableName: 'TaperedStoneWall',
	    Limit: 1, // optional (limit the number of items to evaluate)
	};

	let dynamodb = new DynamoDB({
		region: 'us-east-1'
        });

	if ( process.env.IS_OFFLINE )  {
	    dynamodb = new DynamoDB({
		region: 'localhost',
		endpoint: 'http://localhost:8000'
	    })
	}

	let response = await dynamodb.scan(params).promise();
	this.rate = response.Items[0].rate.N; // successful response
    }
}

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

