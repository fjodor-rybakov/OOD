import {IShape} from "./interfaces/IShape";

export abstract class Command {
    public subject: IShape;
    public canvas: HTMLCanvasElement;

    protected constructor(subject: IShape, canvas: HTMLCanvasElement) {
        this.subject = subject;
        this.canvas = canvas;
    }

    abstract execute(): boolean;
}