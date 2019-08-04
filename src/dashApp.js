import React from "react";
import { Spin, Skeleton } from "antd";
import { Provider } from "react-redux";
import { store, history } from "./config/store";
import PublicRoutes from "./router";
import "./styles/styles.less";
import web3Obj from "utils/web3.helper";
import auth from "utils/authenticator";
class DashApp extends React.Component {
  state = {
    show: false
  };
  async componentWillMount() {
    window.web3 = {};
    window.ethereum = null;

    await import("@toruslabs/torus-embed");
    let self = this;
    setTimeout(() => {
      web3Obj.setweb3().then(() => {});
      let timer = setInterval(function() {
        if (!auth.getToken()) {
          self.setState({ show: true });
        } else {
          if (window.web3.eth.accounts && window.web3.eth.accounts.length > 0) {
            clearInterval(timer);
            web3Obj.setContractInstance();
            self.setState({ show: true });
          }
        }
      }, 300);
    }, 1000);
  }
  render() {
    return (
      <>
        {!this.state.show && (
          <div style={{ padding: 24 }}>
            <Skeleton active />
          </div>
        )}
        {this.state.show && (
          <Provider store={store}>
            <PublicRoutes history={history} />
          </Provider>
        )}
      </>
    );
  }
}

export default DashApp;
