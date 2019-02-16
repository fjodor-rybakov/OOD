import {IRectangleData} from "./interfaces/IRectangleData";
import {IRectangleSides} from "./interfaces/IRectangleSides";
import * as React from "react";
import {Shape} from "./Shape";

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

    draw(canvasRef: React.RefObject<HTMLCanvasElement>): void {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) return;
        const posX = Math.max(this.rectangleData.px1, this.rectangleData.px2) - this.getSides().a;
        const posY = Math.max(this.rectangleData.py1, this.rectangleData.py2) - this.getSides().b;

        context.fillStyle = "green";
        context.fillRect(posX, posY, this.getSides().a, this.getSides().b);
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