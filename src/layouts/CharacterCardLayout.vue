<template>
    <div class="q-pa-md row">
        <div class="col" />
        <q-card bordered separator class="q-pa-md bg-grey-10 col-8">
            <q-card-section>
                <div class="text-h6 text-center text-yellow">
                    {{ character.name }}
                </div>
            </q-card-section>
            <q-tabs v-model="tab" class="text-teal">
                <q-tab label="Details" name="Details" />
                <q-tab label="Starships" name="Starships" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="Details">
                    <q-item
                        clickable
                        v-ripple
                        v-for="key in listables"
                        :key="key"
                    >
                        <q-item-section>
                            <q-item-label>{{
                                character[key]
                                    ? character[key].replace(/\w\S*/g, (w) =>
                                          w.replace(/^\w/, (c) =>
                                              c.toUpperCase()
                                          )
                                      )
                                    : null
                            }}</q-item-label>
                            <q-item-label caption>{{
                                key
                                    .replace(/\w\S*/g, (w) =>
                                        w.replace(/^\w/, (c) => c.toUpperCase())
                                    )
                                    .replaceAll('_', ' ')
                            }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-tab-panel>
                <q-tab-panel name="Starships" v-if="starships.length">
                    <q-card
                        v-for="ship in starships"
                        :key="ship.name"
                        class="row"
                    >
                        <q-item
                            clickable
                            v-ripple
                            v-for="key in Object.keys(ship).filter(
                                (key) =>
                                    typeof ship[key] === 'string' &&
                                    ['created', 'edited', 'url'].indexOf(
                                        key
                                    ) === -1
                            )"
                            :key="key"
                            class="col-4"
                        >
                            <q-item-section>
                                <q-item-label>{{
                                    ship[key]
                                        ? ship[key].replace(/\w\S*/g, (w) =>
                                              w.replace(/^\w/, (c) =>
                                                  c.toUpperCase()
                                              )
                                          )
                                        : null
                                }}</q-item-label>
                                <q-item-label caption>{{
                                    key
                                        .replace(/\w\S*/g, (w) =>
                                            w.replace(/^\w/, (c) =>
                                                c.toUpperCase()
                                            )
                                        )
                                        .replaceAll('_', ' ')
                                }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-card>
                </q-tab-panel>
                <q-tab-panel name="Starships" v-if="!starships.length">
                    <q-spinner-bars v-if="loading"></q-spinner-bars>
                    <a v-else>This Character has no Starships registered.</a>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
        <div class="col" />
    </div>
</template>

<script lang="ts">
import CharacterService from 'src/services/CharacterService';
import { defineComponent, ref, Ref } from 'vue';
import router from '../router/index';
import { Character } from 'src/models/Character';
import { Starship } from 'src/models/Starship';

export default defineComponent({
    name: 'CharacterCard',

    setup() {
        let character: Ref<Character> = ref({ name: '' });
        let starships: Ref<Array<Starship>> = ref([{}]);
        let loading = ref(false);

        let listables = [
            'height',
            'mass',
            'hair_color',
            'skin_color',
            'eye_color',
            'birth_year',
            'gender',
        ];
        let id = router().currentRoute.value.params.id;
        id = typeof id === 'string' ? id : id[0];

        CharacterService.getCharacterById(Number.parseInt(id)).then(
            async (res) => {
                character.value = res;
                loading.value = true;
                starships.value = await CharacterService.getStarships(
                    character.value
                );
                loading.value = false;
            }
        );

        return {
            character,
            listables,
            starships,
            loading,
            tab: ref('Details'),
        };
    },
});
</script>
