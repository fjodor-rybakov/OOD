import {IShape} from "./IShape";

export class Triangle implements IShape {
    private shape: IShape;

    constructor(obj: IShape) {
        this.shape = obj;
    }

    getArea(): number {
        return 10;
    }

    getPerimeter(): number {
        return 20;
    }

    getData(): string[] {
        return this.shape.getData();
    }
}