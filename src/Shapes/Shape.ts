import {IShape} from "./interfaces/IShape";
import {ISideCoords} from "./interfaces/ISideCoords";

export abstract class Shape implements IShape {
    abstract getArea(): number;

    abstract getPerimeter(): number;

    abstract getType(): string;

    abstract draw(canvas: HTMLCanvasElement): void;

    abstract selected(x: number, y: number): IShape | null;

    abstract setNewPosition(x: number, y: number, sx: number, sy: number): void;

    abstract get isSelected(): boolean;

    abstract set isSelected(value: boolean);

    abstract getPosition(): ISideCoords;
}