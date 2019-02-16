import {IShape} from "./interfaces/IShape";
import * as React from "react";

export abstract class Command {
    public subject: IShape;
    public canvas: React.RefObject<HTMLCanvasElement>;

    protected constructor(subject: IShape, canvas: React.RefObject<HTMLCanvasElement>) {
        this.subject = subject;
        this.canvas = canvas;
    }

    abstract execute(): boolean;
}