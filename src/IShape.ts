export interface IShape {
    draw?(): void;
    getArea(): number;
    getPerimeter(): number;
    getData(): string[];
}