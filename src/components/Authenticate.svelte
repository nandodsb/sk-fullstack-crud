<script>
	import { Loader } from 'lucide-svelte';
	import { authHandlers } from '../store/store';

	let email = '';
	let password = '';
	let confirmPass = '';

	let error = false;
	let register = false;
	let authenticating = false;

	async function handleAuthenticate() {
		if (authenticating) {
			return;
		}
		if (!email || !password || (register && !confirmPass)) {
			error = true;
			return;
		}

		authenticating = true;

		try {
			if (!register) {
				await authHandlers.signin(email, password);
			} else {
				await authHandlers.signup(email, password);
			}
		} catch (err) {
			error = true;
			authenticating = false;
			console.log('Error', err);
		}
	}

	function handleRegister() {
		error = false;
		register = !register;
	}
</script>

<div class="flex flex-col flex-1 items-center justify-center p-6 font-poppins">
	<form class="flex flex-col gap-1.5 items-center w-[400px] max-w-[100%] m-auto">
		<h1 class=" text-bold text-center text-8xl">
			{register ? 'sign up' : 'sign in'}
		</h1>
		{#if error}
			<p class="flex justify-center text-center text-rose-500 text-base mt-2">
				The error information you have entered is not correct
			</p>
		{/if}

		<label class="relative border-md">
			<p class="">Email</p>
			<input
				bind:value={email}
				type="email"
				placeholder="email"
				class="p-1 rounded-md w-full text-blue-700 max-w-[100%] shadow-2xl"
			/>
		</label>

		<label class="relative border-md">
			<p class={password ? 'align-top' : 'center'}>Password</p>
			<input
				bind:value={password}
				type="password"
				placeholder="password"
				class="p-1 rounded-md w-full text-blue-700 shadow-2xl"
			/></label
		>

		{#if register}
			<label class="relative border-md">
				<p class={confirmPass ? '' : 'center'}>Confirm pass</p>
				<input
					bind:value={confirmPass}
					type="password"
					placeholder="confirm password"
					class="p-1 rounded-md w-full text-blue-700 shadow-2xl"
				/></label
			>
		{/if}

		<div class="relative border-md">
			<button
				on:click={handleAuthenticate}
				class="flex justify-center items-center w-80 m-5 py-0.5 cursor-pointer border-2 rounded-md text-white text-bold text-xl shadow-8xl hover:bg-blue-500 active:bg-blue-800 focus:outline-none focus:ring"
			>
				{#if authenticating && !error}
					<Loader class="animate-spin" />
				{:else}
					submit
				{/if}
			</button>
		</div>
		<div class="justify-center text-center w-[80%]">
			<div class="flex items-center rounded-full">
				<div class="flex-1 border-b border-gray-300"></div>
				<span class="text-white text-lg leading-8 px-4 py-2">Or</span>
				<div class="flex-1 border-b border-gray-300"></div>
			</div>
			{#if register}
				<div class="flex gap-2 justify-center">
					<p>Already have an account?</p>
					<button on:click={handleRegister} class="font-bold text-rose-500"> sign in </button>
				</div>
			{:else}
				<div class="flex gap-2 justify-center">
					<p>Don't have an account?</p>
					<button on:click={handleRegister} class="font-bold text-rose-500"> sign up </button>
				</div>
			{/if}
		</div>
	</form>
</div>
