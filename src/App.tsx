import React, {Component, RefObject} from 'react';
import {autobind} from "core-decorators";
import {IShape} from "./Shapes/interfaces/IShape";
import {ShapeController} from "./Shapes/ShapeController";
import './App.css';
import {fabric} from "fabric";
import {CompoundShape} from "./Shapes/CompoundShape";

@autobind
class App extends Component {
    private textareaRef: RefObject<HTMLTextAreaElement> = React.createRef();
    private shapeController = new ShapeController();

    getData(): void {
        let data = this.textareaRef.current!.value.split("\n");
        if (data[0] == "") {
            data = this.shapeController.getDefaultData();
        }
        let canvas: fabric.Canvas = new fabric.Canvas("canvas");

        const shapes: IShape[] = data.map((line: string) =>  this.shapeController.getShape(line));
        const compound = new CompoundShape(shapes);
        compound.draw(canvas);
        console.log(`${compound.getType()}: P=${compound.getPerimeter()}; S=${compound.getArea()}`);

        compound.getChildren().map((item: IShape) => {
            console.log(`${item.getType()}: P=${item.getPerimeter()}; S=${item.getArea()}`);
        });

        /*data.map((line: string) => {
            shape = new CompoundShape();

            shape = this.shapeController.getShape(shape, line);
            shape.draw(canvas);
            console.log(`${shape.getType()}: P=${shape.getPerimeter()}; S=${shape.getArea()}`);
        });*/
    }

    render() {
        return (
            <div className="App">
                <div>
                    <textarea ref={this.textareaRef} className={"area"}/>
                    <button onClick={this.getData} type={"button"} id={"button_show"} className={"btn btn-primary"}>SHOW</button>
                </div>
                <div className={"canvas_field"}>
                    <canvas width={"600"} height={"600"} id={"canvas"}/>
                </div>
            </div>
        );
    }
}

export default App;
