export interface Users_List {
    ID: number,
    NAME: string
}

export interface User_Login {
    message: string;
    usuario: {
        ID: number,
        NOMBRE: string,
        CEDULA: string,
        CONTACTO: string,
        ISVALID: string
    }[];
}