import React, {Component, RefObject} from "react";
import {autobind} from "core-decorators";
import {IShape} from "./Shapes/interfaces/IShape";
import {ShapeController} from "./Shapes/ShapeController";
import {CompoundShape} from "./Shapes/CompoundShape";
import "./App.css";

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

        const shapes: IShape[] = data.map((line: string) =>  this.shapeController.getShape(line));
        const compound = new CompoundShape(shapes);
        compound.draw(canvas);
        console.log(`${compound.getType()}: P=${compound.getPerimeter()}; S=${compound.getArea()}`);

        const elemLeft = canvas.offsetLeft, elemTop = canvas.offsetTop;
        let isSelect = false;
        canvas.onmousedown = (event) => {
            let xd = event.pageX - elemLeft, yd = event.pageY - elemTop;

            compound.getChildren().map((item: IShape) => {
                if (item.selected(xd, yd)) {
                    isSelect = true;
                    canvas.oncontextmenu = (e) => {
                        item.isSelected = !item.isSelected;
                        e.preventDefault();
                        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
                        compound.draw(canvas);
                    };

                    console.log(item);

                    canvas.onmousemove = (event) => {
                        if (isSelect) {
                            let x = event.pageX - elemLeft, y = event.pageY - elemTop;
                            canvas.oncontextmenu = (e) => {
                                item.isSelected = !item.isSelected;
                                e.preventDefault();
                            };
                            item.setNewPosition(x, y);
                            canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
                            compound.draw(canvas);
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    };

                    canvas.onmouseup = () => {
                        isSelect = false;
                    }
                }
            });
        };
        compound.getChildren().map((item: IShape) => {
            console.log(`${item.getType()}: P=${item.getPerimeter()}; S=${item.getArea()}`);
        });

        
    }

    render() {
        return (
            <div className="App">
                <div>
                    <textarea ref={this.textareaRef} className={"area"}/>
                    <button onClick={this.getData} type={"button"} id={"button_show"} className={"btn btn-primary"}>SHOW</button>
                </div>
                <div className={"canvas_field"}>
                    <canvas width={"600"} height={"600"} id={"canvas"} ref={this.canvasRef}/>
                </div>
            </div>
        );
    }
}

export default App;
