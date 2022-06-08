import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Index.vue') },
            {
                path: 'characters',
                name: 'characters',
                component: () => import('layouts/CharacterTableLayout.vue'),
            },
            {
                path: 'character/:id',
                name: 'character',
                component: () => import('layouts/CharacterCardLayout.vue'),
            },
        ],
    },

    {
        path: '/:catchAll(.*)*',
        name: 'teste',
        component: () => import('pages/Error404.vue'),
    },
];

export default routes;
