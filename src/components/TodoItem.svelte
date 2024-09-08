<script>
	import { Pen, Save, Trash, LogOut } from 'lucide-svelte';
	export let index;
	export let todo;
	export let editTodo;
	export let removeTodo;
</script>

<div class="flex items-center justify-between text-lg font-bold border-l-4 border-cyan-300 p-1">
	<p>{index + 1}. {todo}</p>
	<div class="flex gap-2 items-center p-2">
		<button
			class="cursor-pointer hover:text-rose-500"
			on:click={() => {
				editTodo(index);
			}}
			on:keydown={() => {}}
		>
			<Pen />
		</button>
		<button
			class="cursor-pointer hover:text-rose-500"
			on:click={() => {
				removeTodo(index);
			}}
			on:keydown={() => {}}
		>
			<Trash />
		</button>
	</div>
</div>
