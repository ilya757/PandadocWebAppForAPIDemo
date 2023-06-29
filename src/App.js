import React, { useState } from "react";
import "./styles.css";
import Form from "./Form.js";
import Doc from "./Doc.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import ModeSwitcher from "./ModeSwitcher/ModeSwitcher";

export default function App() {
  const [state, setState] = useState({ mode: "demo", stage: 1, docURI: null });

  const handleModeChange = (e) => {
    let mode = e.target.checked ? "tutorial" : "demo";
    setState({ ...state, mode });
    return;
  };

  return state.stage === 1 ? (
    <>
      <div style={{ paddingLeft: state.mode === "tutorial" ? 500 : 0 }}>
        <Typography
          style={{ textAlign: "center", marginLeft: -22, marginTop: 20 }}
          variant="h5"
        >
          Select Mode
        </Typography>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ top: ".5em", position: "relative", left: "-.5em" }}>
              <Typography variant="body1">Demo</Typography>
            </span>
            <FormControlLabel
              value="top"
              control={<Switch onChange={handleModeChange} color="primary" />}
              label="Tutorial"
              labelPlacement="right"
            />
          </div>
        </p>
        <hr style={{ width: "110%" }} />
      </div>

      <ModeSwitcher mode={state.mode} appState={state} updateState={setState} />
    </>
  ) : state.docURI ? (
    <Doc docURI={state.docURI} />
  ) : null;
}
