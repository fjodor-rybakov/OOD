import {IShape} from "./interfaces/IShape";
import {Triangle} from "./Triangle";
import {Rectangle} from "./Rectangle";
import {Circle} from "./Circle";
import {CompoundShape} from "./CompoundShape";
import {EShapeType} from "./interfaces/EShapeType";

export class ShapeController {
    private defaultData = [
        "TRIANGLE: P1=100,100; P2=100,220; P3=220, 220",
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
}