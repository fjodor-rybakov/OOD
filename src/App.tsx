import React, {Component, RefObject} from 'react';
import {autobind} from "core-decorators";
import {IShape} from "./Shapes/interfaces/IShape";
import {Shape} from "./Shapes/Shape";
import './App.css';
import {Triangle} from "./Shapes/Triangle";
import {Circle} from "./Shapes/Circle";
import {Rectangle} from "./Shapes/Rectangle";

@autobind
class App extends Component {
    private textareaRef: RefObject<HTMLTextAreaElement> = React.createRef();

    getData(): void {
        const data: string[] = this.textareaRef.current!.value.split("\n");
        let shape: IShape = new Shape();

        data.map((line: string) => {
            const partOfData: string[] = line.split(":");
            let type: string = partOfData[0];

            switch (type) {
                case "TRIANGLE": {
                    shape = new Triangle(shape, partOfData[1]);
                    break;
                }

                case "RECTANGLE": {
                    shape = new Rectangle(shape, partOfData[1]);
                    break;
                }

                case "CIRCLE": {
                    shape = new Circle(shape, partOfData[1]);
                    break;
                }
            }

            console.log(`${type} area:`, shape.getArea());
            console.log(`${type} perimeter`, shape.getPerimeter());
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
