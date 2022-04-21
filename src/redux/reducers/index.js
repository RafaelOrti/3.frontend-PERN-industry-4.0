import {combineReducers} from 'redux';

import user from './user.reducer';
import hideFooter from './hideFooter.reducer';

const rootReducer = combineReducers({
    user,
    hideFooter

});

export default rootReducer;