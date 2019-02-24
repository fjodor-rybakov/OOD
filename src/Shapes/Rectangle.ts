import {IRectangleData} from "./interfaces/IRectangleData";
import {IRectangleSides} from "./interfaces/IRectangleSides";
import {Shape} from "./Shape";
import {Circle} from "./Circle";
import {Triangle} from "./Triangle";

export class Rectangle extends Shape {
    private rectangleData: IRectangleData;
    private readonly _type = "RECTANGLE";
    private _isSelected = false;

    constructor(data: string) {
        super();
        this.rectangleData  = this.parseData(data);
    }

    getArea(): number {
        const sides: IRectangleSides = this.getSides();
        return sides.a * sides.b;
    }

    getPerimeter(): number {
        const sides: IRectangleSides = this.getSides();
        return (sides.a + sides.b) * 2;
    }

    draw(canvas: HTMLCanvasElement): void {
        let context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) return;
        const posX = Math.max(this.rectangleData.px1, this.rectangleData.px2) - this.getSides().a;
        const posY = Math.max(this.rectangleData.py1, this.rectangleData.py2) - this.getSides().b;

        context.fillStyle = "green";
        context.fillRect(posX, posY, this.getSides().a, this.getSides().b);
        if (this.isSelected) {
            context.strokeRect(posX - 10, posY - 10, this.getSides().a + 20, this.getSides().b + 20);
        }
    }

    getType() {
        return this._type;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        this._isSelected = value;
    }

    selected(x: number, y: number): Rectangle | Circle | Triangle | null {
        const {px1, px2, py1, py2} = this.rectangleData;
        if (((x >=px1) && (y<=py1)) && ((x<=px2) && (y>=py2))) {
            return this;
        } else {
            return null;
        }
    }

    setNewPosition(x: number, y: number): void {
        const {px1, px2, py1, py2} = this.rectangleData;
        const cx = px1 + (px2 - px1) / 2;
        const cy = py2 + (py1 - py2) / 2;
        const ccx = cx - x;
        const ccy = cy - y;
        this.rectangleData = {
            px1: px1 - ccx,
            px2: px2 - ccx,
            py1: py1 - ccy,
            py2: py2 - ccy
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