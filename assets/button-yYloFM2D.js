import { Y, b as a, $ as $f7dceffc5ad7768b$export$4e328f61c538687f, c as $6179b936705e76d3$export$ae780daf29e6d456, g as w, V, n, K } from "./index-l0DsJind.js";
let R = "button";
function v(s, n$1) {
  var r;
  let p = a(), { disabled: e = p || false, autoFocus: t = false, ...o } = s, { isFocusVisible: a$1, focusProps: l } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: t }), { isHovered: u, hoverProps: i } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e }), { pressed: T, pressProps: d } = w({ disabled: e }), f = V({ ref: n$1, type: (r = o.type) != null ? r : "button", disabled: e || void 0, autoFocus: t }, l, i, d), m = n({ disabled: e, hover: u, focus: a$1, active: T, autofocus: t });
  return K()({ ourProps: f, theirProps: o, slot: m, defaultTag: R, name: "Button" });
}
let L = Y(v);
export {
  L
};
//# sourceMappingURL=button-yYloFM2D.js.map
