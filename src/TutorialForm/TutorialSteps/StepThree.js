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

function SimpleAccordion({ json, docResponse }) {
  const classes = useStyles();

  const code = `const checkDocStatus = (id) => {
    let status;
    axios
      .get(
        \`https://api.pandadoc.com/public/v1/documents/\${id}\`,
        reqConfig
      )
      .then((res) => {
        status = res.data.status;
        console.log("start polling");
        if (status === "document.draft") {
          {run next step here}
        } else {
          setTimeout(checkDocStatus(id), 1000);
        }
      });
  };`;

  return (
    <div className={classes.root}>
      <Accordion disabled={!docResponse}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Document Status Polling Example
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ReactCodeSnippet laguage="js" code={code} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default function StepTwo(props) {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        Step Three
        <br />
        Check The Document Status
      </h3>
      <div style={{ width: "100%" }}>
        <p style={{}}>
          You may have noticed that in our response from the PandaDoc server,
          the <i>Status</i> parameter came back as <i>document.uploaded</i>.
          This is because document creation via API happens asynchronously,
          which means we receive our response before the document is ready so we
          need to wait until the document has been processed, and is placed in{" "}
          <i>draft</i> status. There are two ways to accompish this:
          <ul>
            <li>
              Poll the server using the document ID to check the document status
              until the status updates (this is what our example does)
            </li>
            <li>
              Use a{" "}
              <a
                target="_blank"
                href="https://developers.pandadoc.com/reference/on-document-status-change"
              >
                Webhook
              </a>{" "}
              to trigger the next step of our process
            </li>
          </ul>
          <br />
          <b>
            Wait until the purple button's text changes to <i>Document Ready</i>{" "}
            (this means the document we created was set to draft status), then
            click the button to continue.
          </b>
        </p>
        <SimpleAccordion json={props.json} docResponse={props.docResponse} />
      </div>
    </>
  );
}
