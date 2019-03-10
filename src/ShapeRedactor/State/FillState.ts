import {State} from "./State";
import {Compound} from "../Shapes/Compound/Compound";
import {IShape} from "../Shapes/interfaces/IShape";
import {ShapeRedactor} from "../ShapeRedactor";

export class FillState extends State {
    public constructor(context: ShapeRedactor, canvas: HTMLCanvasElement, compound: Compound) {
        super(context, canvas, compound);
    }

    drag(event: MouseEvent): void {}

    fill(color: string, event: MouseEvent): void {
        const canvas = this.canvas;
        const compound = this.compound;
        const elemLeft = canvas.offsetLeft, elemTop = canvas.offsetTop;
        let xd = 0, yd = 0;
        xd = event.pageX - elemLeft;
        yd = event.pageY - elemTop;
        let typeDown = event.button;

        compound.getChildren().map((item: IShape) => {
            if (item.onShape(xd, yd)) {
                if (typeDown === 2) {
                    item.isSelected = !item.isSelected;
                } else {
                    item.fillColor = color;
                }
            }
        });

        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
        compound.draw();
    }
}