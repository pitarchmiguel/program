/* empty css                               */
import { c as createComponent, a as createAstro, d as renderHead, r as renderTemplate } from '../chunks/astro/server_thY1q-tL.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { a as auth } from '../chunks/firebase_79n_BlYZ.mjs';
import { signInWithEmailAndPassword } from 'firebase/auth';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  let error = null;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return Astro2.redirect("/edit");
    } catch (error2) {
      console.error("Error de autenticaci\xF3n:", error2);
      if (error2.code === "auth/invalid-credential") {
        error2 = "Email o contrase\xF1a incorrectos";
      } else if (error2.code === "auth/too-many-requests") {
        error2 = "Demasiados intentos fallidos. Por favor, int\xE9ntalo m\xE1s tarde.";
      } else {
        error2 = "Error al iniciar sesi\xF3n. Por favor, int\xE9ntalo de nuevo.";
      }
    }
  }
  return renderTemplate`<html lang="es" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Login - La Program</title>${renderHead()}</head> <body class="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100"> <button id="themeToggle" class="fixed top-4 right-4 p-2.5 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105" aria-label="Cambiar tema"> <svg class="w-5 h-5 md:w-6 md:h-6 hidden dark:block text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> <svg class="w-5 h-5 md:w-6 md:h-6 block dark:hidden text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </button> <div class="flex min-h-screen items-center justify-center p-6"> <div class="w-full max-w-sm space-y-8"> <div class="text-center space-y-6"> <h2 class="text-4xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">La Program</h2> <p class="text-sm text-gray-600 dark:text-gray-400">Panel de Administración</p> </div> <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200 dark:border-gray-700"> ${error} <form method="POST" class="space-y-6"> <div class="space-y-4"> <div> <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Email
</label> <input id="email" name="email" type="email" required class="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 transition-all duration-200"> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
Contraseña
</label> <input id="password" name="password" type="password" required class="mt-1 block w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 transition-all duration-200"> </div> </div> <button type="submit" class="relative w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] focus:scale-[0.98]"> <span class="absolute inset-y-0 left-0 pl-3 flex items-center"> <svg class="h-5 w-5 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path> </svg> </span>
Iniciar Sesión
</button> </form> </div> </div> </div>  </body> </html>`;
}, "/Users/miguelpitarch/Desktop/program/src/pages/login.astro", void 0);

const $$file = "/Users/miguelpitarch/Desktop/program/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
