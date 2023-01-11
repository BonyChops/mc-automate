import React, { useEffect, useRef, useState } from "react";
declare type Blockly = typeof import("blockly");
import "./App.css";

export const App = () => {
  const didInjectedRef = useRef(false);
  const blockly = (window as any).Blockly as Blockly;

  /* const toolbox = {
    kind: "flyoutToolbox",
    contents: [
      {
        kind: "block",
        type: "controls_if",
      },
      {
        kind: "block",
        type: "controls_repeat_ext",
      },
      {
        kind: "block",
        type: "logic_compare",
      },
      {
        kind: "block",
        type: "math_number",
      },
      {
        kind: "block",
        type: "math_arithmetic",
      },
      {
        kind: "block",
        type: "text",
      },
      {
        kind: "block",
        type: "text_print",
      },
    ],
  }; */

  // const toolbox =
  console.log(blockly.Blocks.defaultToolbox);
  const side = "start";

  useEffect(() => {
    if (!didInjectedRef.current) {
      didInjectedRef.current = true;

      const workspace = blockly.inject("blocklyDiv", {
        comments: true,
        disable: false,
        collapse: false,
        media: "./media/",
        readOnly: false,
        // rtl: rtl,
        scrollbars: true,
        // toolbox: toolbox,
        toolboxPosition: "start",
        horizontalLayout: false,
        sounds: true,
        zoom: {
          controls: true,
          wheel: true,
          startScale: 0.675,
          maxScale: 4,
          minScale: 0.25,
          scaleSpeed: 1.1,
        },
        /* colors: {
          fieldShadow: "rgba(255, 255, 255, 0.3)",
          dragShadowOpacity: 0.6,
        }, */
      });
    }
  }, []);

  return (
    <div className="container">
      <div id="blocklyDiv" style={{ height: "1200px", width: "600px" }}></div>
    </div>
  );
};
