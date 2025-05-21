import { d as db } from '../../chunks/firebase_79n_BlYZ.mjs';
import { addDoc, collection } from 'firebase/firestore';
import { format } from 'date-fns';
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  try {
    const data = await request.json();
    const { date, letter, title, description, notes, id } = data;
    if (!date || !letter || !title || !description) {
      return new Response(JSON.stringify({
        success: false,
        message: "Faltan campos requeridos"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const docRef = await addDoc(collection(db, "workouts"), {
      date: format(new Date(date), "yyyy-MM-dd"),
      letter,
      title,
      description: description.replace(/\n/g, "<br>"),
      notes: notes ? notes.replace(/\n/g, "<br>") : "",
      id
    });
    return new Response(JSON.stringify({
      success: true,
      message: "Entrenamiento creado correctamente",
      id: docRef.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al crear el entrenamiento:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Error al crear el entrenamiento: " + error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
