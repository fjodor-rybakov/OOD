import {IShape} from "./interfaces/IShape";
import {ICircleData} from "./interfaces/ICircleData";

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