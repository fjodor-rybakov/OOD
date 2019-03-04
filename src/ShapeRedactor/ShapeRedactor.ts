import {ShapeController} from "./Shapes/ShapeController";
import {IShape} from "./Shapes/interfaces/IShape";
import {CompoundShape} from "./Shapes/CompoundShape";

export class ShapeRedactor {
    private static shapeController = new ShapeController();
    private static instance: ShapeRedactor;
    private static canvas: HTMLCanvasElement;
    private static data: string[];

    public static getInstance(canvas: HTMLCanvasElement, data: string[]): ShapeRedactor {
        if (!ShapeRedactor.instance) {
            ShapeRedactor.instance = new ShapeRedactor();
        }

        ShapeRedactor.canvas = canvas;
        ShapeRedactor.data = data;

        return ShapeRedactor.instance;
    }

    private constructor() {}

    run(): void {
        if (!ShapeRedactor.canvas) {
            console.log("Canvas отсутсвует");
            return;
        }
        ShapeRedactor.canvas.oncontextmenu = (e) => e.preventDefault();

        const shapes: IShape[] = ShapeRedactor.data.map((line: string) => ShapeRedactor.shapeController.getShape(line));
        const compound = new CompoundShape(shapes);
        compound.draw(ShapeRedactor.canvas);
        console.log(`${compound.getType()}: P=${compound.getPerimeter()}; S=${compound.getArea()}`);

        ShapeRedactor.canvas.onmousedown = ShapeRedactor.shapeController.onDrag.bind(ShapeRedactor, ShapeRedactor.canvas, compound);

        addEventListener("keydown", (event: KeyboardEvent) => {
            ShapeRedactor.shapeController.groupShape(ShapeRedactor.canvas, compound, event);
            ShapeRedactor.shapeController.ungroupShape(ShapeRedactor.canvas, compound, event);
        });

        compound.getChildren().map((item: IShape) => {
            console.log(`${item.getType()}: P=${item.getPerimeter()}; S=${item.getArea()}`);
        });
    }
}