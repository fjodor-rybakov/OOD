import React, {Component, RefObject} from 'react';
import {autobind} from "core-decorators";
import {IShape} from "./Shapes/interfaces/IShape";
import {ShapeController} from "./Shapes/ShapeController";
import {CompoundShape} from "./Shapes/CompoundShape";
import * as _ from "lodash";
import './App.css';
import {EShapeType} from "./Shapes/interfaces/EShapeType";

@autobind
class App extends Component {
    private textareaRef: RefObject<HTMLTextAreaElement> = React.createRef();
    private canvasRef: RefObject<HTMLCanvasElement> = React.createRef();
    private shapeController = new ShapeController();

    getData(): void {
        let data = this.textareaRef.current!.value.split("\n");
        if (data[0] == "") {
            data = this.shapeController.getDefaultData();
        }
        const canvas = this.canvasRef.current;
        if (!canvas) {
            return;
        }

        canvas.oncontextmenu = (e) => e.preventDefault();

        const shapes: IShape[] = data.map((line: string) => this.shapeController.getShape(line));
        const compound = new CompoundShape(shapes);
        compound.draw(canvas);
        console.log(`${compound.getType()}: P=${compound.getPerimeter()}; S=${compound.getArea()}`);

        const elemLeft = canvas.offsetLeft, elemTop = canvas.offsetTop;
        let isDrag = false;
        let selectedShapes: IShape[];
        let xd = 0, yd = 0, typeDown = 0, ox = 0, oy = 0;
        canvas.onmousedown = (event: MouseEvent) => {
            xd = ox = event.pageX - elemLeft;
            yd = oy = event.pageY - elemTop;
            typeDown = event.button;
            selectedShapes = [];

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

                if (item.isSelected) {
                    selectedShapes.push(item);
                }
            });

            if (selectedShapes.length >= 2) {
                canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
                const children = compound.getChildren();
                const newCompound = new CompoundShape(children);
                newCompound.draw(canvas);
            }
        };
        addEventListener("keydown", (event: KeyboardEvent) => {
            this.groupShape(event, canvas, compound, selectedShapes);
            this.ungroupShape(event, canvas, compound);
        });

        compound.getChildren().map((item: IShape) => {
            console.log(`${item.getType()}: P=${item.getPerimeter()}; S=${item.getArea()}`);
        });
    }

    private selectShape(canvas: HTMLCanvasElement, item: IShape, compound: IShape) {
        item.isSelected = !item.isSelected;
        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
        compound.draw(canvas);
    }

    private ungroupShape(event: KeyboardEvent, canvas: HTMLCanvasElement, compound: CompoundShape): void {
        if (event.key === "u") {
            compound.getChildren().map((spape) => {
                if (spape.getType() === EShapeType.COMPOUND && spape.isSelected) {
                    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
                    const currentCompound = spape as CompoundShape;
                    spape.isSelected = false;
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

    private groupShape(event: KeyboardEvent, canvas: HTMLCanvasElement, compound: CompoundShape, selectedShapes: IShape[]): void {
        if (event.key === "g" && selectedShapes.length !== 0) {
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

    render() {
        return (
            <div className="App">
                <div>
                    <textarea ref={this.textareaRef} className={"area"}/>
                    <button onClick={this.getData} type={"button"} id={"button_show"}
                            className={"btn btn-primary"}>SHOW
                    </button>
                </div>
                <div className={"canvas_field"}>
                    <canvas width={"600"} height={"600"} id={"canvas"} ref={this.canvasRef}/>
                </div>
            </div>
        );
    }
}

export default App;
