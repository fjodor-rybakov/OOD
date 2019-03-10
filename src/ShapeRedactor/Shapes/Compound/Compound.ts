import {Shape} from "../Shape";
import {IShape} from "../interfaces/IShape";
import {ISideCoords} from "../interfaces/ISideCoords";
import {IRectangleData} from "../Rectangle/IRectangleData";
import {IRectangleSides} from "../Rectangle/IRectangleSides";
import {EShapeType} from "../interfaces/EShapeType";

export class Compound extends Shape {
    private compoundData: IRectangleData;
    private children: Shape[] = [];
    private readonly _type = EShapeType.COMPOUND;
    private _isSelected = false;
    private _fillColor = "";
    private _borderSize = 0;
    private _borderColor = "";
    private readonly context: CanvasRenderingContext2D | null;

    constructor(shapes: Shape[], canvas: HTMLCanvasElement) {
        super();
        this.compoundData = this.setCompoundData(shapes);
        this.children.push(...shapes);
        this.context = canvas.getContext("2d");
    }

    getChildren(): Shape[] {
        return this.children;
    }

    addChild(shape: Shape): void {
        this.children.push(shape);
    }

    setChildren(shapes: Shape[]): void {
        this.children = shapes;
    }

    draw() {
        if (!this.context) return;
        this.children.map((item: IShape) => {
            item.draw();
        });
        if (this.isSelected) {
            const posX = Math.max(this.compoundData.px1, this.compoundData.px2) - this.getSides().a;
            const posY = Math.max(this.compoundData.py1, this.compoundData.py2) - this.getSides().b;
            this.context.lineWidth = 2;
            this.context.strokeStyle = "#565f67";
            this.context.strokeRect(posX, posY, this.getSides().a, this.getSides().b);
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

    onShape(x: number, y: number): IShape | null {
        const {px1, py2, px2, py1} = this.compoundData;
        if (((x >= px1) && (y <= py2)) && ((x <= px2) && (y >= py1))) {
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

    getType(): string {
        return this._type;
    }

    get borderColor(): string {
        return this._borderColor;
    }

    set borderColor(value: string) {
        this._borderColor = value;
    }

    get borderSize(): number {
        return this._borderSize;
    }

    set borderSize(value: number) {
        this._borderSize = value;
    }

    get fillColor(): string {
        return this._fillColor;
    }

    set fillColor(value: string) {
        this._fillColor = value;
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

    private setCompoundData(shapes: IShape[]): IRectangleData {
        let minX1 = 99999999;
        let minY1 = 99999999;
        let maxX2 = -99999999;
        let maxY2 = -99999999;
        let position;
        shapes.map((item: IShape) => {
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
        return {
            px1: minX1,
            py2: maxY2,
            px2: maxX2,
            py1: minY1
        };
    }
}