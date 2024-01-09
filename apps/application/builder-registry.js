import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

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

// Component with Font size as a style property
Builder.registerComponent(
  dynamic(() => import("@mui/material/Icon")),
  {
    name: "Icon",
    inputs: [
      {
        name: "children",
        type: "text",
        defaultValue: "home",
      },
      {
        name: "color",
        type: "text",
        defaultValue: "primary",
      }
    ],
    defaultStyles: {
      width: "fit-content",
    },
  }
);

// Register accordion component (components/builder-io/Accordion.jsx) (Ten elements)
Builder.registerComponent(
  dynamic(() => import("./components/builder-io/Accordion")),
  {
    name: "Accordion",
    inputs: [
      {
        name: "firstTitle",
        type: "text",
        defaultValue: "First Accordion Title",
      },
      {
        name: "firstContent",
        type: "text",
        defaultValue: "First Accordion Content",
      },
      {
        name: "secondTitle",
        type: "text",
        defaultValue: "Second Accordion Title",
      },
      {
        name: "secondContent",
        type: "text",
        defaultValue: "Second Accordion Content",
      },
      {
        name: "thirdTitle",
        type: "text",
        defaultValue: "Third Accordion Title",
      },
      {
        name: "thirdContent",
        type: "text",
        defaultValue: "Third Accordion Content",
      },
      {
        name: "fourthTitle",
        type: "text",
        defaultValue: "Fourth Accordion Title",
      },
      {
        name: "fourthContent",
        type: "text",
        defaultValue: "Fourth Accordion Content",
      },
      {
        name: "fifthTitle",
        type: "text",
        defaultValue: "Fifth Accordion Title",
      },
      {
        name: "fifthContent",
        type: "text",
        defaultValue: "Fifth Accordion Content",
      },
      {
        name: "sixthTitle",
        type: "text",
        defaultValue: "Sixth Accordion Title",
      },
      {
        name: "sixthContent",
        type: "text",
        defaultValue: "Sixth Accordion Content",
      },
      {
        name: "seventhTitle",
        type: "text",
        defaultValue: "Seventh Accordion Title",
      },
      {
        name: "seventhContent",
        type: "text",
        defaultValue: "Seventh Accordion Content",
      },
      {
        name: "eighthTitle",
        type: "text",
        defaultValue: "Eighth Accordion Title",
      },
      {
        name: "eighthContent",
        type: "text",
        defaultValue: "Eighth Accordion Content",
      },
      {
        name: "ninthTitle",
        type: "text",
        defaultValue: "Ninth Accordion Title",
      },
      {
        name: "ninthContent",
        type: "text",
        defaultValue: "Ninth Accordion Content",
      },
      {
        name: "tenthTitle",
        type: "text",
        defaultValue: "Tenth Accordion Title",
      },
      {
        name: "tenthContent",
        type: "text",
        defaultValue: "Tenth Accordion Content",
      }
    ],
  }
);
