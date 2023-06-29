import React, { useState, useEffect } from "react";
import "../styles.css";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { body, reqConfig } from "../APIParams.js";

function getFormattedDate(date) {
  date = new Date(date);
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

export default function Form({
  updateState,
  appState,
  setJSON,
  tutorialStep,
  nextStep,
  setDocResponse,
  docId,
  setSigningId
}) {
  useEffect(() => {
    console.log("useEffect", tutorialStep);
  }, [tutorialStep]);
  const [state, setState] = React.useState({
    itemA: true,
    itemB: false,
    itemC: false,
    date: "2021-01-01",
    isLoading: false,
    loadingStatus: "Uploading Data..."
  });

  const resItems = [];

  const items = {
    itemA: {
      name: "Item A",
      description: "The first item available",
      price: 100,
      qty: 1,
      tax_first: {
        value: 7.5,
        type: "percent"
      },
      custom_fields: { Fluffiness: "5 / 5" }
    },
    itemB: {
      price: 150,
      qty: 1,
      name: "Item B",
      description: "The second item available",
      tax_first: {
        value: 7.5,
        type: "percent"
      },
      custom_fields: { Fluffiness: "5 / 5" }
    },
    itemC: {
      price: 199,
      qty: 1,
      name: "Item C",
      description: "The third item available.",
      tax_first: {
        value: 7.5,
        type: "percent"
      },
      custom_fields: { Fluffiness: "5 / 5" }
    }
  };

  const handleChange = (event) => {
    let JSONitems = [],
      stateCopy = { ...state };
    stateCopy[event.target.name] = event.target.checked;
    Object.keys(stateCopy).forEach((key) => {
      if (typeof stateCopy[key] === "boolean" && stateCopy[key]) {
        JSONitems.push({
          options: {
            optional: true,
            optional_selected: true,
            qty_editable: true
          },
          data: items[key]
        });
      }
    });
    let JSONBody = body;

    JSONBody["pricing_tables"][0]["sections"][0]["rows"] = JSONitems;

    setJSON(JSONBody);
    setState({ ...state, [event.target.name]: event.target.checked });
    return;
  };

  const handleDocRes = (res) => {
    setDocResponse(res.data, tutorialStep);
  };

  const handleCreateDoc = () => {
    Object.keys(state).forEach((key) => {
      if (typeof state[key] === "boolean" && state[key]) {
        resItems.push({
          options: {
            optional: true,
            optional_selected: true,
            qty_editable: true
          },
          data: items[key]
        });
      }
    });
    setState({ ...state, isLoading: true });
    let POSTBody = body;

    POSTBody["pricing_tables"][0]["sections"][0]["rows"] = resItems;
    POSTBody["tokens"] = [
      ...POSTBody.tokens,
      { name: "user.date", value: state.date }
    ];
    axios
      .post("https://api.pandadoc.com/public/v1/documents", POSTBody, reqConfig)
      .then((res) => {
        handleDocRes(res);
      });
  };

  const checkDocStatus = () => {
    let status;
    console.log("checkdocstatus", docId);
    axios
      .get(`https://api.pandadoc.com/public/v1/documents/${docId}`, reqConfig)
      .then((res) => {
        status = res.data.status;
        console.log("start polling");
        if (status === "document.draft") {
          console.log(
            "resolved" +
              `https://api.pandadoc.com/public/v1/documents/${docId}/session`
          );
          setState({
            ...state,
            isLoading: true,
            loadingStatus: "Document Ready"
          });
        } else {
          setTimeout(checkDocStatus(docId), 1000);
        }
      });
  };

  const handleShareLink = () => {
    setState({
      ...state,
      isLoading: true,
      loadingStatus: "Rendering Iframe..."
    });

    axios
      .post(
        `https://api.pandadoc.com/public/v1/documents/${docId}/send`,
        {
          message: "Hello! This document was sent from the PandaDoc API.",
          subject: "Please check this test API document from PandaDoc",
          silent: true
        },
        reqConfig
      )
      .then((res) => {
        axios
          .post(
            `https://api.pandadoc.com/public/v1/documents/${docId}/session`,
            {
              recipient: "apiexample@pandadoc.com",
              lifetime: 900
            },
            reqConfig
          )
          .then((docRes) => {
            setSigningId(docRes.data);
          });
      });
  };

  const handleSubmit = () => {
    console.log("handle submit", tutorialStep);
    switch (tutorialStep) {
      case 0:
        nextStep();
        handleCreateDoc();
        break;
      case 1:
        nextStep();
        checkDocStatus(state.docId);
        break;
      case 2:
        nextStep();
        setState({
          ...state,
          isLoading: true,
          loadingStatus: "Render Iframe"
        });
        break;
      case 3:
        handleShareLink();
        break;
      default:
        break;
    }
    // try {
    //   axios
    //     .post(
    //       "https://api.pandadoc.com/public/v1/documents",
    //       POSTBody,
    //       reqConfig
    //     )
    //     .then((res) => {
    //       let docId = res.data.id;
    //       setState({
    //         ...state,
    //         loadingStatus: "Creating Document...",
    //         isLoading: true,
    //         docId
    //       });
    //       // Poll server to find out when doc is ready
    //       const checkDocStatus = (id) => {
    //         let status;
    //         axios
    //           .get(
    //             `https://api.pandadoc.com/public/v1/documents/${id}`,
    //             reqConfig
    //           )
    //           .then((res) => {
    //             status = res.data.status;
    //             console.log("start polling");
    //             if (status === "document.draft") {
    //               console.log(
    //                 "resolved" +
    //                   `https://api.pandadoc.com/public/v1/documents/${docId}/session`
    //               );
    //               setState({
    //                 ...state,
    //                 isLoading: true,
    //                 loadingStatus: "Fetching Document..."
    //               });

    //               axios
    //                 .post(
    //                   `https://api.pandadoc.com/public/v1/documents/${docId}/send`,
    //                   {
    //                     message:
    //                       "Hello! This document was sent from the PandaDoc API.",
    //                     subject:
    //                       "Please check this test API document from PandaDoc",
    //                     silent: true
    //                   },
    //                   reqConfig
    //                 )
    //                 .then((docRes) => {
    //                   axios
    //                     .post(
    //                       `https://api.pandadoc.com/public/v1/documents/${docId}/session`,
    //                       {
    //                         recipient: "anthony.felix+api@pandadoc.com",
    //                         lifetime: 900
    //                       },
    //                       reqConfig
    //                     )
    //                     .then((docRes) => {
    //                       console.log("docres" + docRes.data.id);
    //                       let docURI = `https://app.pandadoc.com/s/${docRes.data.id}`;
    //                       updateState({ ...appState, stage: 2, docURI });
    //                     });
    //                 });
    //             } else {
    //               setTimeout(checkDocStatus(id), 1000);
    //             }
    //           });
    //       };
    //       checkDocStatus(docId);
    //     });
    // } catch (error) {
    //   alert(error);
    // }
  };

  return (
    <div className="App">
      <h1>Little E-shop</h1>
      <h2>Products</h2>
      <hr style={{ width: "50%", marginTop: "-1em", marginBottom: "1em" }} />

      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <FormControlLabel
          disabled={tutorialStep}
          control={
            <Checkbox
              checked={state.itemA}
              onChange={handleChange}
              name="itemA"
            />
          }
          label="Item A - $100"
        />
        <FormControlLabel
          disabled={tutorialStep}
          control={
            <Checkbox
              checked={state.itemB}
              onChange={handleChange}
              name="itemB"
            />
          }
          label="Item B - $150"
        />
        <FormControlLabel
          disabled={tutorialStep}
          control={
            <Checkbox
              checked={state.itemC}
              onChange={handleChange}
              name="itemC"
            />
          }
          label="Item C - $199"
        />
        <h2>Order Date</h2>
        <hr style={{ width: "50%", marginTop: "-1em", marginBottom: "2em" }} />
        <TextField
          disabled={tutorialStep}
          id="date"
          label="Order Date"
          type="date"
          defaultValue="2021-01-01"
          style={{ width: "60%" }}
          onChange={(e) => {
            setState({ ...state, date: getFormattedDate(e.target.value) });
          }}
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
      <Button
        variant="contained"
        size="large"
        color="primary"
        style={{ marginTop: "2em", width: "70%" }}
        onClick={handleSubmit}
      >
        {!state.isLoading ? "Continue" : state.loadingStatus}
      </Button>
    </div>
  );
}
