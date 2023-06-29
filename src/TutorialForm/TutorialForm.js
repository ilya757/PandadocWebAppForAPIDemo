import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Form from "./Form";
import Steps from "./TutorialSteps/TutorialSteps";

const drawerWidth = 500;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    alignItems: "center",
    padding: "1em"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const [state, setState] = useState({
    step: 0,
    json: {
      name: "API Sample Document from PandaDoc Template",
      template_uuid: "BXbapxD22EsutwsqvwBxjL",
      tags: ["tag_1", "tag_2"],
      recipients: [
        {
          email: "anthony.felix+api@pandadoc.com",
          first_name: "Jane",
          last_name: "Doe",
          role: "user"
        }
      ],
      tokens: [
        {
          name: "Favorite.Pet",
          value: "Panda"
        }
      ],
      fields: {
        "Favorite.Color": {
          value: "PandaDoc green",
          title: "Favorite.Color"
        },
        Delivery: {
          value: "Same Day Delivery",
          title: "Delivery"
        },
        Like: {
          value: true
        },
        Date: {
          value: "2019-12-31T00:00:00.000Z"
        }
      },
      images: [
        {
          name: "TextBlock1",
          urls: [
            "https://s3.amazonaws.com/pd-static-content/public-docs/pandadoc-panda-bear.png"
          ]
        }
      ],
      metadata: {
        opp_id: "123456",
        my_favorite_pet: "Panda"
      },

      pricing_tables: [
        {
          name: "PricingTable1",
          options: {
            currency: "USD",
            discount: {
              is_global: true,
              type: "absolute",
              name: "Global Discount",
              value: 2.26
            }
          },
          sections: [
            {
              title: "Sample Section",
              default: true,
              rows: [
                {
                  options: {
                    optional: true,
                    optional_selected: true,
                    qty_editable: true
                  },
                  data: {
                    name: "Item A",
                    description: "The first item available",
                    price: 100,
                    qty: 1,
                    tax_first: {
                      value: 7.5,
                      type: "percent"
                    }
                  },
                  custom_fields: {
                    Fluffiness: "5 / 5"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    docId: 0
  });

  const handleUpdateJSON = (newJSON) => {
    return setState({ ...state, json: newJSON });
  };

  const nextStep = () => {
    return setState({ ...state, step: state.step + 1 });
  };

  const setDocResponse = (res, step) => {
    return setState({ ...state, docResponse: res, step: state.step + 1 });
  };

  const setSigningId = (res) => {
    console.log("share res should be", res);
    return setState({
      ...state,
      shareRes: res,
      signId: res.id,
      step: state.step + 1
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Typography variant="h4">Tutorial Mode</Typography>
        <Steps state={state} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: true
        })}
      >
        <div className={classes.drawerHeader} />
        {!state.signId ? (
          <Form
            tutorialStep={state.step}
            setJSON={handleUpdateJSON}
            nextStep={nextStep}
            setDocResponse={setDocResponse}
            docId={state.docResponse ? state.docResponse.id : null}
            setSigningId={setSigningId}
          />
        ) : (
          <iframe
            height={900}
            width={800}
            src={`https://app.pandadoc.com/s/${state.signId}`}
          />
        )}
      </main>
    </div>
  );
}
