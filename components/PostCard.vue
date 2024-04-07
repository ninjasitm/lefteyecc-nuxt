<script setup lang="ts">
import { useContentHelper } from "~/composables/content-helper";
import Sugar from "sugar";
import { useDateFormat } from "@vueuse/core";

const props = defineProps({
	post: {
		type: Object,
		default: () => ({}),
	},
	tag: String,
	large: Boolean,
	mode: {
		type: String,
		default: "auto",
	},
});

const config = useRuntimeConfig();
const { getMediaUrl } = useContentHelper();
const state = reactive({
	tags: [],
});

const { post } = props;

const onOpenLink = (link: string) => {
	if (link.startsWith("http")) {
		window.open(link, "_blank");
	} else {
		window.location.href = link;
	}
};

try {
	state.tags = JSON.parse(post.tags)
		.map((tag: any) => (tag.value && tag.value.length > 0 ? tag.value : null))
		.filter((tag: any) => tag !== null);
} catch (error) {}
</script>

<template>
	<component
		:is="props.tag === 'link' || props.tag === 'a' ? 'a' : 'div'"
		:class="{
			'w-full h-auto lg:max-w-full flex flex-col lg:flex-row cursor-pointer hover:shadow-md border-t border-r border-b border-l border-gray-200 dark:border-gray-600 rounded-lg': true,
			'border-l-none': post.image !== null,
			'flex-col': mode === 'vertical',
		}"
		:href="'#'"
	>
		<div
			v-if="post.image"
			class="col lg:h-auto w-full h-[192px] flex-none bg-cover overflow-hidden bg-white/75 rounded-b-none rounded-r-none rounded-t-lg rounded-l-lg"
			:class="{
				'lg:w-[192px]': props.large,
				'lg:w-[125px]': !props.large,
			}"
			:alt="post.title"
		>
			<img
				class="object-cover w-full h-full hover:scale-125"
				:src="getMediaUrl(post.image)"
			/>
		</div>
		<div
			class="grow p-4 flex flex-col justify-between leading-normal bg-white dark:bg-transparent"
		>
			<div>
				<span
					v-if="post.postType"
					class="inline-block transition-all transition-duration-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 bg-primary-element hover:bg-primary-element-hover dark:bg-primary"
					>{{ Sugar.String.titleize(post.postType) }}</span
				>
				<span
					v-if="post.publishedOn"
					class="inline-block transition-all transition-duration-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 bg-primary-element hover:bg-primary-element-hover dark:bg-primary"
					>{{ useDateFormat(post.publishedOn, "MMM, D, YYYY").value }}</span
				>
			</div>
			<div class="mb-8">
				<div class="font-bold text-xl mb-2">
					{{ post.title }}
				</div>
				<p v-html="post.body" class="text-base"></p>
			</div>
			<div v-if="post.link" class="flex items-end justify-end">
				<button
					class="bg-primary-element hover:bg-primary-element-hover dark:bg-primary hover:text-white font-semibold py-2 px-4 hover:border-transparent rounded"
					@click.stop="onOpenLink(post.link)"
				>
					{{ post.buttonText || "View More" }}
				</button>
			</div>
			<div class="flex items-center">
				<span
					v-for="tag in state.tags"
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
					>#{{ tag }}</span
				>
			</div>
		</div>
	</component>
</template>
