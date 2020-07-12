export interface IARow {
    [index: number]: IRow;
}
export interface IRow {
    section: string;
    view: boolean;
    edit: boolean;
    remove: boolean;
}
export interface ITRow {
    view: boolean;
    edit: boolean;
    remove: boolean;
}
