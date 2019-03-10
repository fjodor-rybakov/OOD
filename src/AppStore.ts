import {observable} from "mobx";
import {autobind} from "core-decorators";

@autobind
export class AppStore {
    @observable private _isShow = false;
    @observable private _newDataShape = "";
    @observable private _fillColor = "#000000";
    @observable private _borderSize = 1;
    @observable private _borderColor = "black";

    get newDataShape(): string {
        return this._newDataShape;
    }

    set newDataShape(value: string) {
        this._newDataShape = value;
    }

    get isShow(): boolean {
        return this._isShow;
    }

    set isShow(value: boolean) {
        this._isShow = value;
    }

    get fillColor(): string {
        return this._fillColor;
    }

    set fillColor(value: string) {
        this._fillColor = value;
    }

    get borderSize(): number {
        return this._borderSize;
    }

    set borderSize(value: number) {
        this._borderSize = value;
    }

    get borderColor(): string {
        return this._borderColor;
    }

    set borderColor(value: string) {
        this._borderColor = value;
    }
}