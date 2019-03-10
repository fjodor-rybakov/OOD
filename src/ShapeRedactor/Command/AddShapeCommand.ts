import {ShapeController} from "../Shapes/ShapeController";
import {autobind} from "core-decorators";
import {ShapeRedactor} from "../ShapeRedactor";
import {ICommand} from "./interfaces/ICommand";

@autobind
export class AddShapeCommand implements ICommand {
    private controller = new ShapeController();
    private readonly data: string;

    constructor(data: string) {
        this.data = data;
    }

    execute(): void {
        const instance: ShapeRedactor = ShapeRedactor.getInstance();
        const canvas = instance.getCanvas();
        if (!canvas) {
            console.log("Canvas отсутсвует");
            return;
        }
        if (!this.data) {
            console.log("Нет данных");
            return;
        }
        const newShape = this.controller.getShape(this.data, canvas);
        instance.getCompound().addChild(newShape);
        instance.getCompound().draw();
    }
}