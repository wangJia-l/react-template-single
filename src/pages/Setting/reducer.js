import { SET_SETTINGS, RESET_SETTINGS } from './action';

const initialState = {
    darkSwitch: false,
    totalCount: 0,
    apis: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SETTINGS:
            return {
                ...state,
                ...action.payload,
            };
        case RESET_SETTINGS:
            return initialState;
        default:
            return state;
    }
}
