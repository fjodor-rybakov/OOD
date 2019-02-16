import {IShape} from "./interfaces/IShape";
import {Triangle} from "./Triangle";
import {Rectangle} from "./Rectangle";
import {Circle} from "./Circle";

export class ShapeController {
    private defaultData = [
        "TRIANGLE: P1=100,100; P2=200,200; P3=200, 100",
        "RECTANGLE: P1=40,40; P2=60,60",
        "CIRCLE: C=100,100; R=50"
    ];

    getDefaultData(): string[] {
        return this.defaultData;
    }

    getShape(shape: IShape, line: string): IShape {
        const partOfData: string[] = line.split(":");
        let type: string = partOfData[0];

        switch (type) {
            case "TRIANGLE": {
                shape = new Triangle(partOfData[1]);
                break;
            }

            case "RECTANGLE": {
                shape = new Rectangle(partOfData[1]);
                break;
            }

            case "CIRCLE": {
                shape = new Circle(partOfData[1]);
                break;
            }
        }

        return shape;
    }
}