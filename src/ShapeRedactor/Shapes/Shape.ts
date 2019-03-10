import {IShape} from "./interfaces/IShape";
import {ISideCoords} from "./interfaces/ISideCoords";

export abstract class Shape implements IShape {
    abstract getArea(): number;

    abstract getPerimeter(): number;

    abstract getType(): string;

    abstract draw(): void;

    abstract onShape(x: number, y: number): IShape | null;

    abstract setNewPosition(x: number, y: number, sx: number, sy: number): void;

    abstract getPosition(): ISideCoords;

    abstract get isSelected(): boolean;

    abstract set isSelected(value: boolean);

    abstract get fillColor(): string;

    abstract set fillColor(value: string);

    abstract get borderColor(): string;

    abstract set borderColor(value: string);

    abstract get borderSize(): number;

    abstract set borderSize(value: number);
}