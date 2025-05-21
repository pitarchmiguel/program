import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_C6Mge6LF.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/add.astro.mjs');
const _page2 = () => import('./pages/api/createworkout.astro.mjs');
const _page3 = () => import('./pages/api/deleteworkout.astro.mjs');
const _page4 = () => import('./pages/api/logout.astro.mjs');
const _page5 = () => import('./pages/api/updateworkout.astro.mjs');
const _page6 = () => import('./pages/edit/_id_.astro.mjs');
const _page7 = () => import('./pages/edit.astro.mjs');
const _page8 = () => import('./pages/login.astro.mjs');
const _page9 = () => import('./pages/prs.astro.mjs');
const _page10 = () => import('./pages/resultados.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/add.astro", _page1],
    ["src/pages/api/createWorkout.ts", _page2],
    ["src/pages/api/deleteWorkout.ts", _page3],
    ["src/pages/api/logout.ts", _page4],
    ["src/pages/api/updateWorkout.ts", _page5],
    ["src/pages/edit/[id].astro", _page6],
    ["src/pages/edit/index.astro", _page7],
    ["src/pages/login.astro", _page8],
    ["src/pages/prs.astro", _page9],
    ["src/pages/resultados.astro", _page10],
    ["src/pages/index.astro", _page11]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
