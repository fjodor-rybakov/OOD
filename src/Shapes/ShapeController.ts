import {IShape} from "./interfaces/IShape";
import {Triangle} from "./Triangle";
import {Rectangle} from "./Rectangle";
import {Circle} from "./Circle";
import {CompoundShape} from "./CompoundShape";
import {EShapeType} from "./interfaces/EShapeType";
import * as _ from "lodash";

export class ShapeController {
    private defaultData = [
        "TRIANGLE: P1=100,100; P2=100,220; P3=220, 220",
        "RECTANGLE: P1=440,440; P2=560,320",
        "RECTANGLE: P1=440,440; P2=560,320",
        "CIRCLE: C=300,270; R=50"
    ];

    getDefaultData(): string[] {
        return this.defaultData;
    }

    getShape(line: string): IShape {
        const partOfData: string[] = line.split(":");
        let type: string = partOfData[0];

        switch (type) {
            case EShapeType.TRIANGLE: {
                return new Triangle(partOfData[1]);
            }

            case EShapeType.RECTANGLE: {
                return new Rectangle(partOfData[1]);
            }

            case EShapeType.CIRCLE: {
                return new Circle(partOfData[1]);
            }

            default: {
                return new CompoundShape([]);
            }
        }
    }

    onDrag(canvas: HTMLCanvasElement, compound: CompoundShape, event: MouseEvent) {
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
                        compound.draw(canvas);
                    }
                };

                canvas.onmouseup = () => {
                    isDrag = false;
                };
            }
        });
    }

    private selectShape(canvas: HTMLCanvasElement, item: IShape, compound: IShape) {
        item.isSelected = !item.isSelected;
        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
        compound.draw(canvas);
    }

    groupShape(canvas: HTMLCanvasElement, compound: CompoundShape, event: KeyboardEvent): void {
        const selectedShapes = compound.getChildren().filter(item => item.isSelected);
        if (event.key === "g" && selectedShapes.length !== 0 && selectedShapes.length >= 2) {
            canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
            const newShapes = _.remove(compound.getChildren(), item => {
                item.isSelected = false;
                return !_.includes(selectedShapes, item)
            });

            const newCompound = new CompoundShape(selectedShapes);
            newShapes.push(newCompound);

            compound.setChildren(newShapes);
            newCompound.isSelected = true;
            compound.draw(canvas);

            event.preventDefault();
            event.stopPropagation();
        }
    }

    ungroupShape(canvas: HTMLCanvasElement, compound: CompoundShape, event: KeyboardEvent): void {
        if (event.key === "u") {
            compound.getChildren().map((shape) => {
                if (shape.getType() === EShapeType.COMPOUND && shape.isSelected) {
                    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
                    const currentCompound = shape as CompoundShape;
                    shape.isSelected = false;
                    currentCompound.getChildren().map((currentCompShape) => {
                        currentCompShape.isSelected = true;
                        compound.addChild(currentCompShape);
                    });
                    _.remove(compound.getChildren(), currentCompound);
                    compound.draw(canvas);

                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        }
    }
}