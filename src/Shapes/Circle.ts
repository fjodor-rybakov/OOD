import {ICircleData} from "./interfaces/ICircleData";
import {Shape} from "./Shape";
import {Triangle} from "./Triangle";
import {Rectangle} from "./Rectangle";

export class Circle extends Shape {
    private readonly circleData: ICircleData;
    private readonly pi: number = 3.14;
    private readonly _type = "CIRCLE";
    private _isSelected = false;

    constructor(data: string) {
        super();
        this.circleData = this.parseData(data);
    }

    getArea(): number {
        return this.pi * Math.pow(this.circleData.radius, 2);
    }

    getPerimeter(): number {
        return this.circleData.radius * 2 * this.pi;
    }

    draw(canvas: HTMLCanvasElement): void {
        let context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) return;

        context.fillStyle = "orange";
        context.beginPath();
        context.arc(this.circleData.pcx, this.circleData.pcy, this.circleData.radius, 0, 2 * this.pi);
        context.fill();
        context.closePath();
        if (this.isSelected) {
            const {pcx, pcy, radius} = this.circleData;
            context.strokeRect(pcx - radius - 10, pcy - radius - 10, radius * 2 + 20, radius * 2 + 20);
        }
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        this._isSelected = value;
    }

    getType() {
        return this._type;
    }

    selected(x: number, y: number): Rectangle | Circle | Triangle | null {
        const {pcx, pcy, radius} = this.circleData;
        if (Math.sqrt((x-pcx)*(x-pcx)+(y-pcy)*(y-pcy)) <= radius) {
            return this;
        } else {
            return null;
        }
    }

    setNewPosition(pcx: number, pcy: number, radius?: number): void {
        this.circleData.pcx = pcx;
        this.circleData.pcy = pcy;
        if (radius) this.circleData.radius = radius;
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