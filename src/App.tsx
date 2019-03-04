import React, {Component, RefObject} from 'react';
import {autobind} from "core-decorators";
import {ShapeController} from "./ShapeRedactor/Shapes/ShapeController";
import {ShapeRedactor} from "./ShapeRedactor/ShapeRedactor";
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

        const instance: ShapeRedactor = ShapeRedactor.getInstance(canvas, data);
        instance.run();
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
