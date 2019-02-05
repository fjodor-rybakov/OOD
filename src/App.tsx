import React, {Component, RefObject} from 'react';
import {autobind} from "core-decorators";
import {IShape} from "./IShape";
import {Shape} from "./Shape";
import './App.css';
import {Triangle} from "./Triangle";
import {Circle} from "./Circle";

@autobind
class App extends Component {
    private textareaRef: RefObject<HTMLTextAreaElement> = React.createRef();

    getData(): void {
        // console.log(this.textareaRef.current!.value.split("\n"));

        const data = this.textareaRef.current!.value.split("\n");

        let shape = new Shape(data);
        let triangle: IShape = new Triangle(shape);
        let circle: IShape = new Circle(triangle);

        console.log(circle.getData())
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
