import { Y, r as reactExports, a as u, b as a, N, w, $ as $f7dceffc5ad7768b$export$4e328f61c538687f, c as $6179b936705e76d3$export$ae780daf29e6d456, V, n, K, u as useDialogProvider, d as useExperimentOverrides, j as jsxRuntimeExports, e as useExperiments } from "./index-BNMH5xhd.js";
import { L as L$1 } from "./button-CYKAjb79.js";
let L = "textarea";
function H(a$1, t) {
  let s = reactExports.useId(), l = u(), d = a(), { id: i = l || `headlessui-textarea-${s}`, disabled: e = d || false, autoFocus: r = false, invalid: o = false, ...p } = a$1, n$1 = N(), T = w(), { isFocused: f, focusProps: m } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: r }), { isHovered: u$1, hoverProps: b } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e }), y = V({ ref: t, id: i, "aria-labelledby": n$1, "aria-describedby": T, "aria-invalid": o ? "true" : void 0, disabled: e || void 0, autoFocus: r }, m, b), x = n({ disabled: e, invalid: o, hover: u$1, focus: f, autofocus: r });
  return K()({ ourProps: y, theirProps: p, slot: x, defaultTag: L, name: "Textarea" });
}
let M = Y(H);
function convertCookieToOverrides(cookie, experiments) {
  if (!cookie || cookie.length === 0) {
    return null;
  }
  const parsedCookie = decodeURIComponent(cookie).replace(/%20/g, " ").replace(/%22/g, '"').replace(/%2C/g, ",");
  if (!parsedCookie.startsWith('{"experiments":')) {
    return null;
  }
  const overrides = {};
  try {
    const parsedOverrides = JSON.parse(parsedCookie);
    for (const [experimentID, override] of Object.entries(parsedOverrides.experiments)) {
      const experiment = experiments.find((experiment2) => {
        return experiment2.id === experimentID;
      });
      if (experiment) {
        overrides[experiment.name] = override;
      } else {
      }
    }
  } catch (error) {
    return null;
  }
  return overrides;
}
function convertOverridesToCookie(overrides, experiments) {
  const temporaryObject = {
    experiments: {},
    disabled: []
  };
  for (const exp of Object.keys(overrides)) {
    const experimentID = experiments.find((experiment) => {
      return experiment.name === exp;
    })?.id;
    if (!experimentID) {
      continue;
    }
    temporaryObject.experiments[experimentID] = overrides[exp];
  }
  return JSON.stringify(temporaryObject).replace(/ /g, "%20").replace(/"/g, "%22").replace(/,/g, "%2C");
}
function ActionBar() {
  const { openDialogue } = useDialogProvider();
  const { overrides } = useExperimentOverrides();
  const overrideCount = reactExports.useMemo(() => {
    return Object.keys(overrides).length;
  }, [overrides]);
  const openImportDialog = () => {
    openDialogue({
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(ImportDialog, {}),
      description: "Paste your override JSON here to import.",
      title: "Import Overrides"
    });
  };
  const openExportDialog = () => {
    openDialogue({
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(ExportDialog, { closeDialog: () => openDialogue(null) }),
      description: "This will copy your current overrides to the clipboard.",
      title: "Export Overrides"
    });
  };
  const openResetDialog = () => {
    openDialogue({
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(ResetDialog, {}),
      description: "This will reset all your overrides to the default settings.",
      title: "Reset Overrides"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex gap-3 justify-center flex-col mb-2 lg:w-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      L$1,
      {
        "aria-label": "Import an override from clipboard",
        title: "Import overrides from clipboard. This will paste the overrides from your clipboard.",
        onClick: openImportDialog,
        className: "w-full bg-tw text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 cursor-pointer disabled:text-white/50 disabled:cursor-default hover:shadow-md hover:scale-[1.02] active:scale-[0.98] border border-transparent hover:border-white/10 disabled:hover:scale-[1.0]",
        children: "Import"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      L$1,
      {
        "aria-label": "Export overrides to clipboard",
        title: "Export overrides to clipboard. This will copy the current overrides to your clipboard.",
        onClick: openExportDialog,
        className: "w-full bg-export text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 cursor-pointer disabled:text-white/50 disabled:cursor-default hover:shadow-md hover:scale-[1.02] active:scale-[0.98] border border-transparent hover:border-white/10 disabled:hover:scale-[1.0]",
        children: "Export"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      L$1,
      {
        "aria-label": "Reset all experiment overrides",
        title: overrideCount > 0 ? "Reset all overrides to default" : "No overrides to reset",
        disabled: overrideCount === 0,
        onClick: openResetDialog,
        className: "w-full bg-reset text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 cursor-pointer disabled:text-white/50 disabled:cursor-default disabled:opacity-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] border border-transparent hover:border-white/10 disabled:hover:scale-[1.0]",
        children: overrideCount > 0 ? "Reset" : "No Overrides"
      }
    )
  ] });
}
function ImportDialog() {
  const { closeDialog } = useDialogProvider();
  const { overrideOverrides } = useExperimentOverrides();
  const { experiments } = useExperiments();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      M,
      {
        className: "w-full mt-2 p-3 border border-gray-700 rounded-lg h-48 resize-none bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 shadow-inner",
        placeholder: "{%22experiments%22:{}%2C%22disabled%22:[]}",
        id: "cookie-input"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      L$1,
      {
        className: "mt-3 w-full bg-blue text-white px-4 py-2.5 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]",
        onClick: (event) => {
          const input = document.getElementById("cookie-input");
          const cookie = input.value;
          const newOverrides = convertCookieToOverrides(cookie, experiments);
          if (!newOverrides) {
            event.currentTarget.innerText = "✗ Failed!";
            event.currentTarget.setAttribute("disabled", "true");
            event.currentTarget.style.pointerEvents = "none";
            setTimeout(() => {
              closeDialog();
            }, 1e3);
            return;
          } else {
            overrideOverrides(newOverrides);
          }
          event.currentTarget.innerText = "✓ Imported!";
          event.currentTarget.setAttribute("disabled", "true");
          event.currentTarget.style.pointerEvents = "none";
          setTimeout(() => {
            closeDialog();
          }, 1e3);
        },
        children: "Import Overrides"
      }
    )
  ] });
}
function ExportDialog({ closeDialog }) {
  const { experiments } = useExperiments();
  const { overrides } = useExperimentOverrides();
  const cookie = convertOverridesToCookie(overrides, experiments);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      M,
      {
        className: "w-full mt-2 p-3 border border-gray-700 rounded-lg h-48 resize-none bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 shadow-inner",
        readOnly: true,
        value: cookie
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      L$1,
      {
        className: "w-full mt-3 bg-blue text-white px-4 py-2.5 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]",
        onClick: (event) => {
          navigator.clipboard.writeText(cookie).then(() => {
          });
          event.currentTarget.innerText = "✓ Copied!";
          event.currentTarget.setAttribute("disabled", "true");
          event.currentTarget.style.pointerEvents = "none";
          setTimeout(() => {
            closeDialog();
          }, 1e3);
        },
        children: "Copy to Clipboard"
      }
    )
  ] });
}
function ResetDialog() {
  const { closeDialog } = useDialogProvider();
  const { clearOverrides, overrides } = useExperimentOverrides();
  const overrideKeys = Object.keys(overrides);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Are you sure you want to reset all overrides? This action cannot be undone." }),
    overrideKeys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 list-disc list-inside text-gray-300", children: overrideKeys.map((experiment) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: experiment }, experiment)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      L$1,
      {
        className: "mt-3 w-full bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 hover:shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-red-500/50 float-end",
        onClick: (e) => {
          clearOverrides();
          e.currentTarget.innerText = "✓";
          e.currentTarget.setAttribute("disabled", "true");
          e.currentTarget.style.pointerEvents = "none";
          setTimeout(() => {
            closeDialog();
          }, 1e3);
        },
        children: "Reset Overrides"
      }
    )
  ] });
}
export {
  ActionBar,
  ActionBar as default
};
//# sourceMappingURL=ActionBar-DRV5WTb-.js.map
