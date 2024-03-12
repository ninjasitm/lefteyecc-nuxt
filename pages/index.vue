<script
    setup
    lang="ts"
>
import Sugar from 'sugar';

const state = reactive({
    showCurrentHeader: true,
    currentHeader: 'Welcome',
    headerTitle: ["Welcome", "よこぞ", "Bienvenue"],
    headerDescription: 'Missing Description',
    bannerItems: [
        {
            image: 'https://firebasestorage.googleapis.com/v0/b/solidariti-a3936.appspot.com/o/hero-image.png?alt=media&token=e8b3a060-5304-4753-b2e4-34e9216b0995',
            title: 'Malcolm Paul',
            description: 'NITM Founder'
        }
    ],
});

onMounted(() => {
    setInterval(() => {
        state.showCurrentHeader = false;
        state.currentHeader = Sugar.Array.sample(state.headerTitle);
        setTimeout(() => {
            state.showCurrentHeader = true;
        }, 1000);
    }, 2000);
});

</script>
<template>
    <header class="masthead">
        <div class="constrained container h-full mx-auto">
            <div class="grid grid-cols-[40%_60%] sm:grid-cols 1 h-full">
                <div
                    class="flex my-auto items-center justify-start h-full"
                    style="z-index: 2"
                >
                    <div class="header-content">
                        <h1 style="height: 56px">
                            <Transition name="slide-fade">
                                <span v-if="state?.showCurrentHeader">{{ state.currentHeader }}!</span>
                            </Transition>
                        </h1>
                        <p>{{ state.headerDescription || 'Missing Description' }}</p>
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

</template>