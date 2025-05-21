/* empty css                               */
import { c as createComponent, a as createAstro, r as renderTemplate, b as addAttribute, d as renderHead } from '../chunks/astro/server_thY1q-tL.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { addDays, eachDayOfInterval, startOfWeek, parseISO, subWeeks, addWeeks, format, startOfDay, endOfDay, isSameDay } from 'date-fns';
import { d as db } from '../chunks/firebase_79n_BlYZ.mjs';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { es } from 'date-fns/locale';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const startDate = /* @__PURE__ */ new Date();
  const endDate = addDays(startDate, 4);
  eachDayOfInterval({ start: startDate, end: endDate });
  let selectedDate = /* @__PURE__ */ new Date();
  let currentWeekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  let workouts = [];
  let isLoading = true;
  const url = new URL(Astro2.request.url);
  const dateParam = url.searchParams.get("date");
  if (dateParam) {
    selectedDate = parseISO(dateParam);
    currentWeekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  }
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  const prevWeekStart = subWeeks(currentWeekStart, 1);
  const nextWeekStart = addWeeks(currentWeekStart, 1);
  [
    ...Array.from({ length: 7 }, (_, i) => addDays(prevWeekStart, i)),
    ...weekDays,
    ...Array.from({ length: 7 }, (_, i) => addDays(nextWeekStart, i))
  ];
  format(prevWeekStart, "yyyy-MM-dd");
  format(addDays(nextWeekStart, 6), "yyyy-MM-dd");
  try {
    console.log("Obteniendo lista de workouts...");
    const workoutsCollection = collection(db, "workouts");
    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);
    const q = query(
      workoutsCollection,
      where("date", ">=", format(dayStart, "yyyy-MM-dd")),
      where("date", "<=", format(dayEnd, "yyyy-MM-dd")),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    workouts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        date: parseISO(data.date),
        letter: data.letter,
        title: data.title,
        description: data.description?.replace(/<br>/g, "\n") || "",
        notes: data.notes?.replace(/<br>/g, "\n") || ""
      };
    });
  } catch (error2) {
    console.error("Error al obtener los workouts:", error2);
    error2 = "Error al cargar los entrenamientos";
  } finally {
    isLoading = false;
  }
  const selectedDayWorkouts = workouts.filter((workout) => isSameDay(workout.date, selectedDate)).sort((a, b) => a.letter.localeCompare(b.letter));
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="dark" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', '><meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)"><meta name="theme-color" content="#f9fafb" media="(prefers-color-scheme: light)"><title>La Program</title><style>\n            .fade-enter {\n                opacity: 0;\n                transform: translateY(10px);\n            }\n            .fade-enter-active {\n                opacity: 1;\n                transform: translateY(0);\n                transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;\n            }\n            .fade-exit {\n                opacity: 1;\n                transform: translateY(0);\n            }\n            .fade-exit-active {\n                opacity: 0;\n                transform: translateY(-10px);\n                transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;\n            }\n            .page-transition {\n                transition: opacity 300ms ease-in-out;\n            }\n            .page-transition.loading {\n                opacity: 0.5;\n                pointer-events: none;\n            }\n        </style>', '</head> <body class="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-[#f9f9f9] transition-colors duration-300" data-astro-cid-j7pv25f6> <div id="app" class="w-full h-full my-4 md:my-8 px-4 md:p-6 max-w-4xl mx-auto page-transition pb-20" data-astro-cid-j7pv25f6>  <div class="relative overflow-hidden mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4" data-astro-cid-j7pv25f6> <div class="flex justify-between items-center mb-4" data-astro-cid-j7pv25f6> <div class="flex items-center" data-astro-cid-j7pv25f6> <button id="prevWeek" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-j7pv25f6></path> </svg> </button> <span id="currentWeek" class="mx-4 text-base md:text-lg font-semibold" data-astro-cid-j7pv25f6> ', ' </span> <button id="nextWeek" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-j7pv25f6></path> </svg> </button> </div> <button id="themeToggle" class="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300" aria-label="Cambiar tema" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 md:w-6 md:h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" data-astro-cid-j7pv25f6></path> </svg> <svg class="w-5 h-5 md:w-6 md:h-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-astro-cid-j7pv25f6></path> </svg> </button> </div> <div class="grid grid-cols-7 gap-1 md:gap-2" id="weekNavigation" data-astro-cid-j7pv25f6> ', ' </div> </div> <div id="workoutsContainer" data-astro-cid-j7pv25f6> ', ` </div> </div> <!-- Barra de navegaci\xF3n inferior --> <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50" data-astro-cid-j7pv25f6> <div class="max-w-4xl mx-auto px-4" data-astro-cid-j7pv25f6> <div class="flex justify-around items-center h-16" data-astro-cid-j7pv25f6> <a href="/" class="flex flex-col items-center justify-center flex-1 h-full text-sky-500 dark:text-sky-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-j7pv25f6> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-j7pv25f6></path> </svg> <span class="text-xs mt-1" data-astro-cid-j7pv25f6>WODs</span> </a> <div class="flex flex-col items-center justify-center flex-1 h-full text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50" data-astro-cid-j7pv25f6> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-astro-cid-j7pv25f6></path> </svg> <span class="text-xs mt-1" data-astro-cid-j7pv25f6>Resultados</span> </div> <div class="flex flex-col items-center justify-center flex-1 h-full text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50" data-astro-cid-j7pv25f6> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-astro-cid-j7pv25f6></path> </svg> <span class="text-xs mt-1" data-astro-cid-j7pv25f6>PRs</span> </div> </div> </div> </nav> <script>
            // Funciones de utilidad para fechas
            function parseDate(dateStr) {
                if (!dateStr) return new Date();
                const [year, month, day] = dateStr.split('-').map(Number);
                const date = new Date(year, month - 1, day);
                return date;
            }

            function getCurrentDateFromUrl() {
                const params = new URLSearchParams(window.location.search);
                const dateStr = params.get('date');
                return dateStr ? parseDate(dateStr) : new Date();
            }

            function formatDate(date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return \`\${year}-\${month}-\${day}\`;
            }

            function getStartOfWeek(date) {
                const result = new Date(date);
                const day = result.getDay();
                const diff = result.getDate() - day + (day === 0 ? -6 : 1);
                result.setDate(diff);
                return result;
            }

            function addWeeks(date, weeks) {
                const result = new Date(date);
                result.setDate(result.getDate() + weeks * 7);
                return result;
            }

            function subWeeks(date, weeks) {
                const result = new Date(date);
                result.setDate(result.getDate() - weeks * 7);
                return result;
            }

            function updateWeekDisplay(date) {
                const weekStart = getStartOfWeek(date);
                const month = weekStart.toLocaleString('es', { month: 'long' });
                const year = weekStart.getFullYear();
                currentWeekEl.textContent = \`\${month} \${year}\`;
            }

            // Tema
            const themeToggle = document.getElementById('themeToggle');
            themeToggle.addEventListener('click', () => {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f9fafb');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1f2937');
                }
            });

            // Navegaci\xF3n de la semana
            const weekNavigation = document.getElementById('weekNavigation');
            const prevWeekBtn = document.getElementById('prevWeek');
            const nextWeekBtn = document.getElementById('nextWeek');
            const currentWeekEl = document.getElementById('currentWeek');
            
            let isNavigating = false;
            const app = document.getElementById('app');
            const workoutsContainer = document.getElementById('workoutsContainer');

            function getWeekDates(date) {
                const monday = new Date(date);
                monday.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
                
                const dates = [];
                for (let i = 0; i < 7; i++) {
                    const day = new Date(monday);
                    day.setDate(monday.getDate() + i);
                    dates.push(day);
                }
                return dates;
            }

            async function navigateToDate(targetDate) {
                if (isNavigating) return;
                isNavigating = true;
                app.classList.add('loading');

                try {
                    const formattedDate = formatDate(targetDate);
                    const response = await fetch(\`/?date=\${formattedDate}\`);
                    const html = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const newWorkouts = doc.getElementById('workoutsContainer');

                    // Actualizar mes y a\xF1o
                    const month = targetDate.toLocaleString('es', { month: 'long' });
                    const year = targetDate.getFullYear();
                    currentWeekEl.textContent = \`\${month} \${year}\`;

                    // Actualizar selecci\xF3n visual
                    document.querySelectorAll('#weekNavigation > div').forEach(day => {
                        const numberCircle = day.querySelector('div:last-child');
                        if (day.dataset.date === formattedDate) {
                            numberCircle.classList.add('bg-gradient-to-r', 'from-sky-500', 'to-blue-600', 'text-white', 'scale-110', 'shadow-md');
                            numberCircle.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-700');
                        } else {
                            numberCircle.classList.remove('bg-gradient-to-r', 'from-sky-500', 'to-blue-600', 'text-white', 'scale-110', 'shadow-md');
                            numberCircle.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-700');
                        }
                    });

                    // Actualizar contenido y URL
                    if (newWorkouts) {
                        workoutsContainer.classList.add('fade-exit');
                        setTimeout(() => {
                            workoutsContainer.innerHTML = newWorkouts.innerHTML;
                            workoutsContainer.classList.remove('fade-exit');
                            workoutsContainer.classList.add('fade-enter');
                            setTimeout(() => {
                                workoutsContainer.classList.remove('fade-enter');
                                // Actualizar la URL y recargar si es necesario
                                const currentUrl = new URL(window.location.href);
                                const currentDate = currentUrl.searchParams.get('date');
                                if (currentDate !== formattedDate) {
                                    window.location.href = \`/?date=\${formattedDate}\`;
                                }
                            }, 50);
                        }, 300);
                    }
                } catch (error) {
                    console.error('Error al navegar:', error);
                } finally {
                    isNavigating = false;
                    app.classList.remove('loading');
                }
            }

            // Navegaci\xF3n por botones
            prevWeekBtn.addEventListener('click', () => {
                const currentDate = getCurrentDateFromUrl();
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() - 7);
                navigateToDate(newDate);
            });

            nextWeekBtn.addEventListener('click', () => {
                const currentDate = getCurrentDateFromUrl();
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() + 7);
                navigateToDate(newDate);
            });

            // Click en d\xEDa
            async function handleDateClick(element) {
                const date = parseDate(element.dataset.date);
                navigateToDate(date);
            }

            // Eventos t\xE1ctiles
            let touchStartX = 0;
            weekNavigation.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });

            weekNavigation.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const swipeDistance = touchEndX - touchStartX;
                
                if (Math.abs(swipeDistance) < 50) return;
                
                const currentDate = getCurrentDateFromUrl();
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() + (swipeDistance < 0 ? 7 : -7));
                navigateToDate(newDate);
            });

            // Funci\xF3n para mostrar/ocultar notas
            window.toggleNotes = function(id) {
                const notesEl = document.getElementById(\`notes-\${id}\`);
                if (notesEl.classList.contains('hidden')) {
                    notesEl.classList.remove('hidden');
                } else {
                    notesEl.classList.add('hidden');
                }
            }

            // Funci\xF3n para manejar la completitud de los workouts
            window.toggleWorkoutCompletion = function(button) {
                const workoutId = button.dataset.workoutId;
                const checkIcon = button.querySelector('svg');
                const bgCircle = button.querySelector('div:nth-child(2)');
                const borderCircle = button.querySelector('div:first-child');
                const isCompleted = checkIcon.classList.contains('scale-100');
                
                if (!isCompleted) {
                    checkIcon.classList.remove('scale-0');
                    checkIcon.classList.add('scale-100');
                    bgCircle.classList.remove('opacity-0');
                    bgCircle.classList.add('opacity-100');
                    borderCircle.classList.remove('border-gray-300', 'dark:border-gray-600');
                    borderCircle.classList.add('border-green-500');
                    
                    // Obtener la posici\xF3n del bot\xF3n
                    const rect = button.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    
                    // Lanzar confeti desde la posici\xF3n del bot\xF3n
                    confetti({
                        particleCount: 30,
                        spread: 60,
                        origin: { 
                            x: x / window.innerWidth, 
                            y: y / window.innerHeight 
                        },
                        colors: ['#22c55e', '#16a34a', '#15803d'], // Tonos de verde
                        ticks: 100,
                        gravity: 1.5,
                        scalar: 0.8,
                        shapes: ["circle"],
                        disableForReducedMotion: true
                    });
                } else {
                    checkIcon.classList.remove('scale-100');
                    checkIcon.classList.add('scale-0');
                    bgCircle.classList.remove('opacity-100');
                    bgCircle.classList.add('opacity-0');
                    borderCircle.classList.remove('border-green-500');
                    borderCircle.classList.add('border-gray-300', 'dark:border-gray-600');
                }
                
                // Obtener el estado actual de localStorage
                let completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '{}');
                
                // Actualizar el estado para este workout
                completedWorkouts[workoutId] = !isCompleted;
                
                // Guardar en localStorage
                localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
            };

            // Funci\xF3n para inicializar el estado de los checkboxes
            function initializeWorkoutCompletion() {
                const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '{}');
                
                document.querySelectorAll('button[data-workout-id]').forEach(button => {
                    const workoutId = button.dataset.workoutId;
                    const checkIcon = button.querySelector('svg');
                    const bgCircle = button.querySelector('div:nth-child(2)');
                    const borderCircle = button.querySelector('div:first-child');
                    const isCompleted = completedWorkouts[workoutId] || false;
                    
                    if (isCompleted) {
                        checkIcon.classList.remove('scale-0');
                        checkIcon.classList.add('scale-100');
                        bgCircle.classList.remove('opacity-0');
                        bgCircle.classList.add('opacity-100');
                        borderCircle.classList.remove('border-gray-300', 'dark:border-gray-600');
                        borderCircle.classList.add('border-green-500');
                    }
                });
            }

            // Inicializar el estado cuando se carga la p\xE1gina
            document.addEventListener('DOMContentLoaded', function() {
                initializeWorkoutCompletion();
            });

            // A\xF1adir manejador para el evento popstate
            window.addEventListener('popstate', () => {
                const currentDate = getCurrentDateFromUrl();
                navigateToDate(currentDate);
            });

            // Inicializar la visualizaci\xF3n de la semana actual
            updateWeekDisplay(getCurrentDateFromUrl());
        <\/script>  </body> </html> `], ['<html lang="es" class="dark" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', '><meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)"><meta name="theme-color" content="#f9fafb" media="(prefers-color-scheme: light)"><title>La Program</title><style>\n            .fade-enter {\n                opacity: 0;\n                transform: translateY(10px);\n            }\n            .fade-enter-active {\n                opacity: 1;\n                transform: translateY(0);\n                transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;\n            }\n            .fade-exit {\n                opacity: 1;\n                transform: translateY(0);\n            }\n            .fade-exit-active {\n                opacity: 0;\n                transform: translateY(-10px);\n                transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;\n            }\n            .page-transition {\n                transition: opacity 300ms ease-in-out;\n            }\n            .page-transition.loading {\n                opacity: 0.5;\n                pointer-events: none;\n            }\n        </style>', '</head> <body class="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-[#f9f9f9] transition-colors duration-300" data-astro-cid-j7pv25f6> <div id="app" class="w-full h-full my-4 md:my-8 px-4 md:p-6 max-w-4xl mx-auto page-transition pb-20" data-astro-cid-j7pv25f6>  <div class="relative overflow-hidden mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4" data-astro-cid-j7pv25f6> <div class="flex justify-between items-center mb-4" data-astro-cid-j7pv25f6> <div class="flex items-center" data-astro-cid-j7pv25f6> <button id="prevWeek" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-j7pv25f6></path> </svg> </button> <span id="currentWeek" class="mx-4 text-base md:text-lg font-semibold" data-astro-cid-j7pv25f6> ', ' </span> <button id="nextWeek" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-j7pv25f6></path> </svg> </button> </div> <button id="themeToggle" class="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300" aria-label="Cambiar tema" data-astro-cid-j7pv25f6> <svg class="w-5 h-5 md:w-6 md:h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" data-astro-cid-j7pv25f6></path> </svg> <svg class="w-5 h-5 md:w-6 md:h-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-astro-cid-j7pv25f6></path> </svg> </button> </div> <div class="grid grid-cols-7 gap-1 md:gap-2" id="weekNavigation" data-astro-cid-j7pv25f6> ', ' </div> </div> <div id="workoutsContainer" data-astro-cid-j7pv25f6> ', ` </div> </div> <!-- Barra de navegaci\xF3n inferior --> <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50" data-astro-cid-j7pv25f6> <div class="max-w-4xl mx-auto px-4" data-astro-cid-j7pv25f6> <div class="flex justify-around items-center h-16" data-astro-cid-j7pv25f6> <a href="/" class="flex flex-col items-center justify-center flex-1 h-full text-sky-500 dark:text-sky-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300" data-astro-cid-j7pv25f6> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-j7pv25f6></path> </svg> <span class="text-xs mt-1" data-astro-cid-j7pv25f6>WODs</span> </a> <div class="flex flex-col items-center justify-center flex-1 h-full text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50" data-astro-cid-j7pv25f6> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-astro-cid-j7pv25f6></path> </svg> <span class="text-xs mt-1" data-astro-cid-j7pv25f6>Resultados</span> </div> <div class="flex flex-col items-center justify-center flex-1 h-full text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50" data-astro-cid-j7pv25f6> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-astro-cid-j7pv25f6></path> </svg> <span class="text-xs mt-1" data-astro-cid-j7pv25f6>PRs</span> </div> </div> </div> </nav> <script>
            // Funciones de utilidad para fechas
            function parseDate(dateStr) {
                if (!dateStr) return new Date();
                const [year, month, day] = dateStr.split('-').map(Number);
                const date = new Date(year, month - 1, day);
                return date;
            }

            function getCurrentDateFromUrl() {
                const params = new URLSearchParams(window.location.search);
                const dateStr = params.get('date');
                return dateStr ? parseDate(dateStr) : new Date();
            }

            function formatDate(date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return \\\`\\\${year}-\\\${month}-\\\${day}\\\`;
            }

            function getStartOfWeek(date) {
                const result = new Date(date);
                const day = result.getDay();
                const diff = result.getDate() - day + (day === 0 ? -6 : 1);
                result.setDate(diff);
                return result;
            }

            function addWeeks(date, weeks) {
                const result = new Date(date);
                result.setDate(result.getDate() + weeks * 7);
                return result;
            }

            function subWeeks(date, weeks) {
                const result = new Date(date);
                result.setDate(result.getDate() - weeks * 7);
                return result;
            }

            function updateWeekDisplay(date) {
                const weekStart = getStartOfWeek(date);
                const month = weekStart.toLocaleString('es', { month: 'long' });
                const year = weekStart.getFullYear();
                currentWeekEl.textContent = \\\`\\\${month} \\\${year}\\\`;
            }

            // Tema
            const themeToggle = document.getElementById('themeToggle');
            themeToggle.addEventListener('click', () => {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f9fafb');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1f2937');
                }
            });

            // Navegaci\xF3n de la semana
            const weekNavigation = document.getElementById('weekNavigation');
            const prevWeekBtn = document.getElementById('prevWeek');
            const nextWeekBtn = document.getElementById('nextWeek');
            const currentWeekEl = document.getElementById('currentWeek');
            
            let isNavigating = false;
            const app = document.getElementById('app');
            const workoutsContainer = document.getElementById('workoutsContainer');

            function getWeekDates(date) {
                const monday = new Date(date);
                monday.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
                
                const dates = [];
                for (let i = 0; i < 7; i++) {
                    const day = new Date(monday);
                    day.setDate(monday.getDate() + i);
                    dates.push(day);
                }
                return dates;
            }

            async function navigateToDate(targetDate) {
                if (isNavigating) return;
                isNavigating = true;
                app.classList.add('loading');

                try {
                    const formattedDate = formatDate(targetDate);
                    const response = await fetch(\\\`/?date=\\\${formattedDate}\\\`);
                    const html = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const newWorkouts = doc.getElementById('workoutsContainer');

                    // Actualizar mes y a\xF1o
                    const month = targetDate.toLocaleString('es', { month: 'long' });
                    const year = targetDate.getFullYear();
                    currentWeekEl.textContent = \\\`\\\${month} \\\${year}\\\`;

                    // Actualizar selecci\xF3n visual
                    document.querySelectorAll('#weekNavigation > div').forEach(day => {
                        const numberCircle = day.querySelector('div:last-child');
                        if (day.dataset.date === formattedDate) {
                            numberCircle.classList.add('bg-gradient-to-r', 'from-sky-500', 'to-blue-600', 'text-white', 'scale-110', 'shadow-md');
                            numberCircle.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-700');
                        } else {
                            numberCircle.classList.remove('bg-gradient-to-r', 'from-sky-500', 'to-blue-600', 'text-white', 'scale-110', 'shadow-md');
                            numberCircle.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-700');
                        }
                    });

                    // Actualizar contenido y URL
                    if (newWorkouts) {
                        workoutsContainer.classList.add('fade-exit');
                        setTimeout(() => {
                            workoutsContainer.innerHTML = newWorkouts.innerHTML;
                            workoutsContainer.classList.remove('fade-exit');
                            workoutsContainer.classList.add('fade-enter');
                            setTimeout(() => {
                                workoutsContainer.classList.remove('fade-enter');
                                // Actualizar la URL y recargar si es necesario
                                const currentUrl = new URL(window.location.href);
                                const currentDate = currentUrl.searchParams.get('date');
                                if (currentDate !== formattedDate) {
                                    window.location.href = \\\`/?date=\\\${formattedDate}\\\`;
                                }
                            }, 50);
                        }, 300);
                    }
                } catch (error) {
                    console.error('Error al navegar:', error);
                } finally {
                    isNavigating = false;
                    app.classList.remove('loading');
                }
            }

            // Navegaci\xF3n por botones
            prevWeekBtn.addEventListener('click', () => {
                const currentDate = getCurrentDateFromUrl();
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() - 7);
                navigateToDate(newDate);
            });

            nextWeekBtn.addEventListener('click', () => {
                const currentDate = getCurrentDateFromUrl();
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() + 7);
                navigateToDate(newDate);
            });

            // Click en d\xEDa
            async function handleDateClick(element) {
                const date = parseDate(element.dataset.date);
                navigateToDate(date);
            }

            // Eventos t\xE1ctiles
            let touchStartX = 0;
            weekNavigation.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });

            weekNavigation.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const swipeDistance = touchEndX - touchStartX;
                
                if (Math.abs(swipeDistance) < 50) return;
                
                const currentDate = getCurrentDateFromUrl();
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() + (swipeDistance < 0 ? 7 : -7));
                navigateToDate(newDate);
            });

            // Funci\xF3n para mostrar/ocultar notas
            window.toggleNotes = function(id) {
                const notesEl = document.getElementById(\\\`notes-\\\${id}\\\`);
                if (notesEl.classList.contains('hidden')) {
                    notesEl.classList.remove('hidden');
                } else {
                    notesEl.classList.add('hidden');
                }
            }

            // Funci\xF3n para manejar la completitud de los workouts
            window.toggleWorkoutCompletion = function(button) {
                const workoutId = button.dataset.workoutId;
                const checkIcon = button.querySelector('svg');
                const bgCircle = button.querySelector('div:nth-child(2)');
                const borderCircle = button.querySelector('div:first-child');
                const isCompleted = checkIcon.classList.contains('scale-100');
                
                if (!isCompleted) {
                    checkIcon.classList.remove('scale-0');
                    checkIcon.classList.add('scale-100');
                    bgCircle.classList.remove('opacity-0');
                    bgCircle.classList.add('opacity-100');
                    borderCircle.classList.remove('border-gray-300', 'dark:border-gray-600');
                    borderCircle.classList.add('border-green-500');
                    
                    // Obtener la posici\xF3n del bot\xF3n
                    const rect = button.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    
                    // Lanzar confeti desde la posici\xF3n del bot\xF3n
                    confetti({
                        particleCount: 30,
                        spread: 60,
                        origin: { 
                            x: x / window.innerWidth, 
                            y: y / window.innerHeight 
                        },
                        colors: ['#22c55e', '#16a34a', '#15803d'], // Tonos de verde
                        ticks: 100,
                        gravity: 1.5,
                        scalar: 0.8,
                        shapes: ["circle"],
                        disableForReducedMotion: true
                    });
                } else {
                    checkIcon.classList.remove('scale-100');
                    checkIcon.classList.add('scale-0');
                    bgCircle.classList.remove('opacity-100');
                    bgCircle.classList.add('opacity-0');
                    borderCircle.classList.remove('border-green-500');
                    borderCircle.classList.add('border-gray-300', 'dark:border-gray-600');
                }
                
                // Obtener el estado actual de localStorage
                let completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '{}');
                
                // Actualizar el estado para este workout
                completedWorkouts[workoutId] = !isCompleted;
                
                // Guardar en localStorage
                localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
            };

            // Funci\xF3n para inicializar el estado de los checkboxes
            function initializeWorkoutCompletion() {
                const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '{}');
                
                document.querySelectorAll('button[data-workout-id]').forEach(button => {
                    const workoutId = button.dataset.workoutId;
                    const checkIcon = button.querySelector('svg');
                    const bgCircle = button.querySelector('div:nth-child(2)');
                    const borderCircle = button.querySelector('div:first-child');
                    const isCompleted = completedWorkouts[workoutId] || false;
                    
                    if (isCompleted) {
                        checkIcon.classList.remove('scale-0');
                        checkIcon.classList.add('scale-100');
                        bgCircle.classList.remove('opacity-0');
                        bgCircle.classList.add('opacity-100');
                        borderCircle.classList.remove('border-gray-300', 'dark:border-gray-600');
                        borderCircle.classList.add('border-green-500');
                    }
                });
            }

            // Inicializar el estado cuando se carga la p\xE1gina
            document.addEventListener('DOMContentLoaded', function() {
                initializeWorkoutCompletion();
            });

            // A\xF1adir manejador para el evento popstate
            window.addEventListener('popstate', () => {
                const currentDate = getCurrentDateFromUrl();
                navigateToDate(currentDate);
            });

            // Inicializar la visualizaci\xF3n de la semana actual
            updateWeekDisplay(getCurrentDateFromUrl());
        <\/script>  </body> </html> `])), addAttribute(Astro2.generator, "content"), renderHead(), format(currentWeekStart, "MMMM yyyy", { locale: es }), weekDays.map((day, index) => renderTemplate`<div class="flex flex-col items-center justify-center py-2 text-center cursor-pointer"${addAttribute(format(day, "yyyy-MM-dd"), "data-date")} onclick="handleDateClick(this)" data-astro-cid-j7pv25f6> <div class="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400" data-astro-cid-j7pv25f6> ${format(day, "EEE", { locale: es })} </div> <div${addAttribute(`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${isSameDay(day, selectedDate) ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white scale-110 shadow-md" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`, "class")} data-astro-cid-j7pv25f6> <span class="text-base md:text-lg font-bold" data-astro-cid-j7pv25f6>${format(day, "d")}</span> </div> </div>`), isLoading ? renderTemplate`<div class="text-center animate-fade-in" data-astro-cid-j7pv25f6> <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent" data-astro-cid-j7pv25f6></div> <p class="text-lg md:text-xl text-gray-400 dark:text-gray-500 mt-4" data-astro-cid-j7pv25f6>Cargando entrenamientos...</p> </div>` : selectedDayWorkouts.length === 0 ? renderTemplate`<div class="text-center py-12 md:py-16 animate-fade-in" data-astro-cid-j7pv25f6> <div class="inline-block p-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white mb-4" data-astro-cid-j7pv25f6> <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-astro-cid-j7pv25f6></path> </svg> </div> <p class="text-2xl md:text-3xl font-bold text-gray-400 dark:text-gray-500" data-astro-cid-j7pv25f6>REST DAY 🤘</p> </div>` : renderTemplate`<div class="space-y-4" data-astro-cid-j7pv25f6> ${selectedDayWorkouts.map((workout) => renderTemplate`<div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" data-astro-cid-j7pv25f6> <div class="flex flex-col gap-4" data-astro-cid-j7pv25f6> <div class="flex flex-col gap-4" data-astro-cid-j7pv25f6> <div class="flex items-center justify-between" data-astro-cid-j7pv25f6> <div class="flex items-center gap-3" data-astro-cid-j7pv25f6> <span class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text" data-astro-cid-j7pv25f6>${workout.letter}</span> <h2 class="text-lg md:text-xl font-semibold" data-astro-cid-j7pv25f6>${workout.title}</h2> </div> <button class="w-6 h-6 flex items-center justify-center cursor-pointer relative"${addAttribute(workout.id, "data-workout-id")} onclick="toggleWorkoutCompletion(this)" data-astro-cid-j7pv25f6> <div class="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-600 peer-checked:border-green-500 transition-all duration-300" data-astro-cid-j7pv25f6></div> <div class="absolute inset-0 bg-green-100/50 dark:bg-green-900/20 rounded-full opacity-0 transition-all duration-300" data-astro-cid-j7pv25f6></div> <svg class="w-4 h-4 text-green-500 scale-0 transition-transform duration-300 z-10" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" data-astro-cid-j7pv25f6></path> </svg> </button> </div> </div> </div> <div class="mt-4" data-astro-cid-j7pv25f6> <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 whitespace-pre-line" data-astro-cid-j7pv25f6>${workout.description}</p> ${workout.notes && renderTemplate`<div class="mt-4" data-astro-cid-j7pv25f6> <button class="text-sm md:text-base text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors duration-300"${addAttribute(`toggleNotes('${workout.id}')`, "onclick")} data-astro-cid-j7pv25f6>
Ver notas
</button> <div${addAttribute(`notes-${workout.id}`, "id")} class="hidden mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300 whitespace-pre-line" data-astro-cid-j7pv25f6> ${workout.notes} </div> </div>`} </div> </div>`)} </div>`);
}, "/Users/miguelpitarch/Desktop/program/src/pages/index.astro", void 0);

const $$file = "/Users/miguelpitarch/Desktop/program/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
