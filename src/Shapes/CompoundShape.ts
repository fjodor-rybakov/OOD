import {Shape} from "./Shape";
import {IShape} from "./interfaces/IShape";

export class CompoundShape extends Shape {
    private children: Shape[] = [];
    private readonly _type = "COMPOUND";

    constructor(shapes: Shape[]) {
        super();
        this.children.push(...shapes);
    }

    getChildren(): Shape[] {
        return this.children;
    }

    draw(canvas: HTMLCanvasElement) {
        this.children.map((item: IShape) => {
            item.draw(canvas);
        });
    }

    getArea(): number {
        let sum = 0;
        this.children.map((item: IShape) => {
            sum += item.getArea();
        });
        return sum;
    }

    getPerimeter(): number {
        let sum = 0;
        this.children.map((item: IShape) => {
            sum += item.getPerimeter();
        });
        return sum;
    }

    getType(): string {
        return this._type;
    }
}