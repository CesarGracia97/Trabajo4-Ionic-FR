export interface Users_List {
    ID: number,
    NAME: string
}

export interface User_Login {
    message: string;
    usuario:{
        id: number,
        correo: string,
        nombre: string,
        cedula: number,
        contacto: number
    }
}