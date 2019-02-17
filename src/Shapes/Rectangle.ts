import {IRectangleData} from "./interfaces/IRectangleData";
import {IRectangleSides} from "./interfaces/IRectangleSides";
import {Shape} from "./Shape";
import {fabric} from "fabric";

export class Rectangle extends Shape {
    private readonly rectangleData: IRectangleData;
    private readonly _type = "RECTANGLE";

    constructor(data: string) {
        super();
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

    draw(canvas:  fabric.Canvas): void {
        const sides: IRectangleSides = this.getSides();
        const points: IRectangleData = this.rectangleData;

        const options = {
            width: sides.a,
            height: sides.b,
            fill: "green",
            left: (points.px1 + points.px2) / 2,
            top: (points.py1 + points.py2) / 2,
        };

        canvas.add(new fabric.Rect(options));
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