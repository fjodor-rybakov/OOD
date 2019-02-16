import React, {Component, RefObject} from 'react';
import {autobind} from "core-decorators";
import {IShape} from "./Shapes/interfaces/IShape";
import {ShapeController} from "./Shapes/ShapeController";
import './App.css';
import {DragCommand} from "./Shapes/DragCommand";

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
        let shape: IShape;

        data.map((line: string) => {
            shape = this.shapeController.getShape(shape, line);
            const dragCommand = new DragCommand(shape, this.canvasRef);
            dragCommand.execute();
            shape.draw(this.canvasRef);
            console.log(`${shape.getType()}: P=${shape.getPerimeter()}; S=${shape.getArea()}`);
        });
    }

    render() {
        return (
            <div className="App">
                <textarea ref={this.textareaRef}/>
                <button onClick={this.getData}>click</button>
                <div>
                    <canvas ref={this.canvasRef} className={"canvas"}/>
                </div>
            </div>
        );
    }
}

export default App;
