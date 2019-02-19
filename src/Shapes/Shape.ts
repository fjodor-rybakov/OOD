import {IShape} from "./interfaces/IShape";

export abstract class Shape implements IShape {
    abstract getArea(): number;

    abstract getPerimeter(): number;

    abstract getType(): string;

    abstract draw(canvas: HTMLCanvasElement): void;
}