import {RefObject} from "react";
import {IMouseCoords} from "./IMouseCoords";

export interface IShape {
    draw(canvasRef: RefObject<HTMLCanvasElement>): void;
    getArea(): number;
    getPerimeter(): number;
    getType(): string;
}