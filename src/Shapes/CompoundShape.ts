import {Shape} from "./Shape";
import {IShape} from "./interfaces/IShape";
import {Rectangle} from "./Rectangle";
import {Triangle} from "./Triangle";
import {Circle} from "./Circle";

export class CompoundShape extends Shape {
    private children: Shape[] = [];
    private readonly _type = "COMPOUND";
    private _isSelected = false;

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

    selected(x: number, y: number): IShape | null {
        return null;
    }

    setNewPosition(x: number, y: number): void {

    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        this._isSelected = value;
    }
}