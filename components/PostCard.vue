<script setup lang="ts">
const props = defineProps({
	post: Object,
	tag: String,
	large: Boolean,
	mode: {
		type: String,
		default: "auto",
	},
});

const config = useRuntimeConfig();
const state = reactive({
	tags: [],
});

try {
	state.tags = JSON.parse(props.post.tags)
		.map((tag) => (tag.value && tag.value.length > 0 ? tag.value : null))
		.filter((tag) => tag !== null);
} catch (error) {}
</script>

<template>
	<component
		:is="props.tag === 'link' || props.tag === 'a' ? 'a' : 'div'"
		:class="{
			'w-full h-auto lg:max-w-full flex lg:flex-row cursor-pointer hover:shadow-md border-t border-r border-b border-l border-gray-200 dark:border-gray-900 rounded-lg': true,
			'border-l-none': post.image !== null,
			'flex-col': mode === 'vertical',
		}"
		:href="post.link || '#'"
	>
		<div
			v-if="post.image"
			class="col h-auto w-[96px] flex-none bg-cover overflow-hidden bg-white/75 rounded-b-none rounded-r-none rounded-t-lg rounded-l-lg"
			:class="{
				'lg:w-[192px]': props.large,
				'lg:w-[125px]': !props.large,
			}"
			:alt="post.title"
		>
			<img
				class="object-cover w-full h-full hover:scale-125"
				:src="config.public.cdnBase + post.image.replace(/^\//gm, '')"
			/>
		</div>
		<div
			class="grow p-4 flex flex-col justify-between leading-normal bg-white dark:bg-transparent"
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
					v-for="tag in state.tags"
					class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
					>#{{ tag }}</span
				>
			</div>
		</div>
	</component>
</template>
