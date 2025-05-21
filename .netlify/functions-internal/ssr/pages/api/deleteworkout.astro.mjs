import { d as db } from '../../chunks/firebase_79n_BlYZ.mjs';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    console.log("Recibida solicitud de eliminación");
    if (request.method !== "POST") {
      console.log("Método no permitido:", request.method);
      return new Response(JSON.stringify({
        success: false,
        message: "Método no permitido"
      }), {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const data = await request.json();
    console.log("Datos recibidos:", data);
    const { id } = data;
    if (!id) {
      console.log("ID no proporcionado");
      return new Response(JSON.stringify({
        success: false,
        message: "ID de entrenamiento no proporcionado"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const workoutRef = doc(db, "workouts", id);
    console.log("Buscando documento con ID:", id);
    const workoutDoc = await getDoc(workoutRef);
    if (!workoutDoc.exists()) {
      console.log("Documento no encontrado");
      return new Response(JSON.stringify({
        success: false,
        message: "El entrenamiento no existe"
      }), {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    console.log("Eliminando documento...");
    await deleteDoc(workoutRef);
    console.log("Documento eliminado correctamente");
    return new Response(JSON.stringify({
      success: true,
      message: "Entrenamiento eliminado correctamente"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al eliminar el entrenamiento:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Error al eliminar el entrenamiento"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
