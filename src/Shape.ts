import {IShape} from "./IShape";

export class Shape implements IShape {
    private readonly data: string[];

    constructor(data: string[]) {
        this.data = data;
    }

    getData(): string[] {
        return this.data;
    }

    getArea(): number {
        return 0;
    }

    getPerimeter(): number {
        return 0;
    }
}