import {ICircleData} from "./interfaces/ICircleData";
import {Shape} from "./Shape";
import {fabric} from "fabric";

export class Circle extends Shape {
    private circleData: ICircleData;
    private readonly pi: number = 3.14;
    private readonly _type = "CIRCLE";

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

    draw(canvas:  fabric.Canvas): void {
        const options = {
            top: this.circleData.pcy,
            left: this.circleData.pcx,
            radius: this.circleData.radius,
            fill: "orange"
        };

        canvas.add(new fabric.Circle(options))
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