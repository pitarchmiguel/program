/* empty css                                  */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_BGMPX5oY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { d as db } from '../../chunks/firebase_C_ZeOG6Y.mjs';
import { doc, getDoc } from 'firebase/firestore';
import { parseISO, format } from 'date-fns';
import { $ as $$Layout } from '../../chunks/Layout_CrYC2264.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  console.log("1. P\xE1gina iniciando...");
  console.log("2. Firebase DB:", db);
  let workout = null;
  let error = null;
  const id = Astro2.url.pathname.split("/").pop();
  console.log("3. ID recibido:", id);
  async function loadWorkout() {
    try {
      console.log("4. Intentando obtener el documento...");
      const docRef = doc(db, "workouts", id);
      const docSnap = await getDoc(docRef);
      console.log("5. Documento existe?:", docSnap.exists());
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("6. Datos raw:", data);
        workout = {
          id: docSnap.id,
          ...data,
          date: parseISO(data.date)
        };
        console.log("7. Workout procesado:", workout);
      } else {
        error = "No se encontr\xF3 el documento";
        console.log("8. Error:", error);
      }
    } catch (e) {
      error = e.message;
      console.error("9. Error capturado:", e);
    }
  }
  await loadWorkout();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Editar Entrenamiento" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-2xl mx-auto"> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"> <h1 class="text-3xl font-bold mb-6">Editar Entrenamiento</h1> ${error && renderTemplate`<div class="bg-red-500 text-white p-4 rounded-md mb-4">
Error: ${error} </div>`} ${!error && !workout && renderTemplate`<div class="flex items-center justify-center p-4"> <p>Cargando...</p> </div>`} ${workout && renderTemplate`<form id="workoutForm" class="space-y-6"> <div> <label for="workoutDate" class="block text-sm font-medium mb-1">Fecha</label> <input type="date" id="workoutDate" name="workoutDate"${addAttribute(format(workout.date, "yyyy-MM-dd"), "value")} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white"> </div> <div class="flex space-x-4"> <div class="flex-1"> <label for="workoutLetter" class="block text-sm font-medium mb-1">Letra</label> <input type="text" id="workoutLetter" name="workoutLetter"${addAttribute(workout.letter, "value")} maxlength="1" required class="w-16 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white"> </div> <div class="flex-auto"> <label for="workoutTitle" class="block text-sm font-medium mb-1">Título</label> <input type="text" id="workoutTitle" name="workoutTitle"${addAttribute(workout.title, "value")} required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white"> </div> </div> <div> <label for="workoutDescription" class="block text-sm font-medium mb-1">Workout</label> <textarea id="workoutDescription" name="workoutDescription" rows="7" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white">${workout.description.replace(/<br>/g, "\n")}</textarea> </div> <div> <label for="workoutNotes" class="block text-sm font-medium mb-1">Notas</label> <textarea id="workoutNotes" name="workoutNotes" rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white">${workout.notes.replace(/<br>/g, "\n")}</textarea> </div> <div class="flex justify-between"> <button type="submit" class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors">
Guardar cambios
</button> <a href="/admin" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
Cancelar
</a> </div> </form>`} </div> </div> ` })} `;
}, "/Users/miguelpitarch/Desktop/program/src/pages/edit/[id].astro", void 0);

const $$file = "/Users/miguelpitarch/Desktop/program/src/pages/edit/[id].astro";
const $$url = "/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
