import axios from "axios";
import { reqConfig } from "./APIParams.js";

const checkDocStatus = (id) => {
  let status;
  axios
    .get(`https://api.pandadoc.com/public/v1/documents/${id}`, reqConfig)
    .then((res) => {
      status = res.data.status;
      if (status === "document.draft") {
        return status;
      } else {
        setTimeout(checkDocStatus(id), 1000);
      }
    });
};

export { checkDocStatus };
