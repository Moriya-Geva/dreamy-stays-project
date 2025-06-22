import { produce } from 'immer';
import { initialState } from './state'; 

const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            state.token = action.payload;
            break;
   
    }
}, initialState);

export default reducer;
