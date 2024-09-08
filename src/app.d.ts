// See https://kit.svelte.dev/docs/types#app
/// <reference types="vite/client" />

// // for information about these interfaces
// declare global {
// 	namespace App {
// 		interface Error {}
// 		// interface Locals {
// 		// 	user: import('lucia').User | null;
// 		// 	session: import('lucia').Session | null;
// 		// }
// 		// interface PageData {}
// 		// interface PageState {}
// 		// interface Platform {
// 		// 	env: {
// 		// 		// VITE_APIKEY: string;
// 		// 		// VITE_AUTH_DOMAIN: string;
// 		// 		// VITE_PROJECT_ID: string;
// 		// 		// VITE_STORATE_BUCKET: string;
// 		// 		// VITE_MESSAGING_SENDER_ID: string;
// 		// 		// VITE_APP_ID: string;
// 		// 	};
// 		// 	context: {
// 		// 		waitUntil(promise: Promise<any>): void;
// 		// 	};
// 		// 	caches: CacheStorage & { default: Cache };
// 		// }
// 	}

// }
// export {};

interface ImportMetaEnv {
	readonly VITE_APIKEY: string;
	readonly VITE_AUTH_DOMAIN: string;
	readonly VITE_PROJECT_ID: string;
	readonly VITE_STORAGE_BUCKET: string;
	readonly VITE_MESSAGING_SENDER_ID: string;
	readonly VITE_APP_ID: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
