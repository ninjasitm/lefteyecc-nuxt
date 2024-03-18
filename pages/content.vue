<script setup lang="ts">
import Sugar from "sugar";
import { useJsonHelper } from "~/composables/json-helper";
import { useApiHelper } from "~/composables/api-helper";
// import VuePictureSwipe from 'vue3-picture-swipe';

const config = useRuntimeConfig();
const { parseProperties } = useJsonHelper();
const { getOne, getAll } = useApiHelper();

interface Post {
	title: string;
	post_type: string;
	body: string;
	icon?: string;
	image?: string;
	images?: string[];
	tags?: string[];
	link?: string;
	buttonText?: string;
}

interface Posts {
	data: Post[];
}

// Interface for state description
interface State {
	isLoading: boolean;
	config: any;
	posts: Posts;
}

const state: State = reactive({
	isLoading: true,
	config: {},
	posts: {
		data: [],
	},
});

/**
 * Fetch the home page content through the API
 */
async function loadData(): Promise<void> {
	state.config = await getOne(`pageContent/${config.public.contentId}`);
	state.posts = await getAll(`posts`, {
		limit: 10,
		offset: 0,
	});
	parseProperties(state.config, []);
	state.posts.data = (state.posts.data || []).map((post) => {
		return parseProperties(post, ["images"]);
	});
	state.isLoading = false;
}

onMounted(async () => {
	await loadData();
});
</script>
<template>
	<NuxtLoadingIndicator v-if="state.isLoading" />
	<template v-else>
		<div class="constrained container mx-auto">
			<div class="grid grid-cols-1 sm:grid-cols">
				<div class="mt-6 my-auto items-end justify-start" style="z-index: 2">
					<h1 class="text-2xl">
						{{ state.config.title }}
					</h1>
					<p
						class="mt-0 text-sm mr-3 text-inherit"
						v-html="state.config.description || 'Missing Description'"
					></p>
				</div>
			</div>
		</div>
		<div class="mt-6 mb-6 constrained container mx-auto lg:px-0 sm:px-6 z-[1]">
			Filter goes here
		</div>
		<div
			v-if="state.posts.data.length"
			class="mt-6 constrained container mx-auto lg:px-0 sm:px-6 z-[1]"
		>
			<a
				v-for="post in state.posts.data"
				class="w-full lg:max-w-full flex cursor-pointer"
				:href="post.link || '#'"
			>
				<div
					v-if="post.image"
					class="col h-48 lg:h-auto w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
					:style="{
						backgroundImage: `url(${post.image})`,
					}"
					:alt="post.title"
				></div>
				<div
					class="grow border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
				>
					<div v-if="post.post_type">
						<span
							class="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
							>{{ post.post_type }}</span
						>
					</div>
					<div class="mb-8">
						<div class="text-gray-900 font-bold text-xl mb-2">
							{{ post.title }}
						</div>
						<p v-html="post.body" class="text-gray-700 text-base"></p>
					</div>
					<div class="flex items-center">
						<span
							v-for="tag in post.tags"
							class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
							>#{{ tag }}</span
						>
					</div>
				</div>
			</a>
			<!-- <vue-picture-swipe
                :items="state.photos"
                :options="{ loop: true, bgOpacity: 0.2 }"
                class="w-full h-full"
            ></vue-picture-swipe> -->
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
