import { r as reactExports, u as useDialogProvider, j as jsxRuntimeExports, f as formatDate } from "./index-C9eKY40h.js";
import { Alert } from "./Alert-CgIbW4cP.js";
import { L } from "./button-DTdFyxTV.js";
function CodeBracketSquareIcon({
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
    d: "M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(CodeBracketSquareIcon);
const buildId = "73b082d6-a087-419d-9a91-2afaa1a167b4";
const updatedAt = 1763170221613;
const experimentsCount = 59;
const shorthand = { "added": 0, "removed": 1, "activated": 0, "deactivated": 1, "modified": 0 };
const comments = ["0 experiments were added, 1 experiments were removed.", "Removed experiments:", "- c86b522c-2b6c-40d6-97c2-c8912d1f8763 (disco_bpli)", "  * control (100)", "  * variant1 (0)", "0 experiments were activated, 1 experiments were deactivated.", "Deactivated experiments:", "- c86b522c-2b6c-40d6-97c2-c8912d1f8763 (disco_bpli)", "  * control (100)", "  * variant1 (0)"];
const latestBuildRaw = {
  buildId,
  updatedAt,
  experimentsCount,
  shorthand,
  comments
};
const latestBuild = latestBuildRaw;
function Footer() {
  const { openDialogue } = useDialogProvider();
  const openDebugDialog = () => {
    openDialogue({
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(DebugDialog, {}),
      title: "Debug Information",
      wider: true
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-gray-900/80 backdrop-blur-sm text-gray-400 py-10 px-4 mt-8 md:px-16 text-xs md:text-base border-t border-gray-800 shadow-2xl shadow-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-baseline gap-3 text-2xl font-bold text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "About TECG - Stream Service Experiment Cookie Generator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500 hover:text-gray-300 transition-colors duration-200", title: "Debug", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Debug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openDebugDialog(), className: "align-middle cursor-pointer hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "w-5 h-5 size-5" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "TECG is an open-source tool designed for developers and enthusiasts who want to explore experimental features in their favorite streaming platforms. It allows users to generate and manage custom cookies, potentially activating unreleased updates or testing new features that might be available on some platforms." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Generate and import custom experiment cookies for supported platforms." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Filter experiments by active, serving one, or unregistered states." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Easily copy and paste your generated cookie settings." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Explore hundreds of experimental configurations to personalize your experience." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "User-friendly design, optimized for desktop and mobile use." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { id: "warning", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Important Notice:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Using these experimental overrides comes with some risks. Misusing this tool ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "italic",
            children: "COULD"
          }
        ),
        " result in account restrictions, suspensions or other penalties depending on the platform's policies. By using TECG, you acknowledge full responsibility for any actions taken."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm", children: "TECG is an independent project and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with any specific streaming platform or service. All trademarks, service marks, and company names mentioned here are the property of their respective owners." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs md:text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " • Open-source under the MIT License"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Designed by " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "https://github.com/boomboompower/tecg/",
            target: "_blank",
            rel: "noopener noreferrer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500 hover:text-blue-400", children: "boomboompower" })
          }
        )
      ] })
    ] })
  ] }) }) });
}
function DebugDialog() {
  const { closeDialog } = useDialogProvider();
  const coloredComments = reactExports.useMemo(() => {
    let currentGroup = "none";
    return latestBuild.comments.map((line, index) => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes("removed experiments") || lowerLine.includes("deactivated experiments")) {
        currentGroup = "removed";
      } else if (lowerLine.includes("added experiments") || lowerLine.includes("activated experiments")) {
        currentGroup = "added";
      } else if (lowerLine.includes("were modified")) {
        currentGroup = "modified";
      } else if (line.trim() === "") {
        currentGroup = "none";
      }
      let colorClass = "text-white";
      if (currentGroup === "added") colorClass = "text-green-400";
      else if (currentGroup === "modified") colorClass = "text-yellow-400";
      else if (currentGroup === "removed") colorClass = "text-red-400";
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: colorClass, children: line }, index);
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400", children: [
      "Build ID: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: latestBuild.buildId })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400", children: [
      "Updated At: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: formatDate(latestBuild.updatedAt) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400", children: [
      "Total Experiments: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: latestBuild.experimentsCount })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-400", children: [
      "Changes in last build:",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Added: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: latestBuild.shorthand.added })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Removed: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: latestBuild.shorthand.removed })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Activated: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: latestBuild.shorthand.activated })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Deactivated: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: latestBuild.shorthand.deactivated })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Modified: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: latestBuild.shorthand.modified })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-black/50 text-sm p-4 rounded-md whitespace-pre font-mono mt-2 overflow-x-auto", children: coloredComments }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      L,
      {
        className: "cursor-pointer mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 float-end",
        onClick: closeDialog,
        children: "Close"
      }
    )
  ] });
}
export {
  Footer,
  Footer as default
};
//# sourceMappingURL=Footer-Ith47gmQ.js.map
