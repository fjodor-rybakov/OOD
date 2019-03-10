import {IRectangleData} from "./IRectangleData";
import {IRectangleSides} from "./IRectangleSides";
import {Shape} from "../Shape";
import {IShape} from "../interfaces/IShape";
import {ISideCoords} from "../interfaces/ISideCoords";
import {EShapeType} from "../interfaces/EShapeType";

export class Rectangle extends Shape {
    private rectangleData: IRectangleData;
    private readonly _type = EShapeType.RECTANGLE;
    private _isSelected = false;
    private _fillColor = "#fff";
    private _borderSize = 1;
    private _borderColor = "black";
    private readonly context: CanvasRenderingContext2D | null;

    constructor(data: string, canvas: HTMLCanvasElement) {
        super();
        this.rectangleData  = this.parseData(data);
        this.context = canvas.getContext("2d");
    }

    getArea(): number {
        const sides: IRectangleSides = this.getSides();
        return sides.a * sides.b;
    }

    getPerimeter(): number {
        const sides: IRectangleSides = this.getSides();
        return (sides.a + sides.b) * 2;
    }

    draw(): void {
        if (!this.context) return;
        const posX = Math.max(this.rectangleData.px1, this.rectangleData.px2) - this.getSides().a;
        const posY = Math.max(this.rectangleData.py1, this.rectangleData.py2) - this.getSides().b;

        this.context.fillStyle = this.fillColor;
        this.context.fillRect(posX, posY, this.getSides().a, this.getSides().b);
        if (this.isSelected) {
            this.context.lineWidth = 2;
            this.context.strokeStyle = "#565f67";
            this.context.strokeRect(posX - 10, posY - 10, this.getSides().a + 20, this.getSides().b + 20);
        }

        this.context.strokeStyle = this.borderColor;
        this.context.lineWidth = this.borderSize;
        this.context.strokeRect(posX, posY, this.getSides().a, this.getSides().b);
    }

    getType() {
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

    onShape(x: number, y: number): IShape | null {
        const {px1, px2, py1, py2} = this.rectangleData;
        if (((x >=px1) && (y<=py1)) && ((x<=px2) && (y>=py2))) {
            return this;
        } else {
            return null;
        }
    }

    setNewPosition(x: number, y: number, sx: number, sy: number): void {
        const {px1, px2, py1, py2} = this.rectangleData;
        const ccx = x - sx;
        const ccy = y - sy;
        this.rectangleData = {
            px1: px1 + ccx,
            px2: px2 + ccx,
            py1: py1 + ccy,
            py2: py2 + ccy
        };
    }

    getPosition(): ISideCoords {
        const posX = Math.max(this.rectangleData.px1, this.rectangleData.px2) - this.getSides().a;
        const posY = Math.max(this.rectangleData.py1, this.rectangleData.py2) - this.getSides().b;
        return {
            x1: posX - 10,
            y1: posY - 10,
            x2: posX + this.getSides().a + 10,
            y2: posY + this.getSides().b + 10
        }
    }

    private parseData(data: string): IRectangleData {
        const partOfData: string[] = data.split(";");
        const pointsOne: string[] = partOfData[0].split("=")[1].split(",");
        const pointsTwo: string[] = partOfData[1].split("=")[1].split(",");

        return {
            px1: +pointsOne[0],
            py1: +pointsOne[1],
            px2: +pointsTwo[0],
            py2: +pointsTwo[1]
        }
    }

    private getSides(): IRectangleSides {
        const points: IRectangleData = this.rectangleData;
        return {
            a: Math.abs(points.px2 - points.px1),
            b: Math.abs(points.py2 - points.py1)
        }
    }
}