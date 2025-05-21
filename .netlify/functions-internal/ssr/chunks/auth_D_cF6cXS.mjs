import { a as auth } from './firebase_79n_BlYZ.mjs';
import { onAuthStateChanged } from 'firebase/auth';

async function requireAuth(Astro) {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                reject(new Error('No autenticado'));
            } else {
                resolve(user);
            }
        });
    });
}

export { requireAuth as r };
