import {Command} from "./Command";
import {IShape} from "./interfaces/IShape";

export class DragCommand extends Command {
    constructor(subject: IShape[], canvas: HTMLCanvasElement) {
        super(subject, canvas);
    }

    execute(): boolean {
        return false;
    }
}