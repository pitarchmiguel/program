/* empty css                               */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_BGMPX5oY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { d as db } from '../chunks/firebase_C_ZeOG6Y.mjs';
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import { startOfDay, endOfDay, format, parseISO } from 'date-fns';
import { $ as $$Layout } from '../chunks/Layout_CrYC2264.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  let workouts = [];
  const queryDate = Astro2.url.searchParams.get("date");
  let selectedDate = queryDate ? new Date(queryDate) : /* @__PURE__ */ new Date();
  async function loadWorkouts(date) {
    try {
      const startDate = startOfDay(date);
      const endDate = endOfDay(date);
      const workoutsQuery = query(
        collection(db, "workouts"),
        where("date", ">=", format(startDate, "yyyy-MM-dd")),
        where("date", "<=", format(endDate, "yyyy-MM-dd")),
        orderBy("date", "asc"),
        orderBy("id", "asc")
      );
      const querySnapshot = await getDocs(workoutsQuery);
      workouts = [];
      querySnapshot.forEach((doc2) => {
        const data = doc2.data();
        workouts.push({
          id: doc2.id,
          ...data,
          date: parseISO(data.date)
        });
      });
      console.log("Entrenamientos cargados:", workouts);
    } catch (error) {
      console.error("Error cargando entrenamientos:", error);
    }
  }
  await loadWorkouts(selectedDate);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Panel" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <h1 class="text-3xl font-bold">Panel de Administración</h1> <a href="/add" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
Añadir Entrenamiento
</a> </div> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"> <div class="flex items-center space-x-4 mb-6"> <label for="dateSelector" class="text-sm font-medium">Seleccionar fecha:</label> <input type="date" id="dateSelector"${addAttribute(format(selectedDate, "yyyy-MM-dd"), "value")} class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white"> </div> <div class="space-y-4"> ${workouts.map((workout) => renderTemplate`<div${addAttribute(`workout-${workout.id}`, "id")} class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"> <div class="view-mode"> <div class="flex justify-between items-start mb-4"> <div> <h2 class="text-xl font-semibold">${workout.title}</h2> <p class="text-sm text-gray-500 dark:text-gray-400"> ${format(workout.date, "dd/MM/yyyy")} </p> </div> <div class="flex space-x-2"> <button class="edit-btn px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors"${addAttribute(workout.id, "data-id")}>
Editar
</button> <button class="delete-btn px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"${addAttribute(workout.id, "data-id")}>
Eliminar
</button> </div> </div> <div class="prose dark:prose-invert max-w-none"> <div class="whitespace-pre-line">${workout.description}</div> ${workout.notes && renderTemplate`<div class="mt-2 text-sm text-gray-600 dark:text-gray-300"> <strong>Notas:</strong> ${workout.notes} </div>`} </div> </div> <div class="edit-mode hidden"> <form${addAttribute(`form-${workout.id}`, "id")} class="space-y-4"> <div> <label class="block text-sm font-medium mb-1">Fecha</label> <input type="date" name="date"${addAttribute(format(workout.date, "yyyy-MM-dd"), "value")} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white"> </div> <div> <label class="block text-sm font-medium mb-1">Título</label> <input type="text" name="title"${addAttribute(workout.title, "value")} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white"> </div> <div> <label class="block text-sm font-medium mb-1">Descripción</label> <textarea name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white">${workout.description}</textarea> </div> <div> <label class="block text-sm font-medium mb-1">Notas</label> <textarea name="notes" rows="2" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white">${workout.notes}</textarea> </div> </form> </div> </div>`)} </div> </div> </div> ` })} `;
}, "/Users/miguelpitarch/Desktop/program/src/pages/admin.astro", void 0);

const $$file = "/Users/miguelpitarch/Desktop/program/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Admin,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
