<template>
    <div class="row">
        <div class="col" />
        <q-table
            grid
            :loading="loading"
            :rows="Characters"
            v-model:pagination="pagination"
            @request="onRequest"
            :rows-per-page-options="[10]"
            :columns="columns"
        >
            <template v-slot:item="props">
                <div class="q-pa-xs col-4">
                    <q-card
                        @click="goCharacter(props.row.url.split('/')[5])"
                        dark
                    >
                        <q-card-section class="text-center text-yellow">
                            <strong>{{ props.row.name }}</strong>
                        </q-card-section>
                        <q-separator />
                        <q-card-section class="flex flex-center">
                            <img :src="props.row.image" height="100" />
                        </q-card-section>
                    </q-card>
                </div>
            </template>
        </q-table>
        <div class="col" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import CharacterService from '../services/CharacterService';
import { Character } from '../models/Character';
import router from '../router/index';

export default defineComponent({
    name: 'CharacterTable',

    setup() {
        let Characters: Ref<Character[]> = ref([]);
        let pagination = ref({
            page: 1,
            rowsPerPage: 10,
            rowsNumber: 0,
        });
        let loading = ref(true);
        const columns = [
            { name: 'image', label: 'Image', field: 'image', align: 'left' },
            { name: 'name', label: 'Name', field: 'name', align: 'left' },
        ];

        function getPage(page: number) {
            CharacterService.getCharactersByPage(page).then((res) => {
                Characters.value = res.characters;
                pagination.value.rowsNumber = res.total;
                loading.value = false;
                getPictures();
            });
        }

        function goCharacter(charName: string) {
            void router().push({ path: '/character/' + charName });
        }

        function getPictures() {
            Characters.value.forEach(async (char) => {
                char.image = await CharacterService.getPicture(char.name);
            });
        }

        function onRequest(props: { pagination: { page: number } }) {
            const newPage = props.pagination.page;
            loading.value = true;
            pagination.value.page = newPage;
            getPage(newPage);
        }

        getPage(1);
        return {
            columns,
            Characters,
            pagination,
            onRequest,
            loading,
            goCharacter,
            getPictures,
        };
    },
});
</script>
