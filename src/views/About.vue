<template>
    <section class="py-[120px]">
        <div class="container mx-auto">
            <button class="inline-block px-6 py-3 bg-purple-600 text-white font-medium text-xs uppercase rounded-full hover:bg-purple-500 transition duration-300 ease-in-out mb-10" @click="createRoute">
                Создать маршрут
            </button>
            <yandex-map
                :settings="settings"
                :coords="options.coords"
                :zoom="options.zoom"
                :controls="options.controls"
                ref="map"
                @map-was-initialized="init"
            >
            <!--  -->
            </yandex-map>
        </div>
    </section>
</template>

<script>
import { yandexMap, loadYmap } from 'vue-yandex-maps'

export default {
    components: { yandexMap },
    data() {
        return {
            map: null,
            route: {
                done: false,
                // userLocation: this.userLocation,
                length: null,
                time: null,
                warning: null,
            },
            settings: {
                apiKey: '8c4059db-3b8d-4535-a15e-569ee80fc827',
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1'
            },
            options: {
                coords: [55.75554289958026, 37.619346417968764],
                zoom: 7,
                controls: [],
            }
        }
    },
    methods: {
        async init(map) {
            this.map = map;
        },
        async getMyLocation() {
        await loadYmap();
            const geolocation = ymaps.geolocation;
            const result = await geolocation.get({
                provider: 'yandex',
                mapStateAutoApply: true
            });
            return result.geoObjects.position
        },
        async createRoute() {
            await loadYmap()
            const multiRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints: [
                    await this.getMyLocation(),
                    [55.75554289958026, 37.619346417968764]
                ],
            }, {
                boundsAutoApply: true
            });
            this.map.geoObjects.add(multiRoute);
        },
    }
}
</script>

<style scoped>
.ymap-container{
    height: 600px;
    width: 100%;
}
</style>