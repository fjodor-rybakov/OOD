import React, {Component, RefObject} from 'react';
import {autobind} from "core-decorators";
import {IShape} from "./Shapes/interfaces/IShape";
import {ShapeController} from "./Shapes/ShapeController";
import {CompoundShape} from "./Shapes/CompoundShape";
import * as _ from "lodash";
import './App.css';

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
                if (item.selected(xd, yd)) {
                    isDrag = true;

                    this.selectShape(canvas, typeDown, item, compound);
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
                    }
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
            if (event.ctrlKey) {
                canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
                const newShapes = compound.getChildren().filter((item: IShape) => {
                    return !_.includes(selectedShapes, item);
                });
                const newCompound = new CompoundShape(selectedShapes);
                newShapes.push(newCompound);
                compound.setChildren(newShapes);
                console.log(compound.getChildren());
                compound.draw(canvas);
            }
        });
        compound.getChildren().map((item: IShape) => {
            console.log(`${item.getType()}: P=${item.getPerimeter()}; S=${item.getArea()}`);
        });
    }

    private selectShape(canvas: HTMLCanvasElement, typeDown: number, item: IShape, compound: IShape) {
        if (typeDown === 2) {
            item.isSelected = !item.isSelected;
            canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
            compound.draw(canvas);
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
