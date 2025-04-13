import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies }) => {
    try {
        // Eliminar la cookie de sesión
        cookies.delete('session', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return new Response(JSON.stringify({
            success: true,
            message: 'Sesión cerrada correctamente'
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Error al cerrar sesión'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}; 