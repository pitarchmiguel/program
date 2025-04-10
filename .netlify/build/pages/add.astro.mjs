/* empty css                               */
import { e as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_9nBo-_fU.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_CYY21pNm.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Agregar Entrenamiento", "data-astro-cid-idr4ht26": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-2xl mx-auto" data-astro-cid-idr4ht26> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-astro-cid-idr4ht26> <h1 class="text-3xl font-bold mb-6" data-astro-cid-idr4ht26>Nuevo Entrenamiento</h1> <div id="notification" class="hidden mb-4 p-4 rounded-md" data-astro-cid-idr4ht26></div> <form id="workoutForm" class="space-y-6" data-astro-cid-idr4ht26> <div data-astro-cid-idr4ht26> <label for="workoutDate" class="block text-sm font-medium mb-1" data-astro-cid-idr4ht26>Fecha</label> <input type="date" id="workoutDate" name="workoutDate" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white" data-astro-cid-idr4ht26> </div> <div class="flex space-x-4" data-astro-cid-idr4ht26> <div class="flex-1" data-astro-cid-idr4ht26> <label for="workoutLetter" class="block text-sm font-medium mb-1" data-astro-cid-idr4ht26>Letra</label> <input type="text" id="workoutLetter" name="workoutLetter" maxlength="1" required class="w-16 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white" data-astro-cid-idr4ht26> </div> <div class="flex-auto" data-astro-cid-idr4ht26> <label for="workoutTitle" class="block text-sm font-medium mb-1" data-astro-cid-idr4ht26>Título</label> <input type="text" id="workoutTitle" name="workoutTitle" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white" data-astro-cid-idr4ht26> </div> </div> <div data-astro-cid-idr4ht26> <label for="workoutDescription" class="block text-sm font-medium mb-1" data-astro-cid-idr4ht26>Workout</label> <textarea id="workoutDescription" name="workoutDescription" rows="7" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white" data-astro-cid-idr4ht26></textarea> </div> <div data-astro-cid-idr4ht26> <label for="workoutNotes" class="block text-sm font-medium mb-1" data-astro-cid-idr4ht26>Notas</label> <textarea id="workoutNotes" name="workoutNotes" rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white" data-astro-cid-idr4ht26></textarea> </div> <div class="flex justify-between" data-astro-cid-idr4ht26> <button type="submit" class="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors" data-astro-cid-idr4ht26>
Añadir entrenamiento
</button> <a href="/" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-astro-cid-idr4ht26>
Volver
</a> </div> </form> </div> </div> ` })} ${renderScript($$result, "/Users/miguelpitarch/Desktop/program/src/pages/add.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/miguelpitarch/Desktop/program/src/pages/add.astro", void 0);

const $$file = "/Users/miguelpitarch/Desktop/program/src/pages/add.astro";
const $$url = "/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Add,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
