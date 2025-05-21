import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export async function requireAuth(Astro) {
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

export async function checkAuth(Astro) {
    try {
        const user = await requireAuth(Astro);
        return user;
    } catch (error) {
        return null;
    }
} 