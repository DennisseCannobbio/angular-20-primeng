export interface ResponseError {
    mensaje?: string;
    detalle?: string;
}

export interface ResponseData<T> extends ResponseError {
    data: T;
}

export interface ResponseDataList<T> extends ResponseError {
    data: T[];
    meta: Meta;
    links?: any;
}

export interface Meta {
    totalRegistros: number;
    paginaActual: number;
    registrosPorPagina: number;
    totalPaginas: number;
}
