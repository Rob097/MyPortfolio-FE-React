import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

Builder.registerComponent(
  dynamic(() => import("./components/Counter/Counter")),
  {
    name: "Counter",
  }
);

Builder.registerComponent(
  dynamic(() => import("@mui/material/Button")),
  {
    name: "Button",
    inputs: [
      {
        name: "children",
        type: "text",
        defaultValue: "Click me",
      },
      {
        name: "variant",
        type: "text",
        defaultValue: "contained",
      },
      {
        name: "color",
        type: "text",
        defaultValue: "primary",
      },
      {
        name: "size",
        type: "text",
        defaultValue: "medium",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
      },
    ],
  }
);