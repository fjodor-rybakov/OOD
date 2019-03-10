import {ICommand} from "./interfaces/ICommand";
import {IShape} from "../Shapes/interfaces/IShape";
import {ShapeRedactor} from "../ShapeRedactor";

export class BorderSizeCommand implements ICommand {
    private readonly value: number;

    public constructor(value: number) {
        this.value = value;
    }

    public execute(): void {
        const instance = ShapeRedactor.getInstance();
        const canvas = instance.getCanvas();
        const compound = instance.getCompound();
        if (isNaN(this.value)) {
            console.log("Некорректные данные");
            return;
        }
        if (!canvas) {
            return;
        }
        compound.getChildren().map((item: IShape) => {
            if (item.isSelected) {
                item.borderSize = this.value;
            }
        });
        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
        compound.draw();
    }
}