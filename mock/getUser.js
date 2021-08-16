export default {
    path: '/nxt_market/api_store/user',
    method: 'get',
    data: {
        'status': 200,
        'success': true,
        'message': {},
        'result': {
            'currentUser': {
                'userId': 12345,
                'userName': 'zhaoyadong',
            },
            'role': 'user',
            'auth': [
                'module1',
                'module2',
            ],
        },
    },
};