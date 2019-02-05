import {IShape} from "./interfaces/IShape";
import {IRectangleData} from "./interfaces/IRectangleData";
import {IRectangleSides} from "./interfaces/IRectangleSides";

export class Rectangle implements IShape {
    private shape: IShape;
    private readonly rectangleData: IRectangleData;
    private readonly _type = "RECTANGLE";

    constructor(shape: IShape, data: string) {
        this.shape = shape;
        this.rectangleData  = this.parseData(data);
    }

    getArea(): number {
        const sides: IRectangleSides = this.getSides();
        return sides.a * sides.b;
    }

    getPerimeter(): number {
        const sides: IRectangleSides = this.getSides();
        return (sides.a + sides.b) * 2;
    }

    getType() {
        return this._type;
    }

    private parseData(data: string): IRectangleData {
        const partOfData: string[] = data.split(";");
        const pointsOne: string[] = partOfData[0].split("=")[1].split(",");
        const pointsTwo: string[] = partOfData[1].split("=")[1].split(",");

        return {
            px1: +pointsOne[0],
            py1: +pointsOne[1],
            px2: +pointsTwo[0],
            py2: +pointsTwo[1]
        }
    }

    private getSides(): IRectangleSides {
        const points: IRectangleData = this.rectangleData;
        return {
            a: Math.abs(points.px2 - points.px1),
            b: Math.abs(points.py2 - points.py1)
        }
    }
}