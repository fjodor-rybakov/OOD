import {Shape} from "./Shape";
import {IShape} from "./interfaces/IShape";
import {ISideCoords} from "./interfaces/ISideCoords";
import {IRectangleData} from "./interfaces/IRectangleData";
import {IRectangleSides} from "./interfaces/IRectangleSides";

export class CompoundShape extends Shape {
    private compoundData!: IRectangleData;
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

    setChildren(shapes: Shape[]): void {
        this.children = shapes;
    }

    draw(canvas: HTMLCanvasElement) {
        let context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) return;
        this.children.map((item: IShape) => {
            item.draw(canvas);
        });
        if (this.isSelected) {
            const posX = Math.max(this.compoundData.px1, this.compoundData.px2) - this.getSides().a;
            const posY = Math.max(this.compoundData.py1, this.compoundData.py2) - this.getSides().b;
            context.strokeRect(posX - 10, posY - 10, this.getSides().a + 20, this.getSides().b + 20);
        }
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
        let minX1 = 99999999;
        let minY1 = 99999999;
        let maxX2 = -99999999;
        let maxY2 = -99999999;
        let position;
        this.getChildren().map((item: IShape) => {
            position = item.getPosition();
            if (position.x1 < minX1)
                minX1 = position.x1;
            if (position.y1 < minY1)
                minY1 = position.y1;
            if (position.x2 > maxX2)
                maxX2 = position.x2;
            if (position.y2 > maxY2)
                maxY2 = position.y2;
        });
        this.compoundData = {
            px1: minX1,
            py2: maxY2,
            px2: maxX2,
            py1: minY1
        };
        if (((x >= minX1) && (y <= maxY2)) && ((x <= maxX2) && (y >= minY1))) {
            return this;
        } else {
            return null;
        }
    }

    setNewPosition(x: number, y: number, sx: number, sy: number): void {
        const {px1, px2, py1, py2} = this.compoundData;
        const ccx = x - sx;
        const ccy = y - sy;
        this.compoundData = {
            px1: px1 + ccx,
            px2: px2 + ccx,
            py1: py1 + ccy,
            py2: py2 + ccy
        };

        this.getChildren().map((item: IShape) => {
            item.setNewPosition(x, y, sx, sy);
        })
    }

    getPosition(): ISideCoords {
        const posX = Math.max(this.compoundData.px1, this.compoundData.px2) - this.getSides().a;
        const posY = Math.max(this.compoundData.py1, this.compoundData.py2) - this.getSides().b;
        return {
            x1: posX - 10,
            y1: posY - 10,
            x2: posX + this.getSides().a + 10,
            y2: posY + this.getSides().b + 10
        }
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        this._isSelected = value;
    }

    private getSides(): IRectangleSides {
        const points: IRectangleData = this.compoundData;
        return {
            a: Math.abs(points.px2 - points.px1),
            b: Math.abs(points.py2 - points.py1)
        }
    }
}