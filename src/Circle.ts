import {IShape} from "./IShape";

export class Circle implements IShape {
    private shape: IShape;

    constructor(obj: IShape) {
        this.shape = obj;
    }

    getArea(): number {
        return 1;
    }

    getPerimeter(): number {
        return 2;
    }

    getData(): string[] {
        return this.shape.getData();
    }
}