/* empty css                               */
import { c as createComponent, e as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_thY1q-tL.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DH1-w1yW.mjs';
import { d as db } from '../chunks/firebase_79n_BlYZ.mjs';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const $$Resultados = createComponent(async ($$result, $$props, $$slots) => {
  let resultados = [];
  let isLoading = true;
  let error = null;
  try {
    const resultadosCollection = collection(db, "resultados");
    const q = query(resultadosCollection, orderBy("fecha", "desc"));
    const querySnapshot = await getDocs(q);
    resultados = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        fecha: parseISO(data.fecha),
        wodId: data.wodId,
        wodTitulo: data.wodTitulo,
        tiempo: data.tiempo,
        rondas: data.rondas,
        repeticiones: data.repeticiones,
        peso: data.peso,
        notas: data.notas
      };
    });
  } catch (err) {
    console.error("Error al obtener los resultados:", err);
    error = "Error al cargar los resultados";
  } finally {
    isLoading = false;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Resultados - La Program", "data-astro-cid-5hgwyhda": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-[#f9f9f9] transition-colors duration-300" data-astro-cid-5hgwyhda> <div class="w-full h-full my-4 md:my-8 px-4 md:p-6 max-w-4xl mx-auto pb-20" data-astro-cid-5hgwyhda> <div class="mb-8" data-astro-cid-5hgwyhda> <h1 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text" data-astro-cid-5hgwyhda>
Mis Resultados
</h1> <p class="text-gray-600 dark:text-gray-400 mt-2" data-astro-cid-5hgwyhda>
Registro de todos tus resultados en los WODs
</p> </div> ${isLoading ? renderTemplate`<div class="text-center animate-fade-in" data-astro-cid-5hgwyhda> <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent" data-astro-cid-5hgwyhda></div> <p class="text-lg md:text-xl text-gray-400 dark:text-gray-500 mt-4" data-astro-cid-5hgwyhda>Cargando resultados...</p> </div>` : error ? renderTemplate`<div class="text-center animate-fade-in" data-astro-cid-5hgwyhda> <p class="text-lg md:text-xl text-red-500 dark:text-red-400 mb-4" data-astro-cid-5hgwyhda>${error}</p> </div>` : resultados.length === 0 ? renderTemplate`<div class="text-center py-12 md:py-16 animate-fade-in" data-astro-cid-5hgwyhda> <div class="inline-block p-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white mb-4" data-astro-cid-5hgwyhda> <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5hgwyhda> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-astro-cid-5hgwyhda></path> </svg> </div> <p class="text-2xl md:text-3xl font-bold text-gray-400 dark:text-gray-500" data-astro-cid-5hgwyhda>No hay resultados aún</p> <p class="text-gray-500 dark:text-gray-400 mt-2" data-astro-cid-5hgwyhda>¡Comienza a registrar tus resultados!</p> </div>` : renderTemplate`<div class="space-y-4" data-astro-cid-5hgwyhda> ${resultados.map((resultado) => renderTemplate`<div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" data-astro-cid-5hgwyhda> <div class="flex flex-col gap-4" data-astro-cid-5hgwyhda> <div class="flex items-center justify-between" data-astro-cid-5hgwyhda> <div data-astro-cid-5hgwyhda> <h2 class="text-lg md:text-xl font-semibold" data-astro-cid-5hgwyhda>${resultado.wodTitulo}</h2> <p class="text-sm text-gray-600 dark:text-gray-400" data-astro-cid-5hgwyhda> ${format(resultado.fecha, "d 'de' MMMM 'de' yyyy", { locale: es })} </p> </div> <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"${addAttribute(`toggleResultadoDetalles('${resultado.id}')`, "onclick")} data-astro-cid-5hgwyhda> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5hgwyhda> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-5hgwyhda></path> </svg> </button> </div> <div${addAttribute(`detalles-${resultado.id}`, "id")} class="hidden space-y-2" data-astro-cid-5hgwyhda> ${resultado.tiempo && renderTemplate`<div class="flex items-center gap-2" data-astro-cid-5hgwyhda> <svg class="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5hgwyhda> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-5hgwyhda></path> </svg> <span data-astro-cid-5hgwyhda>Tiempo: ${resultado.tiempo}</span> </div>`} ${resultado.rondas && renderTemplate`<div class="flex items-center gap-2" data-astro-cid-5hgwyhda> <svg class="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5hgwyhda> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-astro-cid-5hgwyhda></path> </svg> <span data-astro-cid-5hgwyhda>Rondas: ${resultado.rondas}</span> </div>`} ${resultado.repeticiones && renderTemplate`<div class="flex items-center gap-2" data-astro-cid-5hgwyhda> <svg class="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5hgwyhda> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-astro-cid-5hgwyhda></path> </svg> <span data-astro-cid-5hgwyhda>Repeticiones: ${resultado.repeticiones}</span> </div>`} ${resultado.peso && renderTemplate`<div class="flex items-center gap-2" data-astro-cid-5hgwyhda> <svg class="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5hgwyhda> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" data-astro-cid-5hgwyhda></path> </svg> <span data-astro-cid-5hgwyhda>Peso: ${resultado.peso}kg</span> </div>`} ${resultado.notas && renderTemplate`<div class="mt-4" data-astro-cid-5hgwyhda> <p class="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line" data-astro-cid-5hgwyhda> ${resultado.notas} </p> </div>`} </div> </div> </div>`)} </div>`} </div> <!-- Barra de navegación inferior --> <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50" data-astro-cid-5hgwyhda> <div class="max-w-4xl mx-auto px-4" data-astro-cid-5hgwyhda> <div class="flex justify-around items-center h-16" data-astro-cid-5hgwyhda> <a href="/" class="flex flex-col items-center justify-center flex-1 h-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-5hgwyhda> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5hgwyhda> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-5hgwyhda></path> </svg> <span class="text-xs mt-1" data-astro-cid-5hgwyhda>WODs</span> </a> <a href="/resultados" class="flex flex-col items-center justify-center flex-1 h-full text-sky-500 dark:text-sky-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-5hgwyhda> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5hgwyhda> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-astro-cid-5hgwyhda></path> </svg> <span class="text-xs mt-1" data-astro-cid-5hgwyhda>Resultados</span> </a> <a href="/prs" class="flex flex-col items-center justify-center flex-1 h-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-5hgwyhda> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-5hgwyhda> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-astro-cid-5hgwyhda></path> </svg> <span class="text-xs mt-1" data-astro-cid-5hgwyhda>PRs</span> </a> </div> </div> </nav> </div> ` })}  `;
}, "/Users/miguelpitarch/Desktop/program/src/pages/resultados.astro", void 0);

const $$file = "/Users/miguelpitarch/Desktop/program/src/pages/resultados.astro";
const $$url = "/resultados";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Resultados,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
