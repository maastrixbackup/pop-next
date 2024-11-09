import axios from "axios";

export const APIURL = () => {
  return "https://poptelecom.co.uk/poptelecom/public/api/";
  // return "https://broadbandbroker.co.uk/poptelecom/public/api/";
  //  return "http://192.168.1.46/poptelecom/public/api/";
};
export const APIPath = () => {
  //  return "/";
  return "/";
};
// "homepage": "http://139.59.28.82/mybid_frontend/",
// yarn add final-form react-final-form
export const fetchAllRecords = (url, ctoken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, ctoken)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
        } else {
          reject(err);
        }
      });
  });
};
export const fetchRecordByID = (url, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + id)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
