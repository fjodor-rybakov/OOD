export interface IShape {
    draw(canvas: HTMLCanvasElement): void;
    getArea(): number;
    getPerimeter(): number;
    getType(): string;
}