import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { format } from 'date-fns';

export async function POST({ request }) {
    try {
        const data = await request.json();
        const { date, letter, title, description, notes, id } = data;

        // Validar los datos
        if (!date || !letter || !title || !description) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Faltan campos requeridos' 
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Crear el documento en Firestore
        const docRef = await addDoc(collection(db, "workouts"), {
            date: format(new Date(date), 'yyyy-MM-dd'),
            letter,
            title,
            description: description.replace(/\n/g, '<br>'),
            notes: notes ? notes.replace(/\n/g, '<br>') : '',
            id
        });

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Entrenamiento creado correctamente',
            id: docRef.id
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error al crear el entrenamiento:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            message: 'Error al crear el entrenamiento: ' + error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
} 