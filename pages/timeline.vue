<script setup lang="ts">
import Sugar from "sugar";
import { reactive, onMounted, computed } from "vue";
import { useJsonHelper } from "~/composables/json-helper";
import { useApiHelper } from "~/composables/api-helper";
import { useContentHelper } from "~/composables/content-helper";
import { PrettyTimeline } from "pretty-timeline";
import { useDateFormat } from "@vueuse/core";
import { theme } from "#tailwind-config";
import { Timeline } from "vue3-cute-component";

// import VuePictureSwipe from 'vue3-picture-swipe';
const config = useRuntimeConfig();
const { getMediaUrl } = useContentHelper();
const { parseProperties } = useJsonHelper();
const { getAll } = useApiHelper();

// Interface for state description
interface State {
	isLoading: boolean;
	config: any;
	timeline: any;
}

const state: State = reactive({
	theme,
	isLoading: true,
	config: {},
	timeline: computed(() => {
		const timeline = new Sugar.Array(state.config.data || []);
		const values = Object.values(
			timeline
				.map((item: any) => {
					const year = useDateFormat(item.date, "YYYY").value;
					console.log("Year", year);
					return {
						year,
						title: item.title,
						content: item.description,
						imgUrl: item.image ? getMediaUrl(item.image) : "",
						iconColor: item.iconColor || theme.colors.primary,
						chipText: item.chipText,
						chipColor: item.chipColor || theme.colors.primary,
					};
				})
				.groupBy((event: any) => event.year)
		)[0];
		console.log("[Timeline]: Values", Object.values(values));
		return Object.keys(values).map((key: string) => {
			console.log("[Timeline]: Group", key, values[key]);
			return {
				year: key,
				title: key,
				list: Object.values(values[key]),
			};
		});
	}),
});

/**
 * Fetch the home page content through the API
 */
async function loadData(): Promise<void> {
	state.config = await getAll(`pageTimeline`, { limit: 1000 });
	parseProperties(state.config, []);
	state.isLoading = false;
}

onMounted(async () => {
	await loadData();
	console.log("[Timeline]: Timeline", state.timeline);
});
</script>
<template>
	<NuxtLoadingIndicator v-if="state.isLoading" />
	<template v-else>
		<div class="constrained container mx-auto mt-6">
			<div class="grid grid-cols-1 sm:grid-cols">
				<div class="mt-6 my-auto items-end justify-start" style="z-index: 2">
					<h1 class="title text-4xl lg:text-left">
						{{ state.config.title || "The timeline so far ..." }}
					</h1>
					<p
						v-html="state.config.description || ''"
						class="mt-3 mb-0 text-sm mr-3 text-inherit text-center lg:text-left"
					></p>
				</div>
			</div>
			<div class="mb-6 mt-12">
				<pretty-timeline
					:timeline-data="state.timeline"
					:base-color="theme.colors.primary"
				/>
			</div>
		</div>
	</template>
</template>
<style scoped lang="scss">
:deep .list-image {
	max-height: 250px;
	width: 100%;
	object-fit: cover;
	object-position: center top;
}

@media (max-width: 1023px) {
	.title {
		text-align: center;
	}
}
</style>
