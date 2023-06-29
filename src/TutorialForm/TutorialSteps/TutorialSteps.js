import React from "react";
import JSONPretty from "react-json-pretty";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
const tutorialSteps = ({ state }) => {
  let render;
  switch (state.step) {
    case 0:
      render = <StepOne json={state.json} />;
      break;
    case 1:
      render = <StepTwo json={state.json} docResponse={state.docResponse} />;
      break;
    case 2:
      render = <StepThree json={state.json} docResponse={state.docResponse} />;
      break;
    case 3:
      render = <StepFour json={state.json} docResponse={state.docResponse} />;
      break;
    case 4:
      render = (
        <StepFive
          json={state.json}
          docResponse={state.docResponse}
          shareRes={state.shareRes}
        />
      );
      break;
    default:
      render = <h1>Error</h1>;
  }
  return render;
};

export default tutorialSteps;
