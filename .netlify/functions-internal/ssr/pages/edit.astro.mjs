/* empty css                               */
import { c as createComponent, a as createAstro, b as addAttribute, e as renderHead, r as renderTemplate } from '../chunks/astro/server_BGMPX5oY.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { d as db } from '../chunks/firebase_C_ZeOG6Y.mjs';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { parseISO, format } from 'date-fns';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  let workout = null;
  const id = Astro2.url.pathname.split("/").pop();
  async function loadWorkout() {
    const docRef = doc(db, "workouts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      workout = {
        id: docSnap.id,
        ...docSnap.data(),
        date: parseISO(docSnap.data().date)
      };
    } else {
      console.log("No such document!");
    }
  }
  async function handleFormSubmit(event) {
    event.preventDefault();
    const date = document.getElementById("workoutDate").value;
    const letter = document.getElementById("workoutLetter").value;
    const title = document.getElementById("workoutTitle").value;
    const description = document.getElementById("workoutDescription").value;
    const notes = document.getElementById("workoutNotes").value;
    await updateDoc(doc(db, "workouts", id), {
      date: format(new Date(date), "yyyy-MM-dd"),
      letter,
      title,
      description: description.replace(/\n/g, "<br>"),
      notes: notes.replace(/\n/g, "<br>")
    });
    window.location.href = "/admin";
  }
  await loadWorkout();
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Editar Entrenamiento</title>${renderHead()}</head> <body class="w-full h-full flex flex-col bg-[#242424] text-[#f9f9f9]"> <div class="w-full h-full my-8 p-6"> <h1 class="text-3xl font-bold mb-6">Editar Entrenamiento</h1> ${workout ? renderTemplate`<form id="workoutForm" class="space-y-4"${addAttribute(handleFormSubmit, "onsubmit")}> <div> <label for="workoutDate" class="block text-sm font-medium">Fecha</label> <input type="date" id="workoutDate" name="workoutDate"${addAttribute(format(workout.date, "yyyy-MM-dd"), "value")} required class="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[#242424]"> </div> <div class="flex space-x-4"> <div class="flex-1"> <label for="workoutLetter" class="block text-sm font-medium">Letra</label> <input type="text" id="workoutLetter" name="workoutLetter"${addAttribute(workout.letter, "value")} maxlength="1" required class="p-3 mt-1 block w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[#242424]"> </div> <div class="flex-auto"> <label for="workoutTitle" class="block text-sm font-medium">Título</label> <input type="text" id="workoutTitle" name="workoutTitle"${addAttribute(workout.title, "value")} required class="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[#242424]"> </div> </div> <div> <label for="workoutDescription" class="block text-sm font-medium">Workout</label> <textarea id="workoutDescription" name="workoutDescription" rows="7" required class="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[#242424]">${workout.description.replace(/<br>/g, "\n")}</textarea> </div> <div> <label for="workoutNotes" class="block text-sm font-medium">Notas</label> <textarea id="workoutNotes" name="workoutNotes" rows="4" class="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[#242424]">${workout.notes.replace(/<br>/g, "\n")}</textarea> </div> <div class="flex justify-between"> <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
Guardar cambios
</button> <a href="/admin" class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
Cancelar
</a> </div> </form>` : renderTemplate`<p>Cargando...</p>`} </div> </body></html>`;
}, "/Users/miguelpitarch/Desktop/program/src/pages/edit.astro", void 0);

const $$file = "/Users/miguelpitarch/Desktop/program/src/pages/edit.astro";
const $$url = "/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Edit,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
