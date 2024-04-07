<script
    setup
    lang="ts"
>
import Sugar from 'sugar';
import { useJsonHelper } from '~/composables/json-helper';
import { useApiHelper } from '~/composables/api-helper';
import useModalHelper from "~/composables/modal-helper";
import { useContentHelper } from '~/composables/content-helper';
import HeartIcon from "~icons/mdi/heart";
import LostIcon from "~icons/mdi/chart-bubble";
import TimeIcon from "~icons/mdi/timer-sand";
import ChevronRight from "~icons/mdi/chevron-right";
import PostCard from "~/components/PostCard.vue";
// import VuePictureSwipe from 'vue3-picture-swipe';


const config = useRuntimeConfig();
const { parseProperties } = useJsonHelper();
const { getOne, getAll } = useApiHelper();
const { getMediaUrl } = useContentHelper();
const { showImageModal, closeModal, homePhotos, homePhotoImage } = useModalHelper({
    modalRef: 'homePhotos',
    imageRef: 'homePhotoImage'
});

// Interface for state description
interface State {
    isLoading: boolean;
    showCurrentHeader: boolean;
    bannerItems: any[];
    config: any;
    photos: any[];
    photosChunked: any[];
    currentPhoto?: any;
    posts?: any;
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
        return state.config.photos?.map((photo: any) => {
            const url = (photo instanceof Object ? photo.url || photo.value || photo.photos : photo) || '';
            return Object.assign(photo instanceof Object ? photo : {}, {
                src: getMediaUrl(u.l),
                thumbnail: getMediaUrl(u.l),
            });
        });
    }),
    photosChunked: computed((): any[] => {
        return Sugar.Array.inGroups(state.photos, 3);
    }),
    currentPhoto: null
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
async function onGetPosts(): Promise<void> {
    state.posts = await getAll(`posts`, { limit: 3 });
}

/**
 * Fetch the home page content through the API
 */
async function loadData(): Promise<void> {
    state.config = await getOne(`pageHome/${config.public.homeId}`);
    parseProperties(state.config, ['titles', 'photos', 'lifeSoFar', 'lostIn', 'loverOf']);
    state.isLoading = false;
}

/**
 * Show the image modal
 * @param image
 * @returns void
 */
function onShowImageModal(image: any) {
    state.currentPhoto = image;
    showImageModal(image.src);
}

/**
 * Close the modal
 */
function onCloseModal() {
    closeModal();
    state.currentPhoto = null;
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
    await onGetPosts();
});

