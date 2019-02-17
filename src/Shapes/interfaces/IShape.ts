import {fabric} from "fabric";

export interface IShape {
    draw(canvas:  fabric.Canvas): void;
    getArea(): number;
    getPerimeter(): number;
    getType(): string;
}