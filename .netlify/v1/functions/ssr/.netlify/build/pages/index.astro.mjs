/* empty css                               */
import { e as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_9nBo-_fU.mjs';
import 'kleur/colors';
import 'html-escaper';
import { addDays, eachDayOfInterval } from 'date-fns';
import { $ as $$Layout } from '../chunks/Layout_CYY21pNm.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const startDate = /* @__PURE__ */ new Date();
  const endDate = addDays(startDate, 4);
  eachDayOfInterval({ start: startDate, end: endDate });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "The Program", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8" data-astro-cid-j7pv25f6> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-astro-cid-j7pv25f6> <div class="w-full text-center mb-2" data-astro-cid-j7pv25f6> <span id="currentMonth" class="text-xl font-bold" data-astro-cid-j7pv25f6></span> </div> <div class="relative w-full" data-astro-cid-j7pv25f6> <div id="weekGrid" class="flex justify-center w-full" data-astro-cid-j7pv25f6> <!-- Los días se generarán dinámicamente aquí --> </div> </div> </div> <div id="workoutList" class="space-y-6" data-astro-cid-j7pv25f6> <!-- Los entrenamientos se cargarán aquí --> </div> </div> ` })} ${renderScript($$result, "/Users/miguelpitarch/Desktop/program/src/pages/index.astro?astro&type=script&index=0&lang.ts")} `;
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
