import type { APIRoute } from 'astro';
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export const POST: APIRoute = async ({ request }) => {
    try {
        console.log('Recibida solicitud de eliminación');
        const data = await request.json();
        console.log('Datos recibidos:', data);

        if (!data || !data.id) {
            console.error('Datos inválidos recibidos:', data);
            return new Response(JSON.stringify({ 
                error: 'Datos inválidos: se requiere ID' 
            }), {
                status: 400,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                }
            });
        }

        const docRef = doc(db, "workouts", data.id);
        console.log('Intentando eliminar documento con ID:', data.id);

        await deleteDoc(docRef);
        console.log('Documento eliminado exitosamente');

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Workout eliminado correctamente'
        }), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });
    } catch (error) {
        console.error('Error al eliminar el workout:', error);
        console.error('Detalles del error:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });

        return new Response(JSON.stringify({ 
            error: `Error al eliminar: ${error.message}`,
            details: error.code || 'unknown_error'
        }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });
    }
} 