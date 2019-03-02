import {ISideCoords} from "./ISideCoords";

export interface IShape {
    draw(canvas: HTMLCanvasElement): void;

    getArea(): number;

    getPerimeter(): number;

    getType(): string;

    selected(x: number, y: number): IShape | null;

    setNewPosition(x: number, y: number, sx: number, sy: number): void;

    isSelected: boolean;

    getPosition(): ISideCoords;
}