import type { APIRoute } from 'astro';
import { db } from '../../firebase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

export const POST: APIRoute = async ({ request }) => {
    try {
        console.log('Recibida solicitud de eliminación');
        
        // Verificar que la solicitud sea POST
        if (request.method !== 'POST') {
            console.log('Método no permitido:', request.method);
            return new Response(JSON.stringify({
                success: false,
                message: 'Método no permitido'
            }), {
                status: 405,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Obtener el ID del entrenamiento a eliminar
        const data = await request.json();
        console.log('Datos recibidos:', data);
        const { id } = data;

        if (!id) {
            console.log('ID no proporcionado');
            return new Response(JSON.stringify({
                success: false,
                message: 'ID de entrenamiento no proporcionado'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Verificar que el documento existe
        const workoutRef = doc(db, 'workouts', id);
        console.log('Buscando documento con ID:', id);
        const workoutDoc = await getDoc(workoutRef);

        if (!workoutDoc.exists()) {
            console.log('Documento no encontrado');
            return new Response(JSON.stringify({
                success: false,
                message: 'El entrenamiento no existe'
            }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Eliminar el documento
        console.log('Eliminando documento...');
        await deleteDoc(workoutRef);
        console.log('Documento eliminado correctamente');

        return new Response(JSON.stringify({
            success: true,
            message: 'Entrenamiento eliminado correctamente'
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error al eliminar el entrenamiento:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Error al eliminar el entrenamiento'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}; 