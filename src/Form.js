import React, { useState } from "react";
import "./styles.css";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { body, reqConfig } from "./APIParams.js";
import { shackPNG } from "./const.js";
function getFormattedDate(date) {
  date = new Date(date);
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

export default function Form({ updateState, appState }) {
  const [state, setState] = React.useState({
    itemA: true,
    itemB: false,
    itemC: false,
    firstName: "John",
    lastName: "doe",
    email: "api-demo@pandadoc.com",
    date: "2021-01-01",
    location: "FL",
    isLoading: false,
    loadingStatus: "Uploading Data..."
  });

  const resItems = [];

  const items = {
    itemA: {
      name: "Basic Bamboo",
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
      name: "Deluxe Bamboo",
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
      name: "Limited Edition Bamboo NFT",
      description: "The third item available.",
      tax_first: {
        value: 7.5,
        type: "percent"
      },
      custom_fields: { Fluffiness: "5 / 5" }
    }
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value.length
        ? event.target.value
        : event.target.checked
    });
  };

  const handleSubmit = () => {
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
      { name: "user.date", value: state.date },
      { name: "location", value: state.location }
    ];

    let recipient = POSTBody["recipients"][0];

    recipient["first_name"] = state.firstName;
    recipient["last_name"] = state.lastName;
    recipient["email"] = state.email;

    try {
      axios
        .post(
          "https://api.pandadoc.com/public/v1/documents",
          POSTBody,
          reqConfig
        )
        .then((res) => {
          let docId = res.data.id;
          setState({
            ...state,
            loadingStatus: "Creating Document...",
            isLoading: true,
            docId
          });
          // Poll server to find out when doc is ready
          const checkDocStatus = (id) => {
            let status;
            axios
              .get(
                `https://api.pandadoc.com/public/v1/documents/${id}`,
                reqConfig
              )
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
                    loadingStatus: "Fetching Document..."
                  });

                  axios
                    .post(
                      `https://api.pandadoc.com/public/v1/documents/${docId}/send`,
                      {
                        message:
                          "Hello! This document was sent from the PandaDoc API.",
                        subject:
                          "Please check this test API document from PandaDoc",
                        silent: true
                      },
                      reqConfig
                    )
                    .then((docRes) => {
                      axios
                        .post(
                          `https://api.pandadoc.com/public/v1/documents/${docId}/session`,
                          {
                            recipient: state.email,
                            lifetime: 900
                          },
                          reqConfig
                        )
                        .then((docRes) => {
                          console.log("docres" + docRes.data.id);
                          let docURI = `https://app.pandadoc.com/s/${docRes.data.id}`;
                          updateState({ ...appState, stage: 2, docURI });
                        });
                    });
                } else {
                  setTimeout(checkDocStatus(id), 1000);
                }
              });
          };
          checkDocStatus(docId);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="App">
      <div>
        <img src={shackPNG} style={{ height: 100, width: 100 }} />
        <h1>The Bamboo Shack</h1>
      </div>

      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                defaultValue="John"
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                name="firstName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                onChange={handleChange}
                name="lastName"
                defaultValue="Doe"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                type="email"
                onChange={handleChange}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                defaultValue="api-demo@pandadoc.ocm"
              />
            </Grid>
          </Grid>
        </div>

        <h2>Products</h2>
        <hr style={{ width: "50%", marginTop: "-1em", marginBottom: "1em" }} />
        <div>
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: "green" }}
                checked={state.itemA}
                onChange={handleChange}
                name="itemA"
              />
            }
            label="Basic Bamboo - $100"
          />
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: "green" }}
                checked={state.itemB}
                onChange={handleChange}
                name="itemB"
              />
            }
            label="Deluxe Bamboo - $150"
          />
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: "green" }}
                checked={state.itemC}
                onChange={handleChange}
                name="itemC"
              />
            }
            label="Limited Edition Bamboo NFT - $199,999"
          />
        </div>

        <h2>Order Date</h2>
        <hr style={{ width: "50%", marginTop: "-1em", marginBottom: "2em" }} />
        <TextField
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

        <h2>Store Location</h2>
        <hr style={{ width: "50%", marginTop: "-1em", marginBottom: "2em" }} />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state.location}
          style={{ width: "50%", minWidth: 300 }}
          name="location"
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"FL"}>Florida</MenuItem>
          <MenuItem value={"CA"}>California</MenuItem>
          <MenuItem value={"NY"}>New York</MenuItem>
        </Select>
      </form>
      <Button
        variant="contained"
        size="large"
        color="primary"
        style={{
          marginTop: "2em",
          width: "70%",
          backgroundColor: "rgb(71, 185, 114)"
        }}
        onClick={handleSubmit}
      >
        {!state.isLoading ? "Continue" : state.loadingStatus}
      </Button>
    </div>
  );
}
