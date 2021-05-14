import { Duplex } from "stream"

export interface Callable {
    (value: any, logger: Duplex): Boolean
}

export interface IProperty {
    key: string;
    alias: string;
    name: string;
    value: string | undefined;
    requiered: Boolean;
    validators: Array<Callable>;
}
