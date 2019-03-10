import {ShapeController} from "./Shapes/ShapeController";
import {IShape} from "./Shapes/interfaces/IShape";
import {Compound} from "./Shapes/Compound/Compound";
import {autobind} from "core-decorators";
import {State} from "./State/State";
import {DragState} from "./State/DragState";
import {FillState} from "./State/FillState";

@autobind
export class ShapeRedactor {
    private static shapeController = new ShapeController();
    private static instance: ShapeRedactor;
    private static canvas: HTMLCanvasElement | undefined;
    private static data: string[] | undefined;
    private static compound: Compound;
    private static state: State;
    private static fillColor: string | undefined;
    private static borderColor: string | undefined;


    public static getInstance(canvas?: HTMLCanvasElement, data?: string[]): ShapeRedactor {
        if (!ShapeRedactor.instance) {
            if (canvas) {
                ShapeRedactor.instance = new ShapeRedactor();
                ShapeRedactor.compound = new Compound([], canvas);
                ShapeRedactor.canvas = canvas;
                ShapeRedactor.data = data;
                ShapeRedactor.state = new DragState(ShapeRedactor.instance, ShapeRedactor.canvas, ShapeRedactor.compound);
            } else {
                console.log("Задайте canvas!")
            }
        }

        return ShapeRedactor.instance;
    }

    private constructor() {}

    public run(): void {
        const canvas = ShapeRedactor.canvas;
        const data = ShapeRedactor.data;
        let compound = ShapeRedactor.compound;
        if (!canvas) {
            console.log("Canvas отсутсвует");
            return;
        }
        if (!data) {
            console.log("Нет данных");
            return;
        }
        canvas.oncontextmenu = (e) => e.preventDefault();

        const shapes: IShape[] = data.map((line: string) => ShapeRedactor.shapeController.getShape(line, canvas));
        compound.setChildren(shapes);
        compound.draw();
        console.log(`${compound.getType()}: P=${compound.getPerimeter()}; S=${compound.getArea()}`);

        canvas.onmousedown = (event) => {
            ShapeRedactor.state.drag(event);
            if (!ShapeRedactor.fillColor) {
                return;
            }
            ShapeRedactor.state.fill(ShapeRedactor.fillColor, event);
        };

        addEventListener("keydown", (event: KeyboardEvent) => {
            ShapeRedactor.shapeController.groupShape(canvas, compound, event);
            ShapeRedactor.shapeController.ungroupShape(canvas, compound, event);
        });

        compound.getChildren().map((item: IShape) => {
            console.log(`${item.getType()}: P=${item.getPerimeter()}; S=${item.getArea()}`);
        });

        console.log(ShapeRedactor.instance)
    }

    public setBorderSize(value: number): void {
        if (!ShapeRedactor.canvas) {
            return;
        }
        ShapeRedactor.compound.getChildren().map((item: IShape) => {
            if (item.isSelected) {
                item.borderSize = value;
            }
        });
        ShapeRedactor.canvas.getContext("2d")!.clearRect(0, 0, ShapeRedactor.canvas.width, ShapeRedactor.canvas.height);
        ShapeRedactor.compound.draw();
    }

    public setBorderColor(color: string): void {
        if (!ShapeRedactor.canvas) {
            return;
        }
        ShapeRedactor.compound.getChildren().map((item: IShape) => {
            if (item.isSelected) {
                item.borderColor = color;
            }
        });
        ShapeRedactor.canvas.getContext("2d")!.clearRect(0, 0, ShapeRedactor.canvas.width, ShapeRedactor.canvas.height);
        ShapeRedactor.compound.draw();
    }

    public setFillColor(color: string): void {
        ShapeRedactor.fillColor = color;
    }

    public getCompound(): Compound {
        return ShapeRedactor.compound;
    }
    
    public getCanvas(): HTMLCanvasElement | undefined {
        return ShapeRedactor.canvas;
    }

    public setDragState() {
        if (!ShapeRedactor.canvas) {
            console.log("Задайте canvas");
            return;
        }
        ShapeRedactor.state = new DragState(this, ShapeRedactor.canvas, ShapeRedactor.compound);
    }

    public setFillState() {
        if (!ShapeRedactor.canvas) {
            console.log("Задайте canvas");
            return;
        }
        ShapeRedactor.state = new FillState(this, ShapeRedactor.canvas, ShapeRedactor.compound);
    }
}