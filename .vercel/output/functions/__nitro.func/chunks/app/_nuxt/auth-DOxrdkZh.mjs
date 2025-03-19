import { d as defineNuxtRouteMiddleware, n as navigateTo } from '../server.mjs';
import { u as useCookie } from './cookie-eUdDdNIn.mjs';
import { u as useAuth } from './authStates-JVh-EjEH.mjs';
import 'vue';
import '../../nitro/vercel.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:url';
import 'ipx';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue/server-renderer';
import 'axios';
import 'currency.js';

const auth = defineNuxtRouteMiddleware((to, from) => {
  const cookie = useCookie("auth");
  if (cookie.value == null || cookie.value == void 0) {
    return navigateTo("/", { redirectCode: 301 });
  }
  if (!useAuth().isAuthenticated()) {
    return navigateTo("/", { redirectCode: 301 });
  }
});

export { auth as default };
//# sourceMappingURL=auth-DOxrdkZh.mjs.map
