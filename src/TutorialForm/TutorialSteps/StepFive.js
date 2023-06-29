import React from "react";
import JSONPretty from "react-json-pretty";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactCodeSnippet from "react-code-snippet";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function SimpleAccordion({ json, docResponse, shareRes }) {
  const classes = useStyles();

  const code = `<iframe
  height={900}
  width={800}
  src={\`https://app.pandadoc.com/s/{share document id}\`}
/>`;

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>iFrame Example</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="p" style={{ width: "100%" }}>
            <ReactCodeSnippet laguage="js" code={code} />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>
            Listening For Signature Completetion
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="p">
            After signature, the PandaDoc iframe fires a document event that can
            be used to trigger a redirect or reload. More information can be
            found in{" "}
            <a
              href="https://developers.pandadoc.com/docs/javascript-form-embed"
              target="_blank"
            >
              the PandaDoc API documentation
            </a>
            .
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default function StepTwo(props) {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        Step Five
        <br />
        Rendering the iFrame
      </h3>
      <div style={{ width: "100%" }}>
        <p style={{}}>
          Congratulations! With the id we generated from the{" "}
          <i>Share Document</i> end point, we can use an iframe to render the
          signing page for our user end-user. The signer can sign the document
          without ever leaving the page and can recieve a copy of their signed
          document depending on the settings configured on the template. A
          signature certificate will be included with the completed PDF.
        </p>
        <SimpleAccordion json={props.json} docResponse={props.docResponse} />
      </div>
    </>
  );
}
