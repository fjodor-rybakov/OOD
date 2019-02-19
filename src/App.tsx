import React, {Component, RefObject} from 'react';
import {autobind} from "core-decorators";
import {IShape} from "./Shapes/interfaces/IShape";
import {ShapeController} from "./Shapes/ShapeController";
import './App.css';
import {CompoundShape} from "./Shapes/CompoundShape";

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
