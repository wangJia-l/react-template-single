import { post } from 'src/common/request';

export function setSettings(params) {
    const path = '/setSettings';
    return post(
        path,
        params
    );
}
