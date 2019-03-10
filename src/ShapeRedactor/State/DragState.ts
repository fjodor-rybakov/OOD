import {State} from "./State";
import {IShape} from "../Shapes/interfaces/IShape";
import {Compound} from "../Shapes/Compound/Compound";
import {ShapeRedactor} from "../ShapeRedactor";

export class DragState extends State {
    constructor(context: ShapeRedactor, canvas: HTMLCanvasElement, compound: Compound) {
        super(context, canvas, compound)
    }

    drag(event: MouseEvent): void {
        const canvas = this.context.getCanvas();
        if (!canvas) {
            return;
        }
        const compound = this.context.getCompound();
        const elemLeft = canvas.offsetLeft, elemTop = canvas.offsetTop;
        let isDrag = false;
        let xd = 0, yd = 0, typeDown = 0, ox = 0, oy = 0;
        xd = ox = event.pageX - elemLeft;
        yd = oy = event.pageY - elemTop;
        typeDown = event.button;

        compound.getChildren().map((item: IShape) => {
            if (item.onShape(xd, yd)) {
                isDrag = true;

                if (typeDown === 2) {
                    this.selectShape(canvas, item, compound);
                }
                canvas.onmousemove = (event: MouseEvent) => {
                    if (isDrag) {
                        let x = event.pageX - elemLeft, y = event.pageY - elemTop;
                        item.setNewPosition(x, y, ox, oy);
                        ox = x;
                        oy = y;
                        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
                        compound.draw();
                    }
                };

                canvas.onmouseup = () => {
                    isDrag = false;
                };
            }
        });
    }

    fill(color: string, event: MouseEvent): void {}

    private selectShape(canvas: HTMLCanvasElement, item: IShape, compound: IShape): void {
        item.isSelected = !item.isSelected;
        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
        compound.draw();
    }
}