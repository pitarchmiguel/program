import { d as db } from '../../chunks/firebase_79n_BlYZ.mjs';
import { doc, updateDoc } from 'firebase/firestore';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    console.log("Recibida solicitud de actualización");
    const data = await request.json();
    console.log("Datos recibidos:", data);
    if (!data || !data.id) {
      console.error("Datos inválidos recibidos:", data);
      return new Response(JSON.stringify({
        error: "Datos inválidos: se requiere ID"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      });
    }
    const requiredFields = ["date", "letter", "title", "description"];
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      console.error("Campos requeridos faltantes:", missingFields);
      return new Response(JSON.stringify({
        error: `Campos requeridos faltantes: ${missingFields.join(", ")}`
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      });
    }
    const docRef = doc(db, "workouts", data.id);
    console.log("Intentando actualizar documento con ID:", data.id);
    const updateData = {
      date: data.date,
      letter: data.letter,
      title: data.title,
      description: data.description?.replace(/\n/g, "<br>") || "",
      notes: data.notes?.replace(/\n/g, "<br>") || ""
    };
    console.log("Datos a actualizar:", updateData);
    await updateDoc(docRef, updateData);
    console.log("Documento actualizado exitosamente");
    return new Response(JSON.stringify({
      success: true,
      message: "Workout actualizado correctamente",
      data: updateData
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    console.error("Error al actualizar el workout:", error);
    console.error("Detalles del error:", {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return new Response(JSON.stringify({
      error: `Error al actualizar: ${error.message}`,
      details: error.code || "unknown_error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
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
