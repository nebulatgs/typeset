import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

function savedWritable<T>(key: string, initial: T): Writable<T> {
	const { subscribe, set, update } = writable<T>(initial);

	if (browser) {
		const json = localStorage.getItem(key);
		if (json) set(JSON.parse(json));
	}

	return {
		subscribe,
		set(value: T) {
			if (browser) localStorage.setItem(key, JSON.stringify(value));
			set(value);
		},
		update
	};
}

function cookieWritable<T>(key: string, initial: T): Writable<T> {
	const { subscribe, set, update } = writable<T>(initial);

	if (browser) {
		const cookie = document.cookie.split('; ').find((row) => row.startsWith(`${key}=`));
		if (cookie) set(JSON.parse(cookie.split('=')[1]));
	}

	return {
		subscribe,
		set(value: T) {
			if (browser) document.cookie = `${key}=${JSON.stringify(value)}; path=/`;
			set(value);
		},
		update
	};
}

export const theme = savedWritable('theme', '');
export const focusMode = savedWritable('focusMode', false);
