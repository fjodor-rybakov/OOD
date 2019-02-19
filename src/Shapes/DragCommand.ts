import {Command} from "./Command";
import {IShape} from "./interfaces/IShape";
import * as React from "react";

export class DragCommand extends Command {
    constructor(subject: IShape, canvas: HTMLCanvasElement) {
        super(subject, canvas);
    }

    execute(): boolean {
        return false;
    }
}