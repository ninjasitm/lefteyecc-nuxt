<script setup lang="ts">
import Sugar from "sugar";
import { useJsonHelper } from "~/composables/json-helper";
import { useApiHelper } from "~/composables/api-helper";
// import VuePictureSwipe from 'vue3-picture-swipe';

const config = useRuntimeConfig();
const { parseProperties } = useJsonHelper();
const { getOne } = useApiHelper();

// Interface for state description
interface State {
	isLoading: boolean;
	config: any;
}

const state: State = reactive({
	isLoading: true,
	config: {},
});

/**
 * Fetch the home page content through the API
 */
async function loadData(): Promise<void> {
	state.config = await getOne(`pageUses/${config.public.usesId}`);
	parseProperties(state.config, ["uses"]);
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
					<h1 class="text-4xl">
						{{ state.config.title }}
					</h1>
					<p
						v-html="state.config.description || 'Missing Description'"
						class="mt-3 mb-0 text-sm mr-3 text-inherit"
					></p>
				</div>
			</div>
			<div class="mb-6">
				<template v-for="section in state.config.uses">
					<h2 class="text-2xl mt-6">{{ section.section }}</h2>
					<ul class="list-disc list-inside">
						<li v-for="item in section.items" class="mt-3">
							{{ item.title }}
						</li>
					</ul>
				</template>
			</div>
			<a href="https://uses.tech/" target="_blank"
				>(via The /uses page movement)</a
			>
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
