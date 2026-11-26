import { onRequestGet as __api_geo_js_onRequestGet } from "/Users/vu/Documents/hub96-project/tradingview.vn/functions/api/geo.js"
import { onRequest as ___middleware_js_onRequest } from "/Users/vu/Documents/hub96-project/tradingview.vn/functions/_middleware.js"

export const routes = [
    {
      routePath: "/api/geo",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_geo_js_onRequestGet],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]