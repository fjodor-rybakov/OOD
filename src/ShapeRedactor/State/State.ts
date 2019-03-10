import {Compound} from "../Shapes/Compound/Compound";
import {ShapeRedactor} from "../ShapeRedactor";

abstract class State {
    protected readonly canvas: HTMLCanvasElement;
    protected readonly compound: Compound;
    protected readonly context: ShapeRedactor;

    protected constructor(context: ShapeRedactor, canvas: HTMLCanvasElement, compound: Compound) {
        this.canvas = canvas;
        this.compound = compound;
        this.context = context;
    }

    abstract drag(event: MouseEvent): void;
    abstract fill(color: string, event: MouseEvent): void;
}

export {State}
