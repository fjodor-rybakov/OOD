import {RefObject} from "react";

export interface IShape {
    draw(canvasRef: RefObject<HTMLCanvasElement>): void;
    getArea(): number;
    getPerimeter(): number;
    getType(): string;
}