import axios from "axios";
const headers = {
  "Content-type": "application/json",
};
export const postRecord = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
export const putRecord = (url, id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url + id, data, {
        headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
export const deleteRecord = (url, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url + id, {
        headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
export const loginCheck = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
export const fetchCustomRecord = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
export const fetchdata = (url, data, header) => {
  var myHeaders = new Headers();

  var formdata = new FormData();
  Object.entries(header).forEach((entry) => {
    const [key, value] = entry;
    myHeaders.append(key, value);
  });
  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    formdata.append(key, value);
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(url, requestOptions);
};
export const axiosPost = (
  url,
  data,
  header = "'Accept': 'application/json'",
  payload
) => {
  var formdata = new FormData();
  if (data) {
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      formdata.append(key, value);
    });
  }
  if (payload) formdata = payload;
  return axios({
    method: "post",
    url: url,
    data: formdata,
    headers: {
      Authorization: "Bearer Bearer POPTELECOM@987612",
      Accept: "application/json",
    },
  });
};
export const axiosGet = (url, data = {}) => {
  var config = {
    method: "get",
    url: url,
    headers: {
      Authorization: "Bearer Bearer POPTELECOM@987612",
    },
  };

  return axios(config);
};
export const getMerchantSessionKey = (env, key, vendor) => {
  return fetch(`https://pi-${env}.sagepay.com/api/v1/merchant-session-keys`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${key}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      vendorName: `${vendor}`,
      // vendorName: 'poptelecom',
    }),
  });
};
export const getCardIdentifier = (merchantSessionKey, cardDetails, env) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${merchantSessionKey}`);

  var raw = JSON.stringify({
    cardDetails: {
      ...cardDetails,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    `https://pi-${env}.sagepay.com/api/v1/card-identifiers`,
    requestOptions
  );
};
export const paymentApi = (
  merchantSessionKey,
  cardIdentifier,
  userDetails,
  transactionCode,
  upfrontPayment,
  key,
  env,
  ipAddress
) => {
  var address = userDetails.address.split(",");
  var length = address.length;
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Basic ${key}`);
  myHeaders.append("Content-Type", "application/json");
  const doorNumber = address[length - 4] ? address[length - 4] : "";
  const street = address[length - 3] ? address[length - 3] : "";
  const address1 = doorNumber + street;
  var raw = JSON.stringify({
    transactionType: "Payment",
    paymentMethod: {
      card: {
        merchantSessionKey: merchantSessionKey,
        cardIdentifier: cardIdentifier,
        reusable: false,
        save: false,
      },
    },
    vendorTxCode: transactionCode,
    amount: Math.trunc((Number(upfrontPayment).toFixed(2)) * 100),
    currency: "GBP",
    description: "bestbroadbandcompany",
    customerFirstName: userDetails.first_name,
    customerLastName:
      !userDetails.last_name || userDetails.last_name == ""
        ? "last name"
        : userDetails.last_name,
    billingAddress: {
      address1: address1,
      city: address[length - 2],
      postalCode: address[length - 1],
      country: "GB",
    },
    entryMethod: "Ecommerce",
    customerEmail: userDetails.email,
    customerPhone: Number(userDetails.mobile_number),
    apply3DSecure: "Disable",
    applyAvsCvcCheck: "UseMSPSetting",
    // shippingDetails: {
    //   recipientFirstName: userDetails.first_name,
    //   recipientLastName:
    //     userDetails.last_name != "" ? userDetails.last_name : "last name",
    //   shippingAddress1: address[length - 3],
    //   shippingCity: address[length - 2],
    //   shippingPostalCode: address[length - 1],
    //   shippingCountry: "GB",
    //   shippingState: "st",
    // },
    strongCustomerAuthentication: {
      notificationURL: "https://bestbroadbandcompany.com",
      browserIP: ipAddress,
      browserAcceptHeader: "\\*/\\*",
      browserJavascriptEnabled: false,
      browserJavaEnabled: false,
      browserLanguage: "string",
      browserUserAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:67.0) Gecko/20100101 Firefox/67.0",
      challengeWindowSize: "Small",
      transType: "GoodsAndServicePurchase",
      threeDSRequestorAuthenticationInfo: {
        threeDSReqAuthData: "string",
        threeDSReqAuthMethod: "LoginWithThreeDSRequestorCredentials",
        threeDSReqAuthTimestamp: "201810011445",
      },
      threeDSRequestorPriorAuthenticationInfo: {
        threeDSReqPriorAuthData: "data",
        threeDSReqPriorAuthMethod: "FrictionlessAuthentication",
        threeDSReqPriorAuthTimestamp: "201901011645",
        threeDSReqPriorRef: "2cd842f5-da5d-40b7-8ae6-6ce61cc7b580",
      },
      threeDSExemptionIndicator: "TransactionRiskAnalysis",
      website: "https://bestbroadbandcompany.com",
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    `https://pi-${env}.sagepay.com/api/v1/transactions`,
    requestOptions
  );
};
export const verifyEmail = (email) => {
  var data = {
    Key: "DA29-PD91-BN79-KU55",
    Email: email,
  };
  var url =
    "https://api.addressy.com/EmailValidation/Interactive/Validate/v2.00/json3.ws";
  return axiosPost(url, data);
};
export const verifyPhone = (phone) => {
  var data = {
    Key: "DA29-PD91-BN79-KU55",
    Phone: phone,
    Country: "GB",
  };
  var url =
    "https://api.addressy.com/PhoneNumberValidation/Interactive/Validate/v2.20/json3.ws";
  return axiosPost(url, data);
};
