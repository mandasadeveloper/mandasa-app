import { DragIconWrapper } from "../styles";
import { DragHandleMinor } from "@shopify/polaris-icons";
import React from "react";

export function DragHandle(props) {
  return (
    <DragIconWrapper {...props}>
      <DragHandleMinor />
    </DragIconWrapper>
  );
}
