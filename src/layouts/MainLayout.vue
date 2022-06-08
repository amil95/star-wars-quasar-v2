<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar class="bg-black text-yellow">
                <q-toolbar-title> Star Wars App </q-toolbar-title>
                <q-tabs>
                    <q-route-tab
                        name="home"
                        label="home"
                        :to="{ path: '/', params: {} }"
                    />
                    <q-route-tab
                        name="characters"
                        label="Characters"
                        :to="{ name: 'characters', params: {} }"
                    >
                    </q-route-tab>
                </q-tabs>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'MainLayout',

    setup() {
        const leftDrawerOpen = ref(false);
        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
        };
    },
});
</script>
