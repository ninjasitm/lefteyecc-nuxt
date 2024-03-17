<script
    setup
    lang="ts"
>
import Sugar from 'sugar';
import { useJsonHelper } from '~/composables/json-helper';
import { useApiHelper } from '~/composables/api-helper';
import VuePictureSwipe from 'vue3-picture-swipe';

const config = useRuntimeConfig();
const { parseProperties } = useJsonHelper();
const { getOne } = useApiHelper();

// Interface for state description
interface State {
    isLoading: boolean;
    showCurrentHeader: boolean;
    bannerItems: any[];
    config: any;
    photos: any[];
}

const state: State = reactive({
    isLoading: true,
    showCurrentHeader: true,
    bannerItems: [
        {
            image: 'https://cdn.lefteye.cc/malcolmpaul-me-lefteye-cc%2Fproduction%2Fimages%2Fhero-image.webp',
            title: 'Malcolm Paul',
            description: 'NITM Founder'
        }
    ],
    config: {
    },
    photos: computed((): any[] => {
        return state.config.photos.map((photo: any) => {
            return {
                src: config.public.cdnBase + photo.replace(/^\//gm, ''),
                thumbnail: config.public.cdnBase + photo.replace(/^\//gm, ''),
            }
        });
    })
});

/**
 * @url https://medium.com/@ValentinHervieu/how-i-used-google-photos-to-host-my-website-pictures-gallery-d49f037c8e3c
 */
// async function getAlbum(): Promise<string> {
//     const response: any = await fetch(`https://photos.app.goo.gl/TsXbFkXN5eHMCc3h6`);
//     console.log("Got album resposne", response);
//     return response.data;
// }

/**
 * Extract photos from the content
 * @param content
 * @returns array
 * @url https://medium.com/@ValentinHervieu/how-i-used-google-photos-to-host-my-website-pictures-gallery-d49f037c8e3c
 */
// function extractPhotos(content: string): any[] {
//     const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/pw\/[a-zA-Z0-9\-_]*)"/g // the only difference is the [ at the beginning
//   const links = new Set()
//   let match
//   while (match = regex.exec(content)) {
//     links.add(match[1])
//   }
//   return Array.from(links)
// }

// const fetchGooglePhotosAlbum = async () => {
//   const re = await GooglePhotosAlbum.fetchImageUrls('https://photos.app.goo.gl/QCXy6XaKX5x1AynH8');
//   console.log(JSON.stringify(re, null, 2));
// };

/**
 * Fetch the home page content through the API
 */
async function loadData(): Promise<void> {
    state.config = await getOne(`home/${config.public.homeId}`);
    parseProperties(state.config, ['titles', 'photos']);
    state.isLoading = false;
}

onMounted(async () => {
    setInterval(() => {
        state.showCurrentHeader = false;
        state.config.title = Sugar.Array.sample(state.config.titles || []);
        setTimeout(() => {
            state.showCurrentHeader = true;
        }, 1000);
    }, 2000);

    // state.photos = extractPhotos(await getAlbum());
    // fetchGooglePhotosAlbum();
    await loadData();
});

</script>
<template>
    <NuxtLoadingIndicator v-if="state.isLoading" />
    <template v-else>
        <header class="masthead">
            <div class="constrained container h-full mx-auto">
                <div class="grid grid-cols-[40%_60%] sm:grid-cols 1 h-full">
                    <div
                        class="flex my-auto items-end justify-start h-full"
                        style="z-index: 2"
                    >
                        <div class="header-content">
                            <h1 style="height: 56px">
                                <Transition name="slide-fade">
                                    <span v-if="state?.showCurrentHeader">{{ state.config.title }}!</span>
                                </Transition>
                            </h1>
                            <p
                                class="mt-6 text-sm mr-3 text-inherit"
                                v-html="state.config.description || 'Missing Description'"
                            ></p>
                        </div>
                    </div>
                    <div class="h-full my-auto banner-items-container">
                        <div
                            id="banner-items"
                            class="carousel slide"
                            data-ride="carousel"
                            data-pause="hover"
                        >
                            <div
                                id="banner-items-list"
                                class="carousel-inner"
                            >
                                <div
                                    v-for="({ image, title, description }, index) in state.bannerItems"
                                    class="carousel-item d-flex justify-content-center"
                                    :style="{
                                        backgroundImage: `url('${image}')`,
                                        backgroundSize: '100% auto'
                                    }"
                                >
                                    <div class="card banner-item flex column">
                                        <div class="card-body">
                                            <p class="card-text">
                                            <h5 class="card-title text-4xl">{{ title }}</h5>
                                            <p class="card-text">{{ description }}</p>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div
            v-if="state.photos.length"
            class="flex flex-col mt-6 constrained container mx-auto"
        >
            <h2 class="text-2xl">recent photos</h2>
            <vue-picture-swipe
                :items="state.photos"
                :options="{ loop: true, bgOpacity: 0.2 }"
                class="w-full h-full"
            ></vue-picture-swipe>
        </div>

    </template>
</template>
<style lang="scss">
.my-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));
    grid-auto-rows: 210px;

    img {
        max-height: 200px;
        object-fit: cover;
        width: 100%;
    }
}
</style>