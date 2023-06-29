import React from "react";
import Form from "../Form.js";
import TutorialForm from "../TutorialForm/TutorialForm";

export default function ModeSwitcher(props) {
  return props.mode === "demo" ? (
    <Form appState={props.appState} updateState={props.updateState} />
  ) : (
    <TutorialForm />
  );
}
