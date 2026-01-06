import { r as reactExports, u as useDialogProvider, j as jsxRuntimeExports, f as formatDate } from "./index-CKk-ATQo.js";
import { Alert } from "./Alert-l9ngQaYd.js";
import { L } from "./button-BhW0HF5h.js";
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
const buildId = "a3c481e3-1430-4ca8-9e75-3928d0ce3467";
const updatedAt = 1767656728152;
const experimentsCount = 25;
const shorthand = { "added": 0, "removed": 33, "activated": 0, "deactivated": 31, "modified": 1 };
const comments = ["0 experiments were added, 33 experiments were removed.", "Removed experiments:", "- 4437d119-2c19-4770-8492-d55bf43a56fc (ads_cspon_video_token_refresh)", "  * control (0)", "  * active (100)", "- 9a466bb5-b5e7-4286-a3b7-54bf59c56894 (amazon_ivs_web_broadcast_disable_token_reuse_msg)", "  * control (100)", "  * treatment (0)", "- a9d6476f-3e00-44a9-bbf5-9094cdaced5c (amazon_ivs_web_broadcast_enable_xdp_publish)", "  * control (0)", "  * treatment (100)", "- d333bbdb-e32b-4e5a-82c3-6b781dcb729e (auto_increment_goal)", "  * control (0)", "  * treatment (100)", "- 8e25d83c-086a-4776-ab71-bea1f5d810c4 (bva)", "  * off (0)", "  * on (100)", "- d2da6787-f0ca-4210-9e6d-2016e3f64721 (clips_leaderboard_final_rollout)", "  * control (0)", "  * active (100)", "  * active_tcp (0)", "- eef2ed99-81d7-4119-9ac4-3b9e636ee0dd (cplat_unified_home)", "  * control (0)", "  * variant (100)", "- 0a603b81-08db-4537-a52a-bf7b71ac6182 (garfield_discovery_control)", "  * control (100)", "  * variant (0)", "- cd9316f2-9180-4045-ae80-daf14a6f54b3 (garfield_gambling_ccl)", "  * control (100)", "  * variant (0)", "- d078e8f2-943f-45f2-aaaa-746513cea610 (gift_refresh_v2)", "  * control (0)", "  * treatment_1 (0)", "  * treatment_2 (100)", "- 53a4bb14-432f-4dcd-b5d4-e61221e32ab9 (hva)", "  * control (0)", "  * treatment (100)", "- a680f572-fc37-4836-b07b-a2357b4037cb (ivs_player_abr_score)", "  * control (100)", "  * treatment (0)", "- 3712c2b4-41d2-437c-8e37-83e236543cef (ivs_player_probe_endpoint)", "  * control (0)", "  * treatment (100)", "- 171673d5-bd3f-438c-b9da-70ca99609b25 (ivs_player_web_dropped_frame_filter)", "  * control (100)", "  * holdback (0)", "  * treatment_10 (0)", "  * treatment_999 (0)", "- a5c3a8f0-d293-4597-af87-f0352c58d1b3 (ivs_web_player_device_config_prod_test)", "  * control (100)", "  * treatment (0)", "- df56fefb-5585-42ad-b169-a33558100fb5 (ivs_web_rtx_multi_codec_answer)", "  * control (0)", "  * treatment (100)", "- d6aec4f1-f70c-4dac-818a-63850d7185a7 (ivs_web_rtx_prefer_main_profile)", "  * control (100)", "  * treatment (0)", "- 784cb249-5507-4cc2-bfec-a2190d291ad6 (lychee_durian_cherry)", "  * control (0)", "  * variant (100)", "- 4efa4a70-fdb2-45c2-ae30-e6ac42c1c56b (MSO_rollout_flag)", "  * control (100)", "  * treatment (0)", "- 4006baeb-c62e-44da-96f0-c8706c58f378 (mysterious_and_important_work)", "  * control (100)", "  * variant (0)", "- 20337876-3d95-4fe9-afe1-3ffb22208593 (next-up)", "  * control (100)", "  * variant (0)", "- 879f81dc-22c6-468b-976a-71c47ad7b202 (omnibus_purchase_checkout)", "  * control (0)", "  * treatment (100)", "- 0a6b4cdb-c660-4b1c-a014-514efff5493e (payments_pantera)", "  * control (100)", "  * variant_a (0)", "  * variant_b (0)", "  * variant_c (0)", "- 9d8bbc9c-8072-433c-b54a-99a2437e544d (sauron_3p_event_filters)", "  * disabled (0)", "  * enabled (100)", "- 6167b08f-702c-4755-8f98-6be70140f23b (sda_v_experiment)", "  * control (0)", "  * treatment (100)", "- 7eeaa98b-d18e-41ec-bac5-0d6eb9b8aec2 (supply-leapfrog)", "  * control (100)", "  * treatment (0)", "  * test (0)", "- 4bc11f2e-e0ab-441f-a407-85c44a8259b4 (twilight_dashboard_casino_cat)", "  * control (0)", "  * variant (100)", "- 5babe887-821c-423e-9cd4-92b630247c75 (twilight_hermes_rollout_device)", "  * control (0)", "  * all (0)", "  * blue (0)", "  * green (100)", "- 6da8a235-737d-4c0e-9fab-22d50301427c (twilight_hermes_rollout_user)", "  * control (0)", "  * all (0)", "  * blue (0)", "  * green (100)", "- da034a34-736e-4c7f-9576-2113cc7ce211 (v6s_versions)", "  * control (0)", "  * treatment (100)", "- 717b46fe-d568-4230-aa36-725c41f7ee8e (v6ssdk_version)", "  * 1.1.8 (0)", "  * 1.1.9 (0)", "  * 1.2.1 (0)", "  * 1.2.2 (0)", "  * 1.2.3 (100)", "- 48bc90ab-9275-45be-9bd4-9b809645d99a (vid_omsdk_v_experiment)", "  * control (0)", "  * treatment (100)", "- bf2b721a-14f4-4250-844a-101911395cfe (web_disco_better_tags)", "  * control (100)", "  * variant1 (0)", "  * variant2 (0)", "0 experiments were activated, 31 experiments were deactivated.", "Deactivated experiments:", "- 4437d119-2c19-4770-8492-d55bf43a56fc (ads_cspon_video_token_refresh)", "  * control (0)", "  * active (100)", "- 9a466bb5-b5e7-4286-a3b7-54bf59c56894 (amazon_ivs_web_broadcast_disable_token_reuse_msg)", "  * control (100)", "  * treatment (0)", "- a9d6476f-3e00-44a9-bbf5-9094cdaced5c (amazon_ivs_web_broadcast_enable_xdp_publish)", "  * control (0)", "  * treatment (100)", "- d333bbdb-e32b-4e5a-82c3-6b781dcb729e (auto_increment_goal)", "  * control (0)", "  * treatment (100)", "- 8e25d83c-086a-4776-ab71-bea1f5d810c4 (bva)", "  * off (0)", "  * on (100)", "- d2da6787-f0ca-4210-9e6d-2016e3f64721 (clips_leaderboard_final_rollout)", "  * control (0)", "  * active (100)", "  * active_tcp (0)", "- eef2ed99-81d7-4119-9ac4-3b9e636ee0dd (cplat_unified_home)", "  * control (0)", "  * variant (100)", "- 0a603b81-08db-4537-a52a-bf7b71ac6182 (garfield_discovery_control)", "  * control (100)", "  * variant (0)", "- cd9316f2-9180-4045-ae80-daf14a6f54b3 (garfield_gambling_ccl)", "  * control (100)", "  * variant (0)", "- 53a4bb14-432f-4dcd-b5d4-e61221e32ab9 (hva)", "  * control (0)", "  * treatment (100)", "- a680f572-fc37-4836-b07b-a2357b4037cb (ivs_player_abr_score)", "  * control (100)", "  * treatment (0)", "- 3712c2b4-41d2-437c-8e37-83e236543cef (ivs_player_probe_endpoint)", "  * control (0)", "  * treatment (100)", "- 171673d5-bd3f-438c-b9da-70ca99609b25 (ivs_player_web_dropped_frame_filter)", "  * control (100)", "  * holdback (0)", "  * treatment_10 (0)", "  * treatment_999 (0)", "- 59d57100-3c9c-4f13-aeff-9b1c1b6b4c66 (ivs_player_web_gpu_transform_staff)", "  * control (100)", "- a5c3a8f0-d293-4597-af87-f0352c58d1b3 (ivs_web_player_device_config_prod_test)", "  * control (100)", "  * treatment (0)", "- df56fefb-5585-42ad-b169-a33558100fb5 (ivs_web_rtx_multi_codec_answer)", "  * control (0)", "  * treatment (100)", "- d6aec4f1-f70c-4dac-818a-63850d7185a7 (ivs_web_rtx_prefer_main_profile)", "  * control (100)", "  * treatment (0)", "- 784cb249-5507-4cc2-bfec-a2190d291ad6 (lychee_durian_cherry)", "  * control (0)", "  * variant (100)", "- 4efa4a70-fdb2-45c2-ae30-e6ac42c1c56b (MSO_rollout_flag)", "  * control (100)", "  * treatment (0)", "- 20337876-3d95-4fe9-afe1-3ffb22208593 (next-up)", "  * control (100)", "  * variant (0)", "- 879f81dc-22c6-468b-976a-71c47ad7b202 (omnibus_purchase_checkout)", "  * control (0)", "  * treatment (100)", "- 0a6b4cdb-c660-4b1c-a014-514efff5493e (payments_pantera)", "  * control (100)", "  * variant_a (0)", "  * variant_b (0)", "  * variant_c (0)", "- 6167b08f-702c-4755-8f98-6be70140f23b (sda_v_experiment)", "  * control (0)", "  * treatment (100)", "- 7eeaa98b-d18e-41ec-bac5-0d6eb9b8aec2 (supply-leapfrog)", "  * control (100)", "  * treatment (0)", "  * test (0)", "- 4bc11f2e-e0ab-441f-a407-85c44a8259b4 (twilight_dashboard_casino_cat)", "  * control (0)", "  * variant (100)", "- 5babe887-821c-423e-9cd4-92b630247c75 (twilight_hermes_rollout_device)", "  * control (0)", "  * all (0)", "  * blue (0)", "  * green (100)", "- 6da8a235-737d-4c0e-9fab-22d50301427c (twilight_hermes_rollout_user)", "  * control (0)", "  * all (0)", "  * blue (0)", "  * green (100)", "- da034a34-736e-4c7f-9576-2113cc7ce211 (v6s_versions)", "  * control (0)", "  * treatment (100)", "- 717b46fe-d568-4230-aa36-725c41f7ee8e (v6ssdk_version)", "  * 1.1.8 (0)", "  * 1.1.9 (0)", "  * 1.2.1 (0)", "  * 1.2.2 (0)", "  * 1.2.3 (100)", "- 48bc90ab-9275-45be-9bd4-9b809645d99a (vid_omsdk_v_experiment)", "  * control (0)", "  * treatment (100)", "- bf2b721a-14f4-4250-844a-101911395cfe (web_disco_better_tags)", "  * control (100)", "  * variant1 (0)", "  * variant2 (0)", "1 experiments were modified:", "- 59d57100-3c9c-4f13-aeff-9b1c1b6b4c66 (ivs_player_web_gpu_transform_staff)", "  * active flag changed from true to false"];
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
//# sourceMappingURL=Footer-DDXFIqN-.js.map
