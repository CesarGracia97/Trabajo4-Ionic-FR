export interface Contact {
    status: number,
    message: string,
    contactos: {
        ID: number
        NOMBRE: number, 
        TELEFONO: string, 
        CORREO: string, 
        CEDULA: string, 
        ISVALID: string,
        editando: boolean
    }[]
}

export interface Users_List {
    status: number,
    message: string,
    usuarios:{
        ID: number,
        NOMBRE: string
    }[]
}

export interface User{
    ID: number,
    CORREO: string,
    NOMBRE: string,
    CEDULA: number,
    CONTACTO: number
}

export interface Login {
    message: string;
    ID: number
}