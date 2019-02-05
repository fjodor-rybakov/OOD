import {IShape} from "./interfaces/IShape";
import {ICircleData} from "./interfaces/ICircleData";
import * as React from "react";

export class Circle implements IShape {
    private shape: IShape;
    private circleData: ICircleData;
    private readonly pi: number = 3.14;
    private readonly _type = "Circle";

    constructor(shape: IShape, data: string) {
        this.shape = shape;
        this.circleData = this.parseData(data);
    }

    getArea(): number {
        return this.pi * Math.pow(this.circleData.radius, 2);
    }

    getPerimeter(): number {
        return this.circleData.radius * 2 * this.pi;
    }

    draw(canvasRef: React.RefObject<HTMLCanvasElement>): void {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) return;

        context.fillStyle = "orange";
        context.beginPath();
        context.arc(this.circleData.pointCenterX, this.circleData.pointCenterY, this.circleData.radius, 0, 2 * this.pi);
        context.fill();
        context.closePath();
    }

    getType() {
        return this._type;
    }

    private parseData(data: string): ICircleData {
        const partOfData: string[] = data.split(";");
        const centerCoords: string[] = partOfData[0].split("=")[1].split(",");
        const radius: number = +partOfData[1].split("=")[1];

        return {
            pointCenterX: +centerCoords[0],
            pointCenterY: +centerCoords[1],
            radius
        }
    }
}