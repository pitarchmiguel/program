import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { format } from 'date-fns';

export async function POST({ request }) {
    try {
        const data = await request.json();
        const { wodId, wodTitulo, tiempo, rondas, repeticiones, peso, notas, fecha } = data;

        // Validar los datos
        if (!wodId || !wodTitulo || !fecha) {
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
        const docRef = await addDoc(collection(db, "resultados"), {
            wodId,
            wodTitulo,
            tiempo: tiempo || null,
            rondas: rondas || null,
            repeticiones: repeticiones || null,
            peso: peso || null,
            notas: notas || null,
            fecha: format(new Date(fecha), 'yyyy-MM-dd')
        });

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Resultado guardado correctamente',
            id: docRef.id
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error al guardar el resultado:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            message: 'Error al guardar el resultado: ' + error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
} 