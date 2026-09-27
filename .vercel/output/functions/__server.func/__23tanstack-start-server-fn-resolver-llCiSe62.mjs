//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-llCiSe62.js
var manifest = {
  "05c1f851fccc17141bace1ce0804041300162ec5081dac7c41edec722eaef5e5": {
    functionName: "setTestimonialReview_createServerFn_handler",
    importer: () => import("./_ssr/testimonials-DBsboKbT.mjs"),
  },
  "2ba0a30d231fa2221615fd2370f15ee1ffc959e94eb6db6b75b67b54fc2e46b9": {
    functionName: "getAllTestimonials_createServerFn_handler",
    importer: () => import("./_ssr/testimonials-DBsboKbT.mjs"),
  },
  a418129df8fa7e37a48960e6f429a8984de5a9ca842cb20d524c48ba87425110: {
    functionName: "removeTestimonial_createServerFn_handler",
    importer: () => import("./_ssr/testimonials-DBsboKbT.mjs"),
  },
  b003252863dd5c71e661fd7fb564c05efa911c027043cf006b8d6e79d9429765: {
    functionName: "getApprovedTestimonials_createServerFn_handler",
    importer: () => import("./_ssr/testimonials-DBsboKbT.mjs"),
  },
  d846a6db1979ca2a3be6badc82c399723d957576fdf4c47409b44026a886aaf6: {
    functionName: "submitTestimonial_createServerFn_handler",
    importer: () => import("./_ssr/testimonials-DBsboKbT.mjs"),
  },
};
async function getServerFnById(id, access) {
  const serverFnInfo = manifest[id];
  if (!serverFnInfo) throw new Error("Server function info not found for " + id);
  const fnModule = serverFnInfo.module ?? (await serverFnInfo.importer());
  if (!fnModule) throw new Error("Server function module not resolved for " + id);
  const action = fnModule[serverFnInfo.functionName];
  if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
  return action;
}
//#endregion
export { getServerFnById as t };
