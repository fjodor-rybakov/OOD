import {IShape} from "./interfaces/IShape";
import {ITriangleData} from "./interfaces/ITriangleData";
import {ITriangleSides} from "./interfaces/ITriangleSides";
import * as React from "react";

export class Triangle implements IShape {
    private shape: IShape;
    private readonly triangleData: ITriangleData;
    private readonly _type = "TRIANGLE";

    constructor(shape: IShape, data: string) {
        this.shape = shape;
        this.triangleData = this.parseData(data);
    }

    getArea(): number {
        const perimeter = this.getPerimeter();
        const sides = this.getSides();
        return Math.sqrt(perimeter * (perimeter - sides.a) * (perimeter - sides.b) * (perimeter - sides.c));
    }

    getPerimeter(): number {
        const sides = this.getSides();
        return sides.a + sides.b + sides.c;
    }

    draw(canvasRef: React.RefObject<HTMLCanvasElement>): void {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) return;
        const points: ITriangleData = this.triangleData;

        context.beginPath();
        context.fillStyle = "red";
        context.moveTo(0, 0);
        context.lineTo(points.px2 - points.px1, points.py2 - points.py1);
        context.lineTo(points.px3 - points.px1, points.py3 - points.py1);
        context.closePath();
        context.fill();
        context.strokeStyle = "red";
        context.stroke();
    }

    getType() {
        return this._type;
    }

    private parseData(data: string): ITriangleData {
        const partOfData: string[] = data.split(";");
        const pointsOne: string[] = partOfData[0].split("=")[1].split(",");
        const pointsTwo: string[] = partOfData[1].split("=")[1].split(",");
        const pointsThree: string[] = partOfData[2].split("=")[1].split(",");

        return {
            px1: +pointsOne[0],
            py1: +pointsOne[1],
            px2: +pointsTwo[0],
            py2: +pointsTwo[1],
            px3: +pointsThree[0],
            py3: +pointsThree[1]
        }
    }

    private getSides(): ITriangleSides {
        const points: ITriangleData = this.triangleData;
        const a = Math.sqrt((Math.pow((points.px1 - points.px2), 2)) + (Math.pow((points.py1 - points.py2), 2)));
        const b = Math.sqrt((Math.pow((points.px2 - points.px3), 2)) + (Math.pow((points.py2 - points.py3), 2)));
        const c = Math.sqrt((Math.pow((points.px1 - points.px3), 2)) + (Math.pow((points.py1 - points.py3), 2)));

        return {a, b, c};
    }
}