import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { LocaleProvider } from "antd";
import DashApp from "./dashApp";
import enUS from "antd/lib/locale-provider/en_US";

render(
  <LocaleProvider locale={enUS}>
    <DashApp />
  </LocaleProvider>,
  document.getElementById("root")
);
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./dashApp.js", () => {
    const NextApp = require("./dashApp").default;
    ReactDOM.render(<NextApp />, document.getElementById("root"));
  });
}
registerServiceWorker();
