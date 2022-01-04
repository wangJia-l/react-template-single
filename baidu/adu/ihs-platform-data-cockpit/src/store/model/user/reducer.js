import {
    RECEIVE_USER,
} from './action';

export default function (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.payload;
        default:
            return state;
    }
}
