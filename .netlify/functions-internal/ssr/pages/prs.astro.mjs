/* empty css                               */
import { c as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_thY1q-tL.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DH1-w1yW.mjs';
import { d as db } from '../chunks/firebase_79n_BlYZ.mjs';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';
/* empty css                               */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Prs = createComponent(async ($$result, $$props, $$slots) => {
  const ejerciciosPR = {
    "Squats": [
      "Back Squat",
      "Front Squat",
      "Overhead Squat"
    ],
    "Cleans": [
      "Clean",
      "Hang Power Clean",
      "Muscle Clean",
      "Power Clean",
      "Squat Clean"
    ],
    "Presses": [
      "Bench Press",
      "Cluster",
      "Push Press",
      "Shoulder Press",
      "Thruster"
    ],
    "Jerks": [
      "Push Jerk",
      "Split Jerk"
    ],
    "Snatches": [
      "Hang Power Snatch",
      "Hang Squat Snatch",
      "Muscle Snatch",
      "Power Snatch",
      "Snatch",
      "Snatch Balance",
      "Squat Snatch"
    ],
    "Deadlifts": [
      "Deadlift",
      "Snatch Grip Deadlift"
    ],
    "Olympic Lifts": [
      "Clean and Jerk",
      "Power Clean and Jerk"
    ]
  };
  let prs = [];
  let isLoading = true;
  let error = null;
  try {
    const prsCollection = collection(db, "prs");
    const q = query(prsCollection, orderBy("fecha", "desc"));
    const querySnapshot = await getDocs(q);
    prs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        fecha: parseISO(data.fecha),
        ejercicio: data.ejercicio,
        categoria: data.categoria,
        valor: data.valor,
        unidad: data.unidad,
        notas: data.notas
      };
    });
  } catch (err) {
    console.error("Error al obtener los PRs:", err);
    error = "Error al cargar los PRs";
  } finally {
    isLoading = false;
  }
  const prsPorCategoria = prs.reduce((acc, pr) => {
    if (!acc[pr.categoria]) {
      acc[pr.categoria] = [];
    }
    acc[pr.categoria].push(pr);
    return acc;
  }, {});
  return renderTemplate(_a || (_a = __template(["", " <script>\n    let modalAbierto = false;\n\n    function mostrarFormularioNuevoPR(categoria, ejercicio) {\n        const modal = document.getElementById('modalNuevoPR');\n        const modalTitulo = document.getElementById('modalTitulo');\n        const categoriaInput = document.getElementById('categoria');\n        const ejercicioInput = document.getElementById('ejercicio');\n        const fechaInput = document.getElementById('fecha');\n        \n        if (!modal || !modalTitulo || !categoriaInput || !ejercicioInput || !fechaInput) {\n            console.error('No se encontraron algunos elementos del modal');\n            return;\n        }\n        \n        modalTitulo.textContent = `Nuevo PR - ${ejercicio}`;\n        categoriaInput.value = categoria;\n        ejercicioInput.value = ejercicio;\n        fechaInput.value = new Date().toISOString().split('T')[0];\n        \n        modal.classList.remove('hidden');\n        modal.classList.add('flex');\n        modalAbierto = true;\n        \n        // Prevenir scroll del body\n        document.body.style.overflow = 'hidden';\n    }\n\n    function cerrarModal() {\n        const modal = document.getElementById('modalNuevoPR');\n        if (!modal) return;\n        \n        modal.classList.add('hidden');\n        modal.classList.remove('flex');\n        modalAbierto = false;\n        \n        // Restaurar scroll del body\n        document.body.style.overflow = '';\n    }\n\n    async function guardarPR(event) {\n        event.preventDefault();\n        \n        const form = event.target;\n        const formData = new FormData(form);\n        \n        const prData = {\n            categoria: formData.get('categoria'),\n            ejercicio: formData.get('ejercicio'),\n            valor: parseFloat(formData.get('valor')),\n            unidad: 'kg',\n            fecha: formData.get('fecha'),\n            notas: formData.get('notas') || null\n        };\n\n        try {\n            // Importar las funciones necesarias din\xE1micamente\n            const { collection, addDoc } = await import('firebase/firestore');\n            const { db } = await import('../firebase');\n            \n            const prsCollection = collection(db, \"prs\");\n            await addDoc(prsCollection, prData);\n            \n            // Cerrar modal y recargar p\xE1gina\n            cerrarModal();\n            window.location.reload();\n        } catch (error) {\n            console.error('Error al guardar el PR:', error);\n            alert('Error al guardar el PR. Por favor, int\xE9ntalo de nuevo.');\n        }\n    }\n\n    // Inicializar eventos cuando el DOM est\xE9 listo\n    document.addEventListener('DOMContentLoaded', () => {\n        // Cerrar modal al hacer clic fuera\n        const modal = document.getElementById('modalNuevoPR');\n        if (modal) {\n            modal.addEventListener('click', (event) => {\n                if (event.target === modal) {\n                    cerrarModal();\n                }\n            });\n        }\n\n        // Cerrar modal con Escape\n        document.addEventListener('keydown', (event) => {\n            if (event.key === 'Escape' && modalAbierto) {\n                cerrarModal();\n            }\n        });\n    });\n<\/script> "], ["", " <script>\n    let modalAbierto = false;\n\n    function mostrarFormularioNuevoPR(categoria, ejercicio) {\n        const modal = document.getElementById('modalNuevoPR');\n        const modalTitulo = document.getElementById('modalTitulo');\n        const categoriaInput = document.getElementById('categoria');\n        const ejercicioInput = document.getElementById('ejercicio');\n        const fechaInput = document.getElementById('fecha');\n        \n        if (!modal || !modalTitulo || !categoriaInput || !ejercicioInput || !fechaInput) {\n            console.error('No se encontraron algunos elementos del modal');\n            return;\n        }\n        \n        modalTitulo.textContent = \\`Nuevo PR - \\${ejercicio}\\`;\n        categoriaInput.value = categoria;\n        ejercicioInput.value = ejercicio;\n        fechaInput.value = new Date().toISOString().split('T')[0];\n        \n        modal.classList.remove('hidden');\n        modal.classList.add('flex');\n        modalAbierto = true;\n        \n        // Prevenir scroll del body\n        document.body.style.overflow = 'hidden';\n    }\n\n    function cerrarModal() {\n        const modal = document.getElementById('modalNuevoPR');\n        if (!modal) return;\n        \n        modal.classList.add('hidden');\n        modal.classList.remove('flex');\n        modalAbierto = false;\n        \n        // Restaurar scroll del body\n        document.body.style.overflow = '';\n    }\n\n    async function guardarPR(event) {\n        event.preventDefault();\n        \n        const form = event.target;\n        const formData = new FormData(form);\n        \n        const prData = {\n            categoria: formData.get('categoria'),\n            ejercicio: formData.get('ejercicio'),\n            valor: parseFloat(formData.get('valor')),\n            unidad: 'kg',\n            fecha: formData.get('fecha'),\n            notas: formData.get('notas') || null\n        };\n\n        try {\n            // Importar las funciones necesarias din\xE1micamente\n            const { collection, addDoc } = await import('firebase/firestore');\n            const { db } = await import('../firebase');\n            \n            const prsCollection = collection(db, \"prs\");\n            await addDoc(prsCollection, prData);\n            \n            // Cerrar modal y recargar p\xE1gina\n            cerrarModal();\n            window.location.reload();\n        } catch (error) {\n            console.error('Error al guardar el PR:', error);\n            alert('Error al guardar el PR. Por favor, int\xE9ntalo de nuevo.');\n        }\n    }\n\n    // Inicializar eventos cuando el DOM est\xE9 listo\n    document.addEventListener('DOMContentLoaded', () => {\n        // Cerrar modal al hacer clic fuera\n        const modal = document.getElementById('modalNuevoPR');\n        if (modal) {\n            modal.addEventListener('click', (event) => {\n                if (event.target === modal) {\n                    cerrarModal();\n                }\n            });\n        }\n\n        // Cerrar modal con Escape\n        document.addEventListener('keydown', (event) => {\n            if (event.key === 'Escape' && modalAbierto) {\n                cerrarModal();\n            }\n        });\n    });\n<\/script> "])), renderComponent($$result, "Layout", $$Layout, { "title": "PRs - La Program", "data-astro-cid-vt7y5kak": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-[#f9f9f9] transition-colors duration-300" data-astro-cid-vt7y5kak> <div class="w-full h-full my-4 md:my-8 px-4 md:p-6 max-w-4xl mx-auto pb-20" data-astro-cid-vt7y5kak> <div class="mb-8" data-astro-cid-vt7y5kak> <h1 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text" data-astro-cid-vt7y5kak>
Mis PRs
</h1> <p class="text-gray-600 dark:text-gray-400 mt-2" data-astro-cid-vt7y5kak>
Registro de tus mejores marcas personales
</p> </div> <!-- Grid de ejercicios --> <div class="mb-8" data-astro-cid-vt7y5kak> ${Object.entries(ejerciciosPR).map(([categoria, ejercicios]) => renderTemplate`<div class="mb-6" data-astro-cid-vt7y5kak> <div class="flex items-center mb-2" data-astro-cid-vt7y5kak> <span class="font-bold text-lg" data-astro-cid-vt7y5kak>${categoria}</span> </div> <div class="divide-y divide-gray-200 dark:divide-gray-700" data-astro-cid-vt7y5kak> ${ejercicios.map((ejercicio) => renderTemplate`<div class="py-2 px-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"${addAttribute(`mostrarFormularioNuevoPR('${categoria}', '${ejercicio}')`, "onclick")} data-astro-cid-vt7y5kak> <span class="text-base text-gray-800 dark:text-gray-100" data-astro-cid-vt7y5kak>${ejercicio}</span> </div>`)} </div> </div>`)} </div> <!-- Lista de PRs registrados --> <h2 class="text-xl font-semibold mb-4" data-astro-cid-vt7y5kak>PRs Registrados</h2> ${isLoading ? renderTemplate`<div class="text-center animate-fade-in" data-astro-cid-vt7y5kak> <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent" data-astro-cid-vt7y5kak></div> <p class="text-lg md:text-xl text-gray-400 dark:text-gray-500 mt-4" data-astro-cid-vt7y5kak>Cargando PRs...</p> </div>` : error ? renderTemplate`<div class="text-center animate-fade-in" data-astro-cid-vt7y5kak> <p class="text-lg md:text-xl text-red-500 dark:text-red-400 mb-4" data-astro-cid-vt7y5kak>${error}</p> </div>` : prs.length === 0 ? renderTemplate`<div class="text-center py-8 animate-fade-in" data-astro-cid-vt7y5kak> <p class="text-gray-500 dark:text-gray-400" data-astro-cid-vt7y5kak>No hay PRs registrados aún</p> </div>` : renderTemplate`<div class="space-y-8" data-astro-cid-vt7y5kak> ${Object.entries(prsPorCategoria).map(([categoria, prs2]) => renderTemplate`<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" data-astro-cid-vt7y5kak> <div class="p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white" data-astro-cid-vt7y5kak> <h2 class="text-lg font-semibold" data-astro-cid-vt7y5kak>${categoria}</h2> </div> <div class="p-4 space-y-4" data-astro-cid-vt7y5kak> ${prs2.map((pr) => renderTemplate`<div class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-vt7y5kak> <div class="flex-1" data-astro-cid-vt7y5kak> <h3 class="font-medium" data-astro-cid-vt7y5kak>${pr.ejercicio}</h3> <p class="text-sm text-gray-600 dark:text-gray-400" data-astro-cid-vt7y5kak> ${format(pr.fecha, "d 'de' MMMM 'de' yyyy", { locale: es })} </p> ${pr.notas && renderTemplate`<p class="text-sm text-gray-500 dark:text-gray-400 mt-1" data-astro-cid-vt7y5kak> ${pr.notas} </p>`} </div> <div class="ml-4 text-right" data-astro-cid-vt7y5kak> <span class="text-lg font-bold text-sky-500 dark:text-sky-400" data-astro-cid-vt7y5kak> ${pr.valor}${pr.unidad} </span> </div> </div>`)} </div> </div>`)} </div>`} </div> <!-- Modal para añadir nuevo PR --> <div id="modalNuevoPR" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" data-astro-cid-vt7y5kak> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 transform transition-all" data-astro-cid-vt7y5kak> <div class="p-6" data-astro-cid-vt7y5kak> <div class="flex justify-between items-center mb-4" data-astro-cid-vt7y5kak> <h3 class="text-xl font-semibold" id="modalTitulo" data-astro-cid-vt7y5kak>Nuevo PR</h3> <button onclick="cerrarModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" data-astro-cid-vt7y5kak> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-vt7y5kak> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-vt7y5kak></path> </svg> </button> </div> <form id="formNuevoPR" onsubmit="guardarPR(event)" class="space-y-4" data-astro-cid-vt7y5kak> <input type="hidden" id="categoria" name="categoria" data-astro-cid-vt7y5kak> <input type="hidden" id="ejercicio" name="ejercicio" data-astro-cid-vt7y5kak> <div data-astro-cid-vt7y5kak> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" data-astro-cid-vt7y5kak>
Peso (kg)
</label> <input type="number" id="valor" name="valor" step="0.5" min="0" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white" data-astro-cid-vt7y5kak> </div> <div data-astro-cid-vt7y5kak> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" data-astro-cid-vt7y5kak>
Fecha
</label> <input type="date" id="fecha" name="fecha" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white" data-astro-cid-vt7y5kak> </div> <div data-astro-cid-vt7y5kak> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" data-astro-cid-vt7y5kak>
Notas (opcional)
</label> <textarea id="notas" name="notas" rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white" data-astro-cid-vt7y5kak></textarea> </div> <div class="flex justify-end gap-3 mt-6" data-astro-cid-vt7y5kak> <button type="button" onclick="cerrarModal()" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300" data-astro-cid-vt7y5kak>
Cancelar
</button> <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-colors duration-300" data-astro-cid-vt7y5kak>
Guardar PR
</button> </div> </form> </div> </div> </div> <!-- Barra de navegación inferior --> <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50" data-astro-cid-vt7y5kak> <div class="max-w-4xl mx-auto px-4" data-astro-cid-vt7y5kak> <div class="flex justify-around items-center h-16" data-astro-cid-vt7y5kak> <a href="/" class="flex flex-col items-center justify-center flex-1 h-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-vt7y5kak> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-vt7y5kak> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-vt7y5kak></path> </svg> <span class="text-xs mt-1" data-astro-cid-vt7y5kak>WODs</span> </a> <a href="/resultados" class="flex flex-col items-center justify-center flex-1 h-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-vt7y5kak> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-vt7y5kak> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-astro-cid-vt7y5kak></path> </svg> <span class="text-xs mt-1" data-astro-cid-vt7y5kak>Resultados</span> </a> <a href="/prs" class="flex flex-col items-center justify-center flex-1 h-full text-sky-500 dark:text-sky-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-vt7y5kak> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-vt7y5kak> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-astro-cid-vt7y5kak></path> </svg> <span class="text-xs mt-1" data-astro-cid-vt7y5kak>PRs</span> </a> </div> </div> </nav> </div> ` }));
}, "/Users/miguelpitarch/Desktop/program/src/pages/prs.astro", void 0);

const $$file = "/Users/miguelpitarch/Desktop/program/src/pages/prs.astro";
const $$url = "/prs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Prs,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
