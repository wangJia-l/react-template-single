/**
 * @file Redux sync action creator
 * @author zhaoyadong
 */

/**
 * Create sync action creator
 *
 * @param {string} ACTION_NAME action name
 * @return {Function} sync action creator
 */
export default function createAction(ACTION_NAME) {
    return function (payload) {
        return {
            type: ACTION_NAME,
            payload,
        };
    };
}
