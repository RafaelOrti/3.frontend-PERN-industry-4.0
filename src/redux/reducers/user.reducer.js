import {REGISTER, LOGIN, LOGOUT, MODIFY_CREDENTIALS} from '../actions';

const initialState = {
    token: "",
    user: null
  };

const datosLoginReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO CREADO
        case REGISTER:
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token
        };
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case LOGIN:
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token
        };

        //BORRAMOS DATOS GUARDADOS DE USUARIO LOGUEADO Y DEJAMOS VALORES VACIOS
        case LOGOUT : 
            return initialState;
        //MODIFICAMOS LOS DATOS QUE TENEMOS GUARDADOS EN ESTE ESTADO CON LOS VALORES QUE METAMOS POR INPUT EN Perfil.js
        
        case MODIFY_CREDENTIALS :
            return {
                ...state,
                user: {
                    ...state.usuario,
                    [action.payload.field]: action.payload.field_value
                }
            };

        default :
            return state
    }
}

export default datosLoginReducer;