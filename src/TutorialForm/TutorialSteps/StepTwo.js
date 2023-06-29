import React from "react";
import JSONPretty from "react-json-pretty";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

  return (
    <div className={classes.root}>
      <Accordion disabled={!docResponse}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Full API Response</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <JSONPretty
              style={{ fontSize: 10 }}
              id="json-pretty"
              data={docResponse}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Preview Template</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you'd like to look at the tempalte we are using to create the
            document follow these steps:
            <br />
            <ol>
              <li>
                <a
                  target="_blank"
                  href="https://app.pandadoc.com/invite-link/6a757b10f30340edbace9eec848758fa/join"
                >
                  Join the <i>PandaDoc API Example</i> workspace.
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://app.pandadoc.com/a/#/templates/6eVvnvy3NTpDrWBv7Zfq4m"
                >
                  Follow this link to view the template. (Make sure you have
                  entered the workspace mentioned above)
                </a>
              </li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Full Request Body</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <JSONPretty style={{ fontSize: 10 }} id="json-pretty" data={json} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default function StepTwo(props) {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        Step Two
        <br />
        Creating a document from the template
      </h3>
      <div style={{ width: "100%" }}>
        <p style={{ textAlign: "center" }}>
          Clicking the <i>CONTINUE</i> button has sent a POST request to the{" "}
          <a
            target="_blank"
            href="https://developers.pandadoc.com/reference/new-document#create-document-from-pandadoc-template"
          >
            <i>Create Document From PandaDoc Template</i>
          </a>{" "}
          endpoint. We have received a response from the server containing the
          newly-created document's ID (the full response is available in the
          accordian once reiveived, it may take a few seconds to complete).{" "}
          <br /> <br /> In the next step, we will use this ID to generate a
          seperate unique ID used to share the document for signing, we will
          then render that document via iframe. <br />
          <br />
          <b>
            Click the button <i>UPLOADING DATA...</i> to continue to the next
            step.
          </b>
        </p>
        <SimpleAccordion json={props.json} docResponse={props.docResponse} />
      </div>
    </>
  );
}
