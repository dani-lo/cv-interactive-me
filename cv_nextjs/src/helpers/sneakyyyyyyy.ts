export interface Aaa {
    foo: (x: number) => string;
    bar: string;
}

export interface Bbbb extends Aaa {
    foo: (x: number | string) => string;
    bar: string;
    joo: boolean;
}

export interface Ccc {
    foo: number | string;
    bar: string;
}

export interface Ddd extends Ccc {
    foo: number;
    bar: string;
    joo: boolean;
}

