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

  React.useEffect(() => {
    console.log("docResponse", docResponse);
  }, [docResponse]);

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
          <Typography className={classes.heading}>
            Preview Created Document
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="p">
            If you'd like to look at the document we created go follow these
            Steps (if you already joined the workspace, skip step 1):{" "}
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
                  href={`https://app.pandadoc.com/a/#/documents/${docResponse.id}`}
                >
                  Follow this link to view the newly created document. (Make
                  sure you have entered the workspace mentioned above)
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
          <Typography className={classes.heading}>
            Endpoint URL & Request Body
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="p">
            <h3>Send Document Request</h3>
            We are sending a POST request to{" "}
            <i style={{ fontSize: 11.5 }}>
              https://api.pandadoc.com/public/v1/documents/{docResponse.id}
              /send
            </i>
            <br />
            <br />
            The body of that request was
            <JSONPretty
              style={{ fontSize: 10 }}
              id="json-pretty"
              data={{
                message: "Hello! This document was sent from the PandaDoc API.",
                subject: "Please check this test API document from PandaDoc",
                silent: true
              }}
            />
            <h3>Share Link Request</h3>
            We are sending a POST request to{" "}
            <i style={{ fontSize: 11.5 }}>
              https://api.pandadoc.com/public/v1/documents/{docResponse.id}
              /session
            </i>
            <br />
            <br />
            The body of that request was
            <JSONPretty
              style={{ fontSize: 10 }}
              id="json-pretty"
              data={{
                recipient: "apiexample@pandadoc.com",
                lifetime: 900
              }}
            />
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
        Step Four
        <br />
        Creating Document Link
      </h3>
      <div style={{ width: "100%" }}>
        <p style={{}}>
          Now that our document is ready, we can use its ID to create a "view"
          for the document. <br />
          <br /> Because a <i>draft</i> document cannot be signed, we first need
          to need to set the document to <i>document.sent</i> status. We will do
          that by sending a POST request to the{" "}
          <a
            href="https://developers.pandadoc.com/reference/send-document"
            target="_blank"
          >
            <i>Send Document</i>
          </a>{" "}
          end point. For our example, we are setting the document to <i>sent</i>{" "}
          without sharing the document via email, we do that by setting the{" "}
          <i>silent</i> parameter in the request body to <i>true</i>. <br />
          <br />
          Once the PandaDoc generates a unqiue ID that a recipient can use to
          access the document for signing. This is accomplished by sending a
          request to the{" "}
          <a
            target="_blank"
            href="https://developers.pandadoc.com/reference/share-document#link-to-a-document"
          >
            <i>Create Document Link</i>
          </a>{" "}
          endpoint, that includes the recipient's email address and the number
          of seconds the link will be valid for. For the purposes of this
          example, the recipient email has been preset.
          <br />
          <br />
          <b>
            Click the button <i>RENDER IFRAME</i> to continue to the next step.
          </b>
        </p>
        <SimpleAccordion json={props.json} docResponse={props.docResponse} />
      </div>
    </>
  );
}
