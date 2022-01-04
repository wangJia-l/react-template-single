import { post } from 'src/common/request';

export function getSpaceDiagram(params) {
    const path = '/analysis/eventdrilling/eventFlow';

    return post(
        path,
        params
    );
}