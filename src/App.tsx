import React, {Component, RefObject, ChangeEvent} from "react";
import {autobind} from "core-decorators";
import {ShapeController} from "./ShapeRedactor/Shapes/ShapeController";
import {ShapeRedactor} from "./ShapeRedactor/ShapeRedactor";
import {observer} from "mobx-react";
import {AppStore} from "./AppStore";
import {ColorResult, SketchPicker} from "react-color";
import {AddShapeCommand} from "./ShapeRedactor/Command/AddShapeCommand";
import "./App.css";

@observer
@autobind
class App extends Component {
    private textareaRef: RefObject<HTMLTextAreaElement> = React.createRef();
    private canvasRef: RefObject<HTMLCanvasElement> = React.createRef();
    private shapeController = new ShapeController();
    private store = new AppStore();

    private getData(): void {
        this.store.isShow = true;
        let shapesData = this.textareaRef.current!.value.split("\n");
        if (shapesData[0] == "") {
            shapesData = this.shapeController.getDefaultData();
        }
        const canvas = this.canvasRef.current;
        if (!canvas) {
            return;
        }

        const instance: ShapeRedactor = ShapeRedactor.getInstance(canvas, shapesData);
        instance.run();
        instance.setFillColor(this.store.fillColor);
        instance.setBorderColor(this.store.borderColor);
    }

    private setFillColor(event: ColorResult): void {
        this.store.fillColor = event.hex;
        const instance: ShapeRedactor = ShapeRedactor.getInstance();
        instance.setFillColor(event.hex);
    }

    private addShape(): void {
        const shapeCommand = new AddShapeCommand(this.store.newDataShape);
        shapeCommand.execute();
    }

    private setNewDataShape(event: ChangeEvent): void {
        const data = event.target as HTMLInputElement;
        this.store.newDataShape = data.value;
    }

    private setBorderSize(event: ChangeEvent): void {
        const data = event.target as HTMLInputElement;
        const value = +data.value;
        const instance: ShapeRedactor = ShapeRedactor.getInstance();
        instance.setBorderSize(value);
    }

    private setBorderColor(event: ColorResult): void {
        this.store.borderColor = event.hex;
        const instance: ShapeRedactor = ShapeRedactor.getInstance();
        instance.setBorderColor(this.store.borderColor);
    }

    private setDragState() {
        const instance: ShapeRedactor = ShapeRedactor.getInstance();
        instance.setDragState();
    }

    private setFillState() {
        const instance: ShapeRedactor = ShapeRedactor.getInstance();
        instance.setFillState();
    }

    render() {
        return (
            <div className="App">
                <div>
                    <textarea ref={this.textareaRef} className={"area"}/>
                    <button onClick={this.getData} type={"button"} id={"button_show"} className={"btn btn-primary"}>
                        SHOW
                    </button>
                </div>
                <div className={"canvas_field"}>
                    <canvas width={"600"} height={"600"} id={"canvas"} ref={this.canvasRef}/>
                </div>
                {
                    this.store.isShow &&
                    <div className={"panel"}>
                        <div className={"add_shape"}>
                            <h3>Add new shape</h3>
                            <button onClick={this.addShape}>Add shape</button>
                            <input value={this.store.newDataShape} onChange={this.setNewDataShape}/>
                        </div>
                        <div className={"change_color"}>
                            <h3>Fill color style</h3>
                            <SketchPicker color={this.store.fillColor} onChange={this.setFillColor}/>
                        </div>
                        <div className={"change_border_color"}>
                            <h3>Border color style</h3>
                            <SketchPicker color={this.store.borderColor} onChange={this.setBorderColor}/>
                        </div>
                        <div className={"change_border"}>
                            <h3>change border size</h3>
                            <input onChange={this.setBorderSize}/>
                        </div>
                        <div>
                            <h3>Change state</h3>
                            <button onClick={this.setDragState}>drag and drop</button>
                            <button onClick={this.setFillState}>fill</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default App;
