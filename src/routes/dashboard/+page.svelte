<script>
	import { Pen, Save, Trash, LogOut } from 'lucide-svelte';
	import { authHandlers, authStore } from '../../store/store';
	import { doc, setDoc } from 'firebase/firestore';
	import { db } from '../../lib/firebase/firebase';
	import TodoItem from '../../components/TodoItem.svelte';

	let todoList = [];
	let currTodo = '';
	let error = false;

	authStore.subscribe((curr) => {
		todoList = curr.data.todos;
	});

	function addTodo() {
		error = false;
		if (!currTodo) {
			error = true;
		}
		todoList = [...todoList, currTodo];
		currTodo = '';
	}

	function editTodo(index) {
		let newTodoList = [...todoList].filter((val, i) => {
			console.log(i, index, i != index);
			return i != index;
		});

		currTodo = todoList[index];
		todoList = newTodoList;
	}

	function removeTodo(index) {
		let newTodoList = [...todoList].filter((val, i) => {
			console.log(i, index, i != index);
			return i != index;
		});

		todoList = newTodoList;
	}

	async function saveTodos() {
		try {
			const userRef = doc(db, 'users', $authStore.user.uid);
			await setDoc(
				userRef,
				{
					todos: todoList
				},
				{ merge: true }
			);
		} catch (err) {
			console.log('Error', err);
		}
	}
</script>

{#if !$authStore.loading}
	<div class="flex flex-col min-h-screen gap-6 p-6 w-full max-w-[1000px] m-auto justify-between">
		<div class="flex align-center items-center justify-between">
			<h1 class="text-2xl font-extrabold">Todo List</h1>
			<div class="flex gap-2">
				<button
					on:click={saveTodos}
					class="flex items-center gap-2 bg-white rounded-md text-blue-700 p-2 font-bold hover:bg-cyan-200 active:bg-cyan-400 focus:outline-none focus:ring"
					><Save size={22} />Save</button
				>
				<button
					on:click={authHandlers.signout}
					class="flex items-center gap-2 bg-white rounded-md text-blue-700 p-2 font-bold hover:bg-cyan-200 active:bg-cyan-400 focus:outline-none focus:ring"
					><LogOut size={22} />Logout</button
				>
			</div>
		</div>

		<main class="flex flex-col gap-2 flex-1">
			{#if todoList.length === 0}
				<p class="font-bold">You have nothing to do!</p>
			{/if}
			{#each todoList as todo, index}
				<TodoItem {todo} {index} {editTodo} {removeTodo} />
			{/each}
		</main>

		<section class={'flex items-stretch ' + (error ? 'border-red-600' : '')}>
			<input
				bind:value={currTodo}
				class="text-blue-700 p-3.5 outline-none border-none flex-1 rounded-l-md font-bold"
				type="text"
				placeholder="Enter todo"
			/>
			<button
				on:click={addTodo}
				class="font-bold p-3.5 cursor-pointer outline-none border-none bg-white rounded-r-md text-blue-700 hover:bg-cyan-200 active:bg-cyan-400 focus:outline-none focus:ring"
				>ADD</button
			>
		</section>
	</div>
{/if}