</script>
<template>
    <NuxtLoadingIndicator v-if="state.isLoading" />
    <template v-else>
        <div class="order-first flex flex-col w-full align-center justify-center my-8 visible lg:hidden text-center">

            <h1
                style="height: 56px"
                class="text-5xl leading-9"
            >
                <Transition name="slide-fade">
                    <span v-if="state?.showCurrentHeader">{{ state.config.title.value || state.config.title }}!</span>
                </Transition>
            </h1>
        </div>
        <header class="masthead z-1 flex">
            <div class="constrained container lg:h-full mx-auto px-[0px_!important] lg:px-[30px]">
                <div class="grid lg:grid-cols-[40%_60%] sm:grid-cols-1 lg:h-full">
                    <div
                        class="flex items-end justify-start py-[30px] lg:h-full order-last lg:order-first bg-[#091a28] lg:bg-[transparent]"
                        style="z-index: 2"
                    >
                        <div class="header-content lg:mt-[initial] lg:mb-[100px] grow">
                            <h1
                                style="height: 56px"
                                class="text-5xl leading-9 invisible lg:visible h-0 lg:h-[56px] hidden lg:block"
                            >
                                <Transition name="slide-fade">
                                    <span v-if="state?.showCurrentHeader">{{ state.config.title.value || state.config.title }}!</span>
                                </Transition>
                            </h1>
                            <p
                                class="mt-6 text-3xl lg:text-sm mr-3 text-inherit px-6 lg:px-[initial]"
                                v-html="state.config.description || 'Missing Description'"
                            ></p>
                        </div>
                    </div>
                    <div class="lg:h-full my-auto banner-items-container order-first lg:order-last">
                        <div
                            id="banner-items"
                            class="carousel slide"
                            data-ride="carousel"
                            data-pause="hover"
                        >

                            <div
                                id="banner-items-list"
                                class="carousel-inner h-[400px] lg:h-[500px]"
                            >
                                <div
                                    v-for="({ image, title, description }, index) in state.bannerItems"
                                    class="carousel-item d-flex justify-content-center"
                                    :style="{
        backgroundImage: `url('${image}')`,
        backgroundSize: '100% auto'
    }"
                                >
                                    <div class="card banner-item flex column lg:ml-6">
                                        <div class="card-body">
                                            <p class="card-text px-6 lg:px-[initial] mb-6 lg:mb-[initial]">
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
            v-if="state.config.body"
            class="constrained container mx-auto lg:px-0 sm:px-6 z-[1] mt-8"
        >
            <h1 class="text-2xl">about</h1>
            <p v-html="state.config.body || 'Missing Body'"></p>
        </div>
        <div
            v-if="state.config.lifeSoFar || state.config.loverOf || state.config.lostIn"
            class="constrained container mx-auto lg:px-0 sm:px-6 z-[1] mt-8"
        >
            <h2 class="text-2xl flex">timeline <NuxtLink
                    to="/timeline"
                    class="text-2xl flex text-primary ml-3"
                >vue full
                    <ChevronRight class="animate-pulse" />
                </NuxtLink>
            </h2>
            <div class="grid md:grid-flow-col md:auto-cols-max sm:grid-cols-1 gap-4 mt-9">
                <div>
                    <h2 class="text-xl flex">
                        <TimeIcon class="mr-2" />life so far ...
                    </h2>
                    <ul class="list-disc ml-6">
                        <li
                            v-for="item in state.config.lifeSoFar || []"
                            class="my-2"
                        >
                            <span class="text-lg">{{ item.value || item.lifeSoFar || item }}</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-xl flex">
                        <HeartIcon class="mr-2" /> lover of ...
                    </h2>
                    <ul class="list-disc ml-6">
                        <li
                            v-for="item in state.config.loverOf || []"
                            class="my-2"
                        >
                            <span class="text-lg">{{ item.value || item.loverOf || item }}</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-xl flex">
                        <LostIcon class="mr-2" /> lost in ...
                    </h2>
                    <ul class="list-disc ml-6">
                        <li
                            v-for="item in state.config.lostIn || []"
                            class="my-2"
                        >
                            <span class="text-lg">{{ item.value || item.lostIn || item }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div
            v-if="state.posts?.data?.length"
            class="mt-8 constrained container mx-auto lg:px-0 sm:px-6 z-[1]"
        >
            <h2 class="text-2xl flex">recent content <NuxtLink
                    to="/content"
                    class="text-2xl flex ml-2 text-primary"
                >vue all
                    <ChevronRight class="animate-pulse" />
                </NuxtLink>
            </h2>
            <div class="w-full lg:columns-2 lg:grid-cols-1 grid columns-1 grid-cols-1 gap-4 mt-3">
                <PostCard
                    v-for="post in state.posts.data"
                    large
                    tag="a"
                    :post="post"
                    :index="post.id"
                >
                </PostCard>
            </div>
        </div>
        <div
            v-if="state.photos?.length"
            class="flex flex-col mt-8 constrained container mx-auto lg:px-0 sm:px-6 z-[1]"
        >
            <h2 class="text-2xl">recent photos</h2>
            <div class="w-full lg:columns-3 lg:grid-cols-3 grid columns-2 grid-cols-2 gap-4 mt-3">
                <!-- <div v-for="column in state.posts"> -->
                <div
                    v-for="image in state.photos"
                    class="relative cursor-pointer py-4 px-1 inline-block w-full group md:block mb-0 sm:mb-0 mr-6 rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out overflow-hidden"
                    @click="onShowImageModal(image)"
                >
                    <img
                        class="w-full h-full rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer object-cover"
                        :alt="image.alt || image.thumbnail"
                        :src="image.thumbnail"
                    >
                </div>
                <!-- </div> -->
            </div>
            <!-- <vue-picture-swipe
                :items="state.photos"
                :options="{ loop: true, bgOpacity: 0.2 }"
                class="w-full h-full"
            ></vue-picture-swipe> -->
        </div>

        <!-- The image Modal -->
        <div
            ref="homePhotos"
            class="hs-overlay fixed hidden size-full top-0 start-0 z-[10000] overflow-x-hidden overflow-y-auto left-0
                w-screen h-screen bg-white/70 flex
                justify-center items-center"
            style="background-color: rgba(0,0,0,0.9)"
        >
            <div class="relative hs-overlay-open:mt-0 hs-overlay-open hs-overlay-open:duration-500 mt-10 opacity-0 transition-all w-full flex flex-wrap h-full px-6 justify-center aligfn-center">

                <!-- The close button -->
                <div class="flex-initial h-20 flex justify-end w-full lg:pr-6">
                    <a
                        class="z-[10000] top-6 right-8 text-5xl font-bold cursor-pointer text-right"
                        style="color: #fff"
                        @click="onCloseModal"
                    >
                        ×
                    </a>
                </div>
                <div class="flex-grow w-full flex justify-center">
                    <!-- A big image will be displayed here -->
                    <img
                        ref="homePhotoImage"
                        class="max-w-[90vw] max-h-[80vh] lg:max-h-[66vh] object-cover"
                    />
                </div>
                <div
                    v-if="(state.currentPhoto instanceof Object)"
                    class="flex-initial w-full lg:max-w-[768px] flex flex-col justify-start align-center lg:max-h-[30vh]"
                >
                    <h2
                        v-if="state.currentPhoto.location"
                        class="text-2xl text-center lg:text-left mt-3"
                    >{{ state.currentPhoto.location }}</h2>
                    <h3
                        v-if="state.currentPhoto.dateTime"
                        class="text-xl text-center lg:text-left mt-3"
                    >{{ state.currentPhoto.dateTime }}</h3>
                    <p
                        v-if="state.currentPhoto.description"
                        class="text-center lg:text-left text-small"
                        v-html="state.currentPhoto.description"
                    ></p>
                </div>
            </div>
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