<script>
	import { onMount } from 'svelte';
	import { auth, db } from '../lib/firebase/firebase';
	import '../app.css';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { authStore } from '../store/store';

	const nonAuthRoutes = ['/'];

	onMount(() => {
		console.log('MOUNTING');
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}

			if (user && currentPath === '/') {
				window.location.href = '/dashboard';
				return;
			}

			if (!user) {
				return;
			}

			let dataToSetToStore;
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				const userRef = doc(db, 'users', user.uid);
				dataToSetToStore = {
					email: user.email,
					todos: []
				};
				await setDoc(userRef, dataToSetToStore, { merge: true });
			} else {
				const userData = docSnap.data();
				dataToSetToStore = userData;
			}

			authStore.update((curr) => {
				return {
					...curr,
					user,
					data: dataToSetToStore,
					loading: false
				};
			});
		});
		return unsubscribe;
	});
</script>

<div class="min-h-screen bg-blue-700 text-white relative flex flex-col">
	<slot />
</div>
