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

function SimpleAccordion({ json }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Current Tokens and Pricing Table
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <JSONPretty
              style={{ fontSize: 10 }}
              id="json-pretty"
              data={{
                tokens: json.tokens,
                pricing_tables: json.pricing_tables
              }}
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

export default function StepOne(props) {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        Step One <br />
        Formatting the JSON request
      </h3>
      <div style={{ width: "100%" }}>
        <p style={{ textAlign: "center" }}>
          Welcome to the PandaDoc API/SDK walkthrough! In this tutorial, we will
          go through the process of taking data from one source (in this case a
          web form) and passing that information to PandaDoc to fill out a
          template.
          <br /> <br />
          Step one of our workflow is to format a request to send to the{" "}
          <a
            target="_blank"
            href="https://developers.pandadoc.com/reference/new-document"
          >
            <i>Create Document From PandaDoc Template</i>
          </a>{" "}
          endpoint (POST request to
          'https://api.pandadoc.com/public/v1/documents'). We are going to pass
          values from our webform to the PandaDoc document via the{" "}
          <i>
            <b>tokens</b>
          </i>{" "}
          and{" "}
          <i>
            <b>pricing_tables</b>
          </i>{" "}
          parameters.
          <br /> <br />
          In the accordian below you can take a look at the body we will send in
          the request to merge our data into the document. Your changes will be
          reflected in the in the tokens and pricing table section.
          <br /> <br />
          <b>
            Click the purple <i>CONTINUE</i> button to head to the next step.
          </b>
        </p>
        <SimpleAccordion json={props.json} />
      </div>
    </>
  );
}
