/**
 * @file Describe the file
 */
import Home from '../views/Home';
import Search from '../views/Search';
import Management from '../views/Management';
import serviceArea from '../views/Management/serviceArea';
import tollGate from '../views/Management/tollGate';
import maintenance from '../views/Management/maintenance';
import overload from '../views/Management/overload';
import DeviceView from '../views/DeviceView';
import DeviceEdit from '../views/DeviceEdit';

import Statistical from '../views/Statistical';
import fault from '../views/Statistical/fault';
import repair from '../views/Statistical/repair';
import reminder from '../views/Statistical/reminder';
import scrap from '../views/Statistical/scrap';

export const constantRouterMap = [
    {
        path: '/',
        name: 'Home',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
    },
    {
        path: '/management',
        name: 'management',
        redirect: 'serviceArea',
        component: Management,
        children: [
            {
                path: '/serviceArea',
                name: 'serviceArea',
                component: serviceArea,
                // redirect: 'serviceArea'
                // hidden: true
            },
            // Toll Gate
            {
                path: '/tollGate',
                name: 'tollGate',
                component: tollGate,
            },
            // Maintenance
            {
                path: '/maintenance',
                name: 'maintenance',
                component: maintenance,
            },
            {
                path: '/overload',
                name: 'overload',
                component: overload,
            },
        ],
    },
    {
        path: '/statistical',
        name: 'Statistical',
        component: Statistical,
        redirect: 'fault',
        children: [
            {
                path: '/fault',
                name: 'fault',
                component: fault,
            },
            {
                path: '/repair',
                name: 'repair',
                component: repair,
            },
            {
                path: '/reminder',
                name: 'reminder',
                component: reminder,
            },
            {
                path: '/scrap',
                name: 'scrap',
                component: scrap,
            },
        ],
    },
    {
        path: '/deviceView',
        name: 'DeviceView',
        component: DeviceView,
    },
    {
        path: '/deviceEdit',
        name: 'DeviceEdit',
        component: DeviceEdit,
    },
];
