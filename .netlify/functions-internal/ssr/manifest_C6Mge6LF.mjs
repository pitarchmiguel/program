import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, g as decodeKey } from './chunks/astro/server_thY1q-tL.mjs';

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
    isIndex: rawRouteData.isIndex
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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/miguelpitarch/Desktop/program/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const l=document.getElementById(\"themeToggle\");l.addEventListener(\"click\",()=>{document.documentElement.classList.contains(\"dark\")?(document.documentElement.classList.remove(\"dark\"),localStorage.theme=\"light\"):(document.documentElement.classList.add(\"dark\"),localStorage.theme=\"dark\")});async function c(t,o,n=\"success\"){typeof Swal>\"u\"&&await new Promise(a=>{const r=setInterval(()=>{typeof Swal<\"u\"&&(clearInterval(r),a())},100)}),await Swal.fire({title:t,text:o,icon:n,confirmButtonColor:\"#0ea5e9\",background:document.documentElement.classList.contains(\"dark\")?\"#1e293b\":\"#ffffff\",color:document.documentElement.classList.contains(\"dark\")?\"#f9f9f9\":\"#111827\",customClass:{confirmButton:\"swal2-confirm-custom\"}})}function u(){return Date.now().toString(36)+Math.random().toString(36).substr(2)}async function f(t){t.preventDefault();const o=document.getElementById(\"workoutDate\").value,n=document.getElementById(\"workoutLetter\").value,a=document.getElementById(\"workoutTitle\").value,r=document.getElementById(\"workoutDescription\").value,d=document.getElementById(\"workoutNotes\").value,i=u();try{const e=await fetch(\"/api/createWorkout\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({date:o,letter:n,title:a,description:r,notes:d,id:i})}),m=await e.json();if(!e.ok)throw new Error(m.message||\"Error al crear el entrenamiento\");await c(\"¡Éxito!\",\"El entrenamiento ha sido añadido correctamente\"),document.getElementById(\"workoutForm\").reset()}catch(e){console.error(\"Error añadiendo entrenamiento:\",e),await c(\"Error\",\"Error al añadir el entrenamiento: \"+e.message,\"error\")}}const s=document.createElement(\"style\");s.textContent=`\n\t\t\t\t.swal2-confirm-custom {\n\t\t\t\t\tbackground: linear-gradient(to right, #0ea5e9, #2563eb) !important;\n\t\t\t\t\tborder: none !important;\n\t\t\t\t\tbox-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.2) !important;\n\t\t\t\t\ttransition: all 0.3s ease !important;\n\t\t\t\t}\n\t\t\t\t.swal2-confirm-custom:hover {\n\t\t\t\t\ttransform: translateY(-1px) !important;\n\t\t\t\t\tbox-shadow: 0 6px 8px -1px rgba(14, 165, 233, 0.3) !important;\n\t\t\t\t}\n\t\t\t`;document.head.appendChild(s);document.addEventListener(\"DOMContentLoaded\",()=>{document.getElementById(\"workoutForm\").addEventListener(\"submit\",f)});localStorage.theme===\"dark\"||!(\"theme\"in localStorage)&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\");\n"}],"styles":[{"type":"external","src":"/_astro/add.DXgJTEZE.css"}],"routeData":{"route":"/add","isIndex":false,"type":"page","pattern":"^\\/add\\/?$","segments":[[{"content":"add","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/add.astro","pathname":"/add","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/createworkout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/createWorkout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"createWorkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/createWorkout.ts","pathname":"/api/createWorkout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/deleteworkout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/deleteWorkout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"deleteWorkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/deleteWorkout.ts","pathname":"/api/deleteWorkout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/logout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/logout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/logout.ts","pathname":"/api/logout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/updateworkout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/updateWorkout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"updateWorkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/updateWorkout.ts","pathname":"/api/updateWorkout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"localStorage.theme===\"dark\"||!(\"theme\"in localStorage)&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\");\n"}],"styles":[{"type":"external","src":"/_astro/add.DXgJTEZE.css"},{"type":"inline","content":".swal2-confirm-custom{background:linear-gradient(to right,#0ea5e9,#2563eb)!important;border:none!important;box-shadow:0 4px 6px -1px #0ea5e933!important;transition:all .3s ease!important}.swal2-confirm-custom:hover{transform:translateY(-1px)!important;box-shadow:0 6px 8px -1px #0ea5e94d!important}\n"}],"routeData":{"route":"/edit/[id]","isIndex":false,"type":"page","pattern":"^\\/edit\\/([^/]+?)\\/?$","segments":[[{"content":"edit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/edit/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"localStorage.theme===\"dark\"||!(\"theme\"in localStorage)&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\");\n"}],"styles":[{"type":"external","src":"/_astro/add.DXgJTEZE.css"}],"routeData":{"route":"/edit","isIndex":true,"type":"page","pattern":"^\\/edit\\/?$","segments":[[{"content":"edit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/edit/index.astro","pathname":"/edit","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.getElementById(\"themeToggle\");e.addEventListener(\"click\",()=>{document.documentElement.classList.contains(\"dark\")?(document.documentElement.classList.remove(\"dark\"),localStorage.theme=\"light\"):(document.documentElement.classList.add(\"dark\"),localStorage.theme=\"dark\")});localStorage.theme===\"dark\"||!(\"theme\"in localStorage)&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\");\n"}],"styles":[{"type":"external","src":"/_astro/add.DXgJTEZE.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BmSP4aFo.js"}],"styles":[{"type":"external","src":"/_astro/add.DXgJTEZE.css"},{"type":"inline","content":".animate-fade-in[data-astro-cid-vt7y5kak]{animation:fadeIn .3s ease-in-out}@keyframes fadeIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}#modalNuevoPR[data-astro-cid-vt7y5kak]{-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}\n"}],"routeData":{"route":"/prs","isIndex":false,"type":"page","pattern":"^\\/prs\\/?$","segments":[[{"content":"prs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/prs.astro","pathname":"/prs","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.rrbHD4KX.js"}],"styles":[{"type":"external","src":"/_astro/add.DXgJTEZE.css"},{"type":"inline","content":".rotate-180[data-astro-cid-5hgwyhda]{transform:rotate(180deg);transition:transform .3s ease-in-out}\n"}],"routeData":{"route":"/resultados","isIndex":false,"type":"page","pattern":"^\\/resultados\\/?$","segments":[[{"content":"resultados","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/resultados.astro","pathname":"/resultados","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cs5YSeb8.js"}],"styles":[{"type":"external","src":"/_astro/add.DXgJTEZE.css"},{"type":"inline","content":".scrollbar-hide[data-astro-cid-j7pv25f6]::-webkit-scrollbar{display:none}.scrollbar-hide[data-astro-cid-j7pv25f6]{-ms-overflow-style:none;scrollbar-width:none}.snap-x[data-astro-cid-j7pv25f6]{scroll-snap-type:x mandatory}.snap-center[data-astro-cid-j7pv25f6]{scroll-snap-align:center}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/miguelpitarch/Desktop/program/src/pages/add.astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/edit/[id].astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/edit/index.astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/prs.astro",{"propagation":"none","containsHead":true}],["/Users/miguelpitarch/Desktop/program/src/pages/resultados.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/add@_@astro":"pages/add.astro.mjs","\u0000@astro-page:src/pages/api/createWorkout@_@ts":"pages/api/createworkout.astro.mjs","\u0000@astro-page:src/pages/api/deleteWorkout@_@ts":"pages/api/deleteworkout.astro.mjs","\u0000@astro-page:src/pages/api/logout@_@ts":"pages/api/logout.astro.mjs","\u0000@astro-page:src/pages/api/updateWorkout@_@ts":"pages/api/updateworkout.astro.mjs","\u0000@astro-page:src/pages/edit/[id]@_@astro":"pages/edit/_id_.astro.mjs","\u0000@astro-page:src/pages/edit/index@_@astro":"pages/edit.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/prs@_@astro":"pages/prs.astro.mjs","\u0000@astro-page:src/pages/resultados@_@astro":"pages/resultados.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C6Mge6LF.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.DbQTjYf3.js","/astro/hoisted.js?q=2":"_astro/hoisted.B3zD0kGm.js","/astro/hoisted.js?q=5":"_astro/hoisted.Cs5YSeb8.js","/astro/hoisted.js?q=0":"_astro/hoisted.CEO4m7Zy.js","/astro/hoisted.js?q=3":"_astro/hoisted.Ct3Zx-Ln.js","@astrojs/react/client.js":"_astro/client.BRZKPEzt.js","/astro/hoisted.js?q=4":"_astro/hoisted.rrbHD4KX.js","/astro/hoisted.js?q=6":"_astro/hoisted.BmSP4aFo.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/add.DXgJTEZE.css","/favicon.svg","/_astro/client.BRZKPEzt.js","/_astro/hoisted.BmSP4aFo.js","/_astro/hoisted.Cs5YSeb8.js","/_astro/hoisted.rrbHD4KX.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"Bsd5BocdXTBjJl7pgiyk8LPswImo/0qyf14QjJYQ2Hw=","experimentalEnvGetSecretEnabled":false});

export { manifest };
