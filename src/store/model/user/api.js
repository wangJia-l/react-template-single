/**
 * @file user api
 * @author zhaoyadong
 */

import {
    get,
} from 'src/common/request';

import queryString from 'query-string';

export function getUser() {
    const path = '/nxt_market/api_store/user';

    const search = queryString.parse(location.search);

    const data = {};
    if (search.castk) {
        data.castk = search.castk;
    }

    return get(
        path,
        data
    );
}
