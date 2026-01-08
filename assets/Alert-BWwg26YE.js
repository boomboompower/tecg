import { r as reactExports, j as jsxRuntimeExports } from "./index-CLwfw5JH.js";
function ExclamationTriangleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    fillRule: "evenodd",
    d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(ExclamationTriangleIcon);
function Alert({ children, id, className, dismissible }) {
  id = id || `alert-${className ? className.replace(/\s+/g, "-") : "default"}`;
  if (localStorage.getItem(btoa(id))) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl bg-red-700/90 border border-red-600/30 text-white p-5 relative shadow-lg shadow-red-900/20 backdrop-blur-sm ${className}`,
      "aria-label": "Alert",
      "aria-describedby": id,
      role: "alert",
      id,
      children: [
        dismissible && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "absolute top-3 right-4 text-white/80 cursor-pointer hover:text-white transition-all duration-200 text-2xl leading-none hover:scale-110",
            title: "Dismiss alert",
            onClick: () => {
              localStorage.setItem(btoa(id), "dismissed");
              const alertElement = document.getElementById(id);
              if (alertElement) {
                alertElement.style.display = "none";
              }
            },
            children: "×"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 self-start pt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "size-6 text-yellow-300 drop-shadow-sm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1", children })
        ] })
      ]
    }
  );
}
export {
  Alert,
  Alert as default
};
//# sourceMappingURL=Alert-BWwg26YE.js.map
