import {ICircleData} from "./ICircleData";
import {Shape} from "../Shape";
import {IShape} from "../interfaces/IShape";
import {ISideCoords} from "../interfaces/ISideCoords";
import {EShapeType} from "../interfaces/EShapeType";

export class Circle extends Shape {
    private readonly circleData: ICircleData;
    private readonly pi: number = 3.14;
    private readonly _type = EShapeType.CIRCLE;
    private _isSelected = false;
    private _fillColor = "#fff";
    private _borderSize = 1;
    private _borderColor = "black";
    private readonly context: CanvasRenderingContext2D | null;

    constructor(data: string, canvas: HTMLCanvasElement) {
        super();
        this.circleData = this.parseData(data);
        this.context = canvas.getContext("2d");
    }

    getArea(): number {
        return this.pi * Math.pow(this.circleData.radius, 2);
    }

    getPerimeter(): number {
        return this.circleData.radius * 2 * this.pi;
    }

    draw(): void {
        if (!this.context) return;

        this.context.beginPath();
        this.context.fillStyle = this.fillColor;
        this.context.arc(this.circleData.pcx, this.circleData.pcy, this.circleData.radius, 0, 2 * this.pi);
        this.context.closePath();
        this.context.fill();
        if (this.isSelected) {
            const {pcx, pcy, radius} = this.circleData;
            this.context.lineWidth = 2;
            this.context.strokeStyle = "#565f67";
            this.context.strokeRect(pcx - radius - 10, pcy - radius - 10, radius * 2 + 20, radius * 2 + 20);
        }
        this.context.strokeStyle = this.borderColor;
        this.context.lineWidth = this.borderSize;
        this.context.stroke();
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
        const {pcx, pcy, radius} = this.circleData;
        if (Math.sqrt((x-pcx)*(x-pcx)+(y-pcy)*(y-pcy)) <= radius) {
            return this;
        } else {
            return null;
        }
    }

    setNewPosition(pcx: number, pcy: number, sx: number, sy: number): void {
        const ccx = pcx - sx;
        const ccy = pcy - sy;
        this.circleData.pcx += ccx;
        this.circleData.pcy += ccy;
    }

    getPosition(): ISideCoords {
        const {pcx, pcy, radius} = this.circleData;
        return {
            x1: pcx - radius - 10,
            y1: pcy - radius - 10,
            x2: pcx + radius + 10,
            y2: pcy + radius + 10
        };
    }

    private parseData(data: string): ICircleData {
        const partOfData: string[] = data.split(";");
        const centerCoords: string[] = partOfData[0].split("=")[1].split(",");
        const radius: number = +partOfData[1].split("=")[1];

        return {
            pcx: +centerCoords[0],
            pcy: +centerCoords[1],
            radius
        }
    }
}