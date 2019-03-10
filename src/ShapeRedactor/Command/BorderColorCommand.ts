import {ICommand} from "./interfaces/ICommand";
import {IShape} from "../Shapes/interfaces/IShape";
import {ShapeRedactor} from "../ShapeRedactor";

export class BorderColorCommand implements ICommand {
    private readonly color: string;

    public constructor(color: string) {
        this.color = color;
    }

    public execute(): void {
        const instance = ShapeRedactor.getInstance();
        const canvas = instance.getCanvas();
        const compound = instance.getCompound();
        if (!canvas) {
            return;
        }
        compound.getChildren().map((item: IShape) => {
            if (item.isSelected) {
                item.borderColor = this.color;
            }
        });
        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
        compound.draw();
    }
}