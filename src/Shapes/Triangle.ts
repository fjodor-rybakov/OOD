import {ITriangleData} from "./interfaces/ITriangleData";
import {ITriangleSides} from "./interfaces/ITriangleSides";
import {Shape} from "./Shape";
import {IShape} from "./interfaces/IShape";
import {ISideCoords} from "./interfaces/ISideCoords";
import {EShapeType} from "./interfaces/EShapeType";

export class Triangle extends Shape {
    private triangleData: ITriangleData;
    private readonly _type = EShapeType.TRIANGLE;
    private _isSelected = false;

    constructor(data: string) {
        super();
        this.triangleData = this.parseData(data);
    }

    getArea(): number {
        const p = this.getPerimeter() / 2;
        const {a, b, c} = this.getSides();
        return Math.sqrt(p * (p - a) * (p - b) * (p - c));
    }

    getPerimeter(): number {
        const sides = this.getSides();
        return sides.a + sides.b + sides.c;
    }

    draw(canvas: HTMLCanvasElement): void {
        let context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) return;
        const {px1, px2, px3, py1, py2, py3} = this.triangleData;

        context.beginPath();
        context.fillStyle = "red";
        context.moveTo(px1, py1);
        context.lineTo(px2, py2);
        context.lineTo(px3, py3);
        context.closePath();
        context.fill();
        if (this.isSelected) {
            const {a, b, c} = this.getSides();
            context.strokeRect(px1 - 10, py1 - 10, b + 20, a + 20);
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

    onShape(x: number, y: number): IShape | null {
        const {px1, px2, px3, py1, py2, py3} = this.triangleData;
        let a = (px1 - x) * (py2 - py1) - (px2 - px1) * (py1 - y);
        let b = (px2 - x) * (py3 - py2) - (px3 - px2) * (py2 - y);
        let c = (px3 - x) * (py1 - py3) - (px1 - px3) * (py3 - y);
        if ((a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0)) {
            return this;
        } else {
            return null;
        }
    }

    getPosition(): ISideCoords {
        const {px1, px2, px3, py1, py2, py3} = this.triangleData;
        const {a, b, c} = this.getSides();
        return {
            x1: px1 - 10,
            y1: py1 - 10,
            x2: px1 + b + 10,
            y2: py1 + a + 10
        }
    }

    setNewPosition(x: number, y: number, sx: number, sy: number): void {
        const {px1, px2, px3, py1, py2, py3} = this.triangleData;
        const ccx = x - sx;
        const ccy = y - sy;
        this.triangleData = {
            px1: px1 + ccx,
            px2: px2 + ccx,
            px3: px3 + ccx,
            py1: py1 + ccy,
            py2: py2 + ccy,
            py3: py3 + ccy
        }
    }

    private parseData(data: string): ITriangleData {
        const partOfData: string[] = data.split(";");
        const pointsOne: string[] = partOfData[0].split("=")[1].split(",");
        const pointsTwo: string[] = partOfData[1].split("=")[1].split(",");
        const pointsThree: string[] = partOfData[2].split("=")[1].split(",");

        return {
            px1: +pointsOne[0],
            py1: +pointsOne[1],
            px2: +pointsTwo[0],
            py2: +pointsTwo[1],
            px3: +pointsThree[0],
            py3: +pointsThree[1]
        }
    }

    private getSides(): ITriangleSides {
        const {px1, px2, px3, py1, py2, py3} = this.triangleData;
        const a = Math.sqrt(Math.pow(px1 - px2, 2) + Math.pow(py1 - py2, 2));
        const b = Math.sqrt(Math.pow(px2 - px3, 2) + Math.pow(py2 - py3, 2));
        const c = Math.sqrt(Math.pow(px1 - px3, 2) + Math.pow(py1 - py3, 2));

        console.log(a, b, c);

        return {a, b, c};
    }
}