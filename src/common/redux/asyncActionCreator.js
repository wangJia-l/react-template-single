import _ from 'lodash';

/**
 * Create async action creator
 *
 * @param {Function} options.api api fetch function
 * @param {string} options.REQUEST_ACTION_NAME request action name
 * @param {string} options.RECEIVESUCCESS_ACTION_NAME receive success action name
 * @param {Array} options.RECEIVESUCCESS_ACTION_NAME_LIST list of receive success actions
 * @param {string} options.RECEIVEFAIL_ACTION_NAME receive fail action name
 * @param {Function} options.baseParamsGetter base params getter
 * @param {Function} paramsTransformer params transformer
 * @param {Function} responseTransformer response transformer
 * @return {Function} async action creator
 */
function createAsyncAction({
    api,
    REQUEST_ACTION_NAME = '',
    RECEIVESUCCESS_ACTION_NAME = '',
    RECEIVESUCCESS_ACTION_NAME_LIST = [],
    RECEIVEFAIL_ACTION_NAME = '',
    baseParamsGetter = function () {
        return {};
    },
    paramsTransformer = function (params) {
        return params;
    },
    responseTransformer = function (data) {
        return data;
    },
}) {
    return function (params) {
        return function (dispatch, getState) {
            const baseParams = baseParamsGetter(getState());

            // Using recursively merge instead of Object.assign
            const reqParams = _.merge({}, baseParams, paramsTransformer(params));

            // Dispatch unified global REQUEST action
            dispatch({
                type: 'FETCH_DATA_REQUEST',
                payload: reqParams,
            });

            if (REQUEST_ACTION_NAME) {
                dispatch({
                    type: REQUEST_ACTION_NAME,
                    payload: reqParams,
                });
            }

            return api(reqParams).then(async data => {
                const transforming = responseTransformer(data, params);

                const resData = transforming && transforming.then
                    ? await transforming
                    : transforming;

                // Dispatch unified global RECEIVE_SUCCESS action
                dispatch({
                    type: 'FETCH_DATA_SUCCESS',
                    payload: {
                        params: reqParams,
                        data: resData,
                    },
                });

                if (RECEIVESUCCESS_ACTION_NAME) {
                    dispatch({
                        type: RECEIVESUCCESS_ACTION_NAME,
                        payload: resData,
                    });
                }

                RECEIVESUCCESS_ACTION_NAME_LIST.forEach(actionName => {
                    dispatch({
                        type: actionName,
                        payload: resData,
                    });
                });

                return resData;
            }, err => {
                // Dispatch unified global RECEIVE_FAIL action
                dispatch({
                    type: 'FETCH_DATA_FAIL',
                    payload: {
                        params: reqParams,
                        error: err,
                    },
                });

                if (RECEIVEFAIL_ACTION_NAME) {
                    dispatch({
                        type: RECEIVEFAIL_ACTION_NAME,
                        payload: {
                            params: reqParams,
                            error: err,
                        },
                    });
                }

                return Promise.reject(err);
            });
        };
    };
}

export default createAsyncAction;

/**
 * Convenience wrapper for createAsyncAction
 *
 * @param {Array|Object} args arguments
 * @return {Function} async action creator
 */
export function createBEAsyncAction(...args) {
    const params = _.isPlainObject(args[0])
        ? args[0]
        : {
            api: args[0],
            RECEIVESUCCESS_ACTION_NAME: args[1],
            responseTransformer: args[2],
            baseParamsGetter: args[3],
        };

    const {
        api,
        REQUEST_ACTION_NAME = '',
        RECEIVESUCCESS_ACTION_NAME = '',
        RECEIVESUCCESS_ACTION_NAME_LIST = [],
        RECEIVEFAIL_ACTION_NAME = '',
        baseParamsGetter = function () {
            return {};
        },
        paramsTransformer = function (params) {
            return params;
        },
        responseTransformer = function (data) {
            return data;
        },
    } = params;

    return createAsyncAction({
        api,
        REQUEST_ACTION_NAME,
        RECEIVESUCCESS_ACTION_NAME,
        RECEIVESUCCESS_ACTION_NAME_LIST,
        RECEIVEFAIL_ACTION_NAME,
        baseParamsGetter(store) {
            return _.merge(
                {
                    ...baseParamsGetter(store),
                }
            );
        },
        paramsTransformer,
        responseTransformer,
    });
}
