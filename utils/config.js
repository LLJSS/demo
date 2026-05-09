/**
 * 后端网关地址（与浏览器/模拟器访问地址一致）。
 *
 * H5：若 devServer 未把 /api 代理到网关，请求会打到 5173 本身 → 404。
 * 因此默认与 Apifox 一样直连 http://localhost:8888（需网关开启 CORS，见 gateway application.yml）。
 * 若你已配置 Vite 代理且希望走相对路径，可改为 ''。
 */
export const BASE_URL = 'http://localhost:8888'
