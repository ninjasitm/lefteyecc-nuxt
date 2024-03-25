<template>
	<!-- some content -->
	<NuxtErrorBoundary @error="someErrorLogger">
		<!-- You use the default slot to render your content -->
		<template #error="{ error, clearError }">
			<div
				class="constrained container h-[100vh] mx-auto flex flex-col justify-center"
			>
				<h1 class="text-3xl">
					{{ is404 ? "This page could not be found" : "Whoops" }}
				</h1>
				<div class="h-500">
					<img
						:src="randomImage"
						alt="Something happened"
						class="w-full h-full object-cover"
					/>"
				</div>
				<p class="text-xl op50" v-html="message || 'Something happened'"></p>
				<p v-if="isDev" v-html="error" class="mt-3"></p>
				<NuxtLink class="px-4 py-1 text-3xl" @click="handleError" href="#">
					Go Back
				</NuxtLink>
			</div>
		</template>
	</NuxtErrorBoundary>
</template>
