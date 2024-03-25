<script setup lang="ts">
import Sugar from "sugar";
import { useJsonHelper } from "~/composables/json-helper";
import { useApiHelper } from "~/composables/api-helper";
import SearchIcon from "~icons/mdi/magnify";
import PostCard from "~/components/PostCard.vue";

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
	backgroundColor?: string;
}

interface Posts {
	data: Post[];
	total: number;
}

// Interface for state description
interface State {
	isLoading: boolean;
	config: any;
	posts: Posts;
	filter: any;
	navigation: any;
}

const state: State = reactive({
	isLoading: true,
	config: {},
	posts: {
		data: [],
	},
	filter: {
		limit: 10,
		offset: 0,
		sortBy: "",
		sortDirection: "desc",
	},
	navigation: {
		hasPrevious: computed((): boolean => {
			return state.filter.offset > 0;
		}),
		hasNext: computed((): boolean => {
			return state.posts.total / state.filter.limit > 1;
		}),
	},
});

/**
 * Fetch the next page of content through the API
 */
async function onNext(): Promise<void> {
	state.filter.offset += state.filter.limit;
	await onGetAll();
}

/**
 * Fetch the previous page of content through the API
 */
async function onPrevious(): Promise<void> {
	state.filter.offset -= state.filter.limit;
	await onGetAll();
}

/**
 * Fetch the home page content through the API
 */
async function onGetAll(params: any = {}): Promise<void> {
	state.posts = await getAll(`posts`, { ...state.filter, ...params });
}

/**
 * Fetch the home page content through the API
 */
async function loadData(): Promise<void> {
	state.config = await getOne(`pageContent/${config.public.contentId}`);
	await onGetAll();
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
		<div class="constrained container mx-auto mt-6">
			<div class="grid grid-cols-1 sm:grid-cols">
				<div class="mt-6 my-auto items-end justify-start" style="z-index: 2">
					<h1 class="text-4xl text-center lg:text-left">
						{{ state.config.title }}
					</h1>
					<p
						v-html="state.config.description || 'Missing Description'"
						class="mt-3 text-sm mr-3 text-inherit text-center lg:text-left"
					></p>
				</div>
			</div>
		</div>
		<div class="mt-6 mb-6 constrained container mx-auto z-[1]">
			<!-- <div class="relative">
				<div
					class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
				>
					<SearchIcon class="text-black" />
				</div>
				<input
					v-model="state.filter.q"
					type="search"
					class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search"
					@click="onGetAll"
				/>
				<button
					type="submit"
					class="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-secondary dark:hover:bg-primary dark:focus:ring-blue-800"
				>
					search
				</button>
			</div> -->
		</div>
		<div
			v-if="state.posts.data.length"
			class="grid grid-cols-1 mt-6 constrained container mx-auto lg:px-0 sm:px-6 z-[1]"
		>
			<PostCard
				v-for="post in state.posts.data"
				tag="a"
				large
				:post="post"
				:index="post.id"
			>
			</PostCard>
		</div>
		<div class="mt-6 constrained container mx-auto lg:px-0 sm:px-6 z-[1]">
			<div class="flex flex-wrap">
				<button v-if="state.navigation.hasPrevious" @click="onPrevious">
					Previous
				</button>
				<div class="grow"></div>
				<button v-if="state.navigation.hasNext" @click="onNext">Next</button>
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
