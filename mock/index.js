import Mock from 'mockjs';
import getUser from './getUser';
import getList from './getList';
import getSlides from './getSlides';

const mocks = [
    getUser,
    getList,
    getSlides,
];

mocks.forEach(mock => {
    Mock.mock(mock.path, mock.method, mock.data);
});

export default Mock;