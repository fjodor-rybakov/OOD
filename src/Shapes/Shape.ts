import {IShape} from "./interfaces/IShape";
import * as React from "react";

export abstract class Shape implements IShape {
    abstract getArea(): number;

    abstract getPerimeter(): number;

    abstract getType(): string;

    abstract draw(canvasRef: React.RefObject<HTMLCanvasElement>): void;
}