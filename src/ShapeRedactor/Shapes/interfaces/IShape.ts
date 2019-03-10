import {ISideCoords} from "./ISideCoords";

export interface IShape {
    draw(color?: string): void;

    getArea(): number;

    getPerimeter(): number;

    getType(): string;

    onShape(x: number, y: number): IShape | null;

    setNewPosition(x: number, y: number, sx: number, sy: number): void;

    getPosition(): ISideCoords;

    isSelected: boolean;

    fillColor: string;

    borderColor: string;

    borderSize: number;
}