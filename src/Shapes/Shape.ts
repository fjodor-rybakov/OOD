import {IShape} from "./interfaces/IShape";

export abstract class Shape implements IShape {
    abstract getArea(): number;

    abstract getPerimeter(): number;

    abstract getType(): string;

    abstract draw(canvas: HTMLCanvasElement): void;

    abstract selected(x: number, y: number): IShape | null;

    abstract setNewPosition(x: number, y: number): void;

    abstract get isSelected(): boolean;

    abstract set isSelected(value: boolean);
}