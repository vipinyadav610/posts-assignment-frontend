import { getItem, removeItem } from "Utils/Storage";
import { messageNotification } from "Utils/notification";
import history from "../history";

class FetchBase {
  get jsonHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: getItem("session-token")
    };
  }
  get formHeaders() {
    return {
      Authorization: getItem("session-token")
    };
  }

  // for serializing the object to query string
  serialize(obj = {}) {
    return Object.keys(obj).length
      ? "?" +
          Object.keys(obj)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
            .join("&")
      : "";
  }

  // this will convert object to form data
  getFormData(object = {}) {
    const formData = new FormData();
    Object.entries(object).forEach(([key, value]) =>
      formData.append(key, value)
    );
    return formData;
  }

  // this will construct the API url
  constructUrl(url) {
    return process.env.REACT_APP_API_URL + url;
  }

  get(url, data) {
    return fetch(this.constructUrl(url) + this.serialize(data), {
      method: "GET",
      headers: this.jsonHeaders
    })
      .then(response => {
        if (response.status === 401) {
          removeItem("session-token");
          history.push("/login");
        }
        return response.json();
      })
      .then(response => {
        return response;
        if (response.success) {
          return response;
        } else {
          messageNotification("error", response.message);
          throw new Error(response.message);
        }
      });
  }
  // this method return stringify payload
  postBody(data = {}) {
    const dataNew = data || {};
    Object.keys(dataNew).forEach(key => {
      if (dataNew[key] === undefined) {
        delete dataNew[key];
      }
    });

    return JSON.stringify(dataNew);
  }

  post(url, data, type) {
    return fetch(this.constructUrl(url), {
      method: "POST",
      body: type === "form" ? this.getFormData(data) : this.postBody(data),
      headers: type === "form" ? this.formHeaders : this.jsonHeaders
    })
      .then(response => {
        if (response.status === 401) {
          removeItem("session-token");
          history.push("/login");
        }
        return response.json();
      })
      .then(response => {
        if (response.success) {
          return response;
        } else {
          messageNotification("error", response.message);
          throw new Error(response.message);
        }
      });
  }
}
export default FetchBase;
