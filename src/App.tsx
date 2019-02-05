import React, {Component, RefObject} from 'react';
import {autobind} from "core-decorators";
import {IShape} from "./Shapes/interfaces/IShape";
import {Shape} from "./Shapes/Shape";
import {ShapeController} from "./Shapes/ShapeController";
import './App.css';

@autobind
class App extends Component {
    private textareaRef: RefObject<HTMLTextAreaElement> = React.createRef();
    private shapeController = new ShapeController();

    getData(): void {
        let data = this.textareaRef.current!.value.split("\n");
        if (data[0] == "") {
            data = this.shapeController.getDefaultData();
        }
        let shape: IShape = new Shape();
        let oldShape: IShape;

        data.map((line: string) => {
            shape = this.shapeController.getShape(shape, line);
            if (shape != oldShape) {
                console.log(`${shape.getType()}: P=${shape.getPerimeter()}; S=${shape.getArea()}`);
            }
            oldShape = shape
        });
    }
    
    render() {
        return (
            <div className="App">
               <textarea ref={this.textareaRef}/>
               <button onClick={this.getData}>click</button>
            </div>
        );
    }
}

export default App;
