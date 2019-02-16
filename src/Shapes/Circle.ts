import {ICircleData} from "./interfaces/ICircleData";
import * as React from "react";
import {Shape} from "./Shape";

export class Circle extends Shape {
    private circleData: ICircleData;
    private readonly pi: number = 3.14;
    private readonly _type = "Circle";
    private context!: CanvasRenderingContext2D;

    constructor(data: string) {
        super();
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
        this.context = context;

        context.fillStyle = "orange";
        context.beginPath();
        context.arc(this.circleData.pcx, this.circleData.pcy, this.circleData.radius, 0, 2 * this.pi);
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
            pcx: +centerCoords[0],
            pcy: +centerCoords[1],
            radius
        }
    }
}