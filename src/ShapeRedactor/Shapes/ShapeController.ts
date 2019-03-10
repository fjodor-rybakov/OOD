import {IShape} from "./interfaces/IShape";
import {Triangle} from "./Triangle/Triangle";
import {Rectangle} from "./Rectangle/Rectangle";
import {Circle} from "./Circle/Circle";
import {Compound} from "./Compound/Compound";
import {EShapeType} from "./interfaces/EShapeType";
import * as _ from "lodash";
import {autobind} from "core-decorators";

@autobind
export class ShapeController {
    private defaultData = [
        "TRIANGLE: P1=100,100; P2=100,220; P3=220, 220",
        "RECTANGLE: P1=440,440; P2=560,320",
        "RECTANGLE: P1=440,440; P2=560,320",
        "CIRCLE: C=300,270; R=50"
    ];

    public getDefaultData(): string[] {
        return this.defaultData;
    }

    public getShape(line: string, canvas: HTMLCanvasElement): IShape {
        const partOfData: string[] = line.split(":");
        let type: string = partOfData[0];

        switch (type) {
            case EShapeType.TRIANGLE: {
                return new Triangle(partOfData[1], canvas);
            }

            case EShapeType.RECTANGLE: {
                return new Rectangle(partOfData[1], canvas);
            }

            case EShapeType.CIRCLE: {
                return new Circle(partOfData[1], canvas);
            }

            default: {
                return new Compound([], canvas);
            }
        }
    }

    public groupShape(canvas: HTMLCanvasElement, compound: Compound, event: KeyboardEvent): void {
        const selectedShapes = compound.getChildren().filter(item => item.isSelected);
        if (event.key === "g" && selectedShapes.length !== 0 && selectedShapes.length >= 2) {
            canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
            const newShapes: IShape[] = _.remove(compound.getChildren(), item => {
                item.isSelected = false;
                return !_.includes(selectedShapes, item)
            });

            const newCompound = new Compound(selectedShapes, canvas);
            newShapes.push(newCompound);

            compound.setChildren(newShapes);
            newCompound.isSelected = true;
            compound.draw();

            event.preventDefault();
            event.stopPropagation();
        }
    }

    public ungroupShape(canvas: HTMLCanvasElement, compound: Compound, event: KeyboardEvent): void {
        if (event.key === "u") {
            compound.getChildren().map((shape) => {
                if (shape.getType() === EShapeType.COMPOUND && shape.isSelected) {
                    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
                    const currentCompound = shape as Compound;
                    shape.isSelected = false;
                    currentCompound.getChildren().map((currentCompShape) => {
                        currentCompShape.isSelected = true;
                        compound.addChild(currentCompShape);
                    });
                    _.remove(compound.getChildren(), currentCompound);
                    compound.draw();

                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        }
    }
}