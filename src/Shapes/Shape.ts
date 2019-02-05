import {IShape} from "./interfaces/IShape";

export class Shape implements IShape {
    getArea(): number {
        return 0;
    }

    getPerimeter(): number {
        return 0;
    }

    getType(): string {
        return "empty";
    }

    draw(): void {}
}