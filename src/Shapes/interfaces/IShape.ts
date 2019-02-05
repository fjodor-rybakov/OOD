export interface IShape {
    draw?(): void;
    getArea(): number;
    getPerimeter(): number;
    getType(): string;
}