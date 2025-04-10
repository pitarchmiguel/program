import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_9nBo-_fU.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/miguelpitarch/Desktop/program/","cacheDir":"file:///Users/miguelpitarch/Desktop/program/node_modules/.astro/","outDir":"file:///Users/miguelpitarch/Desktop/program/dist/","srcDir":"file:///Users/miguelpitarch/Desktop/program/src/","publicDir":"file:///Users/miguelpitarch/Desktop/program/public/","buildClientDir":"file:///Users/miguelpitarch/Desktop/program/dist/","buildServerDir":"file:///Users/miguelpitarch/Desktop/program/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/add.C_DXLtoQ.css"},{"type":"inline","content":".notification-success[data-astro-cid-idr4ht26]{background-color:#d4edda;border-color:#c3e6cb;color:#155724}.notification-error[data-astro-cid-idr4ht26]{background-color:#f8d7da;border-color:#f5c6cb;color:#721c24}.hidden[data-astro-cid-idr4ht26]{display:none}\n"}],"routeData":{"route":"/add","isIndex":false,"type":"page","pattern":"^\\/add\\/?$","segments":[[{"content":"add","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/add.astro","pathname":"/add","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/add.C_DXLtoQ.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/add.C_DXLtoQ.css"}],"routeData":{"route":"/edit/[id]","isIndex":false,"type":"page","pattern":"^\\/edit\\/([^/]+?)\\/?$","segments":[[{"content":"edit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/edit/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/add.C_DXLtoQ.css"}],"routeData":{"route":"/edit","isIndex":false,"type":"page","pattern":"^\\/edit\\/?$","segments":[[{"content":"edit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/edit.astro","pathname":"/edit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/add.C_DXLtoQ.css"},{"type":"inline","content":".scrollbar-hide[data-astro-cid-j7pv25f6]::-webkit-scrollbar{display:none}.scrollbar-hide[data-astro-cid-j7pv25f6]{-ms-overflow-style:none;scrollbar-width:none}.snap-x[data-astro-cid-j7pv25f6]{scroll-snap-type:x mandatory}.snap-center[data-astro-cid-j7pv25f6]{scroll-snap-align:center}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/miguelpitarch/Desktop/program/src/pages/edit.astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/add.astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/edit/[id].astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/add@_@astro":"pages/add.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/edit/[id]@_@astro":"pages/edit/_id_.astro.mjs","\u0000@astro-page:src/pages/edit@_@astro":"pages/edit.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BStAtCw3.mjs","/Users/miguelpitarch/Desktop/program/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BV0mavgP.mjs","@astrojs/react/client.js":"_astro/client.bnNPSdWK.js","/Users/miguelpitarch/Desktop/program/src/pages/edit/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.B4mqID6v.js","/Users/miguelpitarch/Desktop/program/src/pages/admin.astro?astro&type=script&index=0&lang.ts":"_astro/admin.astro_astro_type_script_index_0_lang.B5-UPFCa.js","/Users/miguelpitarch/Desktop/program/src/pages/add.astro?astro&type=script&index=0&lang.ts":"_astro/add.astro_astro_type_script_index_0_lang.el9YfCiQ.js","/Users/miguelpitarch/Desktop/program/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.C2RNU_dv.js","/Users/miguelpitarch/Desktop/program/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.rrbHD4KX.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/miguelpitarch/Desktop/program/src/pages/edit/[id].astro?astro&type=script&index=0&lang.ts","async function c(e){e.preventDefault();const t=document.getElementById(\"workoutDate\").value,o=document.getElementById(\"workoutLetter\").value,n=document.getElementById(\"workoutTitle\").value,r=document.getElementById(\"workoutDescription\").value,d=document.getElementById(\"workoutNotes\").value;try{await updateDoc(doc(db,\"workouts\",id),{date:format(new Date(t),\"yyyy-MM-dd\"),letter:o,title:n,description:r.replace(/\\n/g,\"<br>\"),notes:d.replace(/\\n/g,\"<br>\")}),window.location.href=\"/admin\"}catch(a){console.error(\"Error al guardar:\",a),alert(\"Error al guardar los cambios\")}}document.addEventListener(\"DOMContentLoaded\",()=>{document.getElementById(\"workoutForm\").addEventListener(\"submit\",c)});"],["/Users/miguelpitarch/Desktop/program/src/pages/admin.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const a={apiKey:\"AIzaSyBZaIzYF5ozPxodnfxMQI_Azf2xnk8Hdrw\",authDomain:\"crossfit-app-45689.firebaseapp.com\",projectId:\"crossfit-app-45689\",storageBucket:\"crossfit-app-45689.appspot.com\",messagingSenderId:\"172968183910\",appId:\"1:172968183910:web:1b48e17ba79266ea5dc5a7\",measurementId:\"G-SC16FBWZ36\"},r=firebase.initializeApp(a),t=firebase.firestore(r);window.db=t;const n=document.getElementById(\"dateSelector\");n&&n.addEventListener(\"change\",e=>{const o=e.target.value;o&&(window.location.href=`/admin?date=${o}`)}),document.querySelectorAll(\".edit-btn\").forEach(e=>{e.addEventListener(\"click\",o=>{o.preventDefault();const d=e.dataset.id;d&&i(d)})}),document.querySelectorAll(\".delete-btn\").forEach(e=>{e.addEventListener(\"click\",async o=>{o.preventDefault();const d=e.dataset.id;if(d&&confirm(\"¿Estás seguro de que quieres eliminar este entrenamiento?\"))try{await deleteDoc(doc(window.db,\"workouts\",d)),window.location.reload()}catch(c){console.error(\"Error eliminando entrenamiento:\",c),alert(\"Error al eliminar el entrenamiento\")}})})});function i(a){const r=document.getElementById(`workout-${a}`);if(!r)return;const t=r.querySelector(\".view-mode\"),n=r.querySelector(\".edit-mode\"),e=r.querySelector(\".edit-btn\");!t||!n||!e||(n.classList.contains(\"hidden\")?(t.classList.add(\"hidden\"),n.classList.remove(\"hidden\"),e.textContent=\"Guardar\",e.onclick=o=>{o.preventDefault(),s(a)}):(t.classList.remove(\"hidden\"),n.classList.add(\"hidden\"),e.textContent=\"Editar\",e.onclick=o=>{o.preventDefault(),i(a)}))}async function s(a){const r=document.getElementById(`form-${a}`);if(r)try{const t=new FormData(r),n={date:t.get(\"date\"),title:t.get(\"title\"),description:t.get(\"description\"),notes:t.get(\"notes\")};await updateDoc(doc(window.db,\"workouts\",a),n),window.location.reload()}catch(t){console.error(\"Error al guardar:\",t),alert(\"Error al guardar los cambios\")}}"],["/Users/miguelpitarch/Desktop/program/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","localStorage.theme===\"dark\"||!(\"theme\"in localStorage)&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\");document.getElementById(\"themeToggle\").addEventListener(\"click\",()=>{document.documentElement.classList.contains(\"dark\")?(document.documentElement.classList.remove(\"dark\"),localStorage.theme=\"light\"):(document.documentElement.classList.add(\"dark\"),localStorage.theme=\"dark\")});"]],"assets":["/_astro/add.C_DXLtoQ.css","/favicon.svg","/_astro/add.astro_astro_type_script_index_0_lang.el9YfCiQ.js","/_astro/client.bnNPSdWK.js","/_astro/format.Cy3Ou7rW.js","/_astro/index.astro_astro_type_script_index_0_lang.C2RNU_dv.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"ddq6aUD3+8f2bmLjK/DY0W8cQvdQofYcseH3yd0nliw="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
