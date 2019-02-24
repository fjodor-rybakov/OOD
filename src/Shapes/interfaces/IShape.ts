export interface IShape {
    draw(canvas: HTMLCanvasElement): void;

    getArea(): number;

    getPerimeter(): number;

    getType(): string;

    selected(x: number, y: number): IShape | null;

    setNewPosition(x: number, y: number): void;

    isSelected: boolean;
}