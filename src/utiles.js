export const raiz = "http://localhost:5000/";

export const checkError = (type,value) => {


    switch(type) {

        case 'email' :

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ) {
                
                return "Introduce un e-mail válido";
            }else{
                return "ok";
            };
            
        
        case 'name': 

            if (! /[a-z]/gi.test(value) ) {
                return "Introduce un nombre válido";
            }else{
                return "ok";
            };


       case "password":
            if (! /^([a-zA-Z0-9@*#.,]{8,15})$/.test(value)) {
                return "La contraseña debe tener al menos 8 caracteres y no más de 15 caracteres y los siguientes carácteres alfanuméricos a-zA-Z0-9@*#.,"
            } else {
                return "ok";
            }

        

        default:
            return "ok";
        

    }
};