import {IShape} from "./interfaces/IShape";
import {fabric} from "fabric";

export abstract class Shape implements IShape {
    abstract getArea(): number;

    abstract getPerimeter(): number;

    abstract getType(): string;

    abstract draw(canvas:  fabric.Canvas): void;
}