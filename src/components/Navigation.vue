<script setup>
import {ref} from "vue";
import Menubar from "primevue/menubar";
const breakpoint = ref("500px");
const items = ref([
	{
		label: "Home"
	}
]);
</script>


<template>
	<Menubar :model="items" :breakpoint="breakpoint" :pt="{ 
		root: { 
		},
		end: {
			style: 'background-color: red'
		},
	}">
		<template #start>start here</template>

		<template #item="{item}">
			<span>{{item.label}}</span>
		</template>

		<template #end>end</template>
	</Menubar>
</template>


<style scoped>
.menubar-container {
}
.end {
	background-color: red;
	color: red;
}
</style>
