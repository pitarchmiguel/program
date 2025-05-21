/* empty css                                  */
import { c as createComponent, a as createAstro, r as renderTemplate, b as addAttribute, d as renderHead } from '../../chunks/astro/server_thY1q-tL.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { d as db } from '../../chunks/firebase_79n_BlYZ.mjs';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { format, parseISO } from 'date-fns';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const id = Astro2.url.pathname.split("/").pop();
  console.log("ID del workout:", id);
  if (!id) {
    console.error("No se proporcion\xF3 ID");
    return Astro2.redirect("/edit");
  }
  let workoutData = null;
  let isLoading = true;
  let error = null;
  try {
    console.log("Verificando conexi\xF3n con Firestore...");
    const workoutsCollection = collection(db, "workouts");
    const snapshot = await getDocs(workoutsCollection);
    console.log("N\xFAmero total de documentos en la colecci\xF3n:", snapshot.size);
    const allIds = snapshot.docs.map((doc2) => doc2.id);
    console.log("IDs disponibles en la colecci\xF3n:", allIds);
    console.log("Intentando obtener el documento con ID:", id);
    const docRef = doc(db, "workouts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Datos del workout:", data);
      workoutData = {
        id: docSnap.id,
        date: format(parseISO(data.date), "yyyy-MM-dd"),
        letter: data.letter,
        title: data.title,
        description: data.description?.replace(/<br>/g, "\n") || "",
        notes: data.notes?.replace(/<br>/g, "\n") || ""
      };
      console.log("Datos procesados:", workoutData);
    } else {
      console.error("No se encontr\xF3 el workout con ID:", id);
      console.error("Documento no existe en la colecci\xF3n workouts");
      console.error("IDs disponibles:", allIds);
      error = "No se encontr\xF3 el entrenamiento";
    }
  } catch (error2) {
    console.error("Error al obtener el workout:", error2);
    console.error("Detalles del error:", {
      message: error2.message,
      code: error2.code,
      stack: error2.stack
    });
    error2 = "Error al cargar el entrenamiento";
  } finally {
    isLoading = false;
  }
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="dark"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', '><title>Editar Entrenamiento</title><script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" defer><\/script>', '</head> <body class="w-full h-full flex flex-col bg-white dark:bg-[#242424] text-gray-900 dark:text-[#f9f9f9] transition-colors duration-300"> <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"> <nav class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div class="flex h-16 items-center justify-between"> <div class="flex items-center gap-4"> <a href="/edit" class="text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> </a> <h1 class="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">Editar Entrenamiento</h1> </div> <div class="flex items-center gap-4"> <button id="themeToggle" class="p-2 rounded-xl bg-white/80 dark:bg-gray-700/80 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105" aria-label="Cambiar tema"> <svg class="w-5 h-5 hidden dark:block text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> <svg class="w-5 h-5 block dark:hidden text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </button> </div> </div> </div> </nav> <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"> <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"> ', " </div> </main> </div> <script>\n            // Tema\n            const themeToggle = document.getElementById('themeToggle');\n            themeToggle.addEventListener('click', () => {\n                if (document.documentElement.classList.contains('dark')) {\n                    document.documentElement.classList.remove('dark');\n                    localStorage.theme = 'light';\n                } else {\n                    document.documentElement.classList.add('dark');\n                    localStorage.theme = 'dark';\n                }\n            });\n\n            // Manejar el env\xEDo del formulario\n            document.addEventListener('DOMContentLoaded', function() {\n                const form = document.getElementById('workoutForm');\n                if (form) {\n                    form.addEventListener('submit', async function(e) {\n                        e.preventDefault();\n                        \n                        const formData = {\n                            id: document.getElementById('workoutId').value,\n                            date: document.getElementById('workoutDate').value,\n                            letter: document.getElementById('workoutLetter').value,\n                            title: document.getElementById('workoutTitle').value,\n                            description: document.getElementById('workoutDescription').value,\n                            notes: document.getElementById('workoutNotes').value\n                        };\n\n                        try {\n                            const response = await fetch('/api/updateWorkout', {\n                                method: 'POST',\n                                headers: {\n                                    'Content-Type': 'application/json'\n                                },\n                                body: JSON.stringify(formData)\n                            });\n\n                            const data = await response.json();\n\n                            if (!response.ok) {\n                                throw new Error(data.error || 'Error en la respuesta del servidor');\n                            }\n\n                            // Esperar a que SweetAlert2 est\xE9 cargado\n                            if (typeof Swal === 'undefined') {\n                                await new Promise(resolve => {\n                                    const checkSwal = setInterval(() => {\n                                        if (typeof Swal !== 'undefined') {\n                                            clearInterval(checkSwal);\n                                            resolve();\n                                        }\n                                    }, 100);\n                                });\n                            }\n\n                            await Swal.fire({\n                                title: '\xA1\xC9xito!',\n                                text: 'Los cambios se han guardado correctamente',\n                                icon: 'success',\n                                confirmButtonColor: '#0ea5e9',\n                                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',\n                                color: document.documentElement.classList.contains('dark') ? '#f9f9f9' : '#111827',\n                                customClass: {\n                                    confirmButton: 'swal2-confirm-custom'\n                                }\n                            });\n\n                            window.location.href = '/edit';\n                        } catch (error) {\n                            console.error('Error al guardar los cambios:', error);\n                            \n                            // Esperar a que SweetAlert2 est\xE9 cargado\n                            if (typeof Swal === 'undefined') {\n                                await new Promise(resolve => {\n                                    const checkSwal = setInterval(() => {\n                                        if (typeof Swal !== 'undefined') {\n                                            clearInterval(checkSwal);\n                                            resolve();\n                                        }\n                                    }, 100);\n                                });\n                            }\n\n                            await Swal.fire({\n                                title: 'Error',\n                                text: 'Error al guardar los cambios: ' + error.message,\n                                icon: 'error',\n                                confirmButtonColor: '#0ea5e9',\n                                background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',\n                                color: document.documentElement.classList.contains('dark') ? '#f9f9f9' : '#111827',\n                                customClass: {\n                                    confirmButton: 'swal2-confirm-custom'\n                                }\n                            });\n                        }\n                    });\n                }\n            });\n        <\/script>  </body> </html>"])), addAttribute(Astro2.generator, "content"), renderHead(), isLoading ? renderTemplate`<div class="text-center py-12"> <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent"></div> <p class="mt-4 text-gray-600 dark:text-gray-400">Cargando entrenamiento...</p> </div>` : error ? renderTemplate`<div class="text-center py-12"> <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 mb-4"> <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">${error}</p> <a href="/edit" class="inline-flex items-center text-sky-500 hover:text-sky-400 transition-colors duration-200"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Volver a la lista
</a> </div>` : workoutData ? renderTemplate`<form id="workoutForm" class="space-y-6" method="POST"> <input type="hidden" id="workoutId" name="workoutId"${addAttribute(workoutData.id, "value")}> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <label for="workoutDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha</label> <input type="date" id="workoutDate" name="workoutDate"${addAttribute(workoutData.date, "value")} required class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 transition-all duration-200"> </div> <div class="flex gap-4"> <div class="w-16"> <label for="workoutLetter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Letra</label> <input type="text" id="workoutLetter" name="workoutLetter"${addAttribute(workoutData.letter, "value")} maxlength="1" required class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 transition-all duration-200"> </div> <div class="flex-1"> <label for="workoutTitle" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label> <input type="text" id="workoutTitle" name="workoutTitle"${addAttribute(workoutData.title, "value")} required class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 transition-all duration-200"> </div> </div> </div> <div> <label for="workoutDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Workout</label> <textarea id="workoutDescription" name="workoutDescription" rows="7" required class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 transition-all duration-200">${workoutData.description}</textarea> </div> <div> <label for="workoutNotes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notas</label> <textarea id="workoutNotes" name="workoutNotes" rows="4" class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 transition-all duration-200">${workoutData.notes}</textarea> </div> <div class="flex justify-between pt-4"> <a href="/edit" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Cancelar
</a> <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"> <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg>
Guardar cambios
</button> </div> </form>` : renderTemplate`<div class="text-center py-12"> <p class="text-xl text-gray-400 mb-4">Error al cargar el entrenamiento</p> <a href="/edit" class="text-sky-500 hover:text-sky-400">Volver a la lista</a> </div>`);
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
