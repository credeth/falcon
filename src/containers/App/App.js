import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, LocaleProvider, Icon, Menu } from "antd";
import Sidebar from "../Sidebar";
import AppRouter from "./AppRouter";
import enUS from "antd/lib/locale-provider/en_US";
import web3Obj from "utils/web3.helper";

const { Content, Sider, Header } = Layout;

export class App extends Component {
  state = { collapsed: false };
  // componentDidMount() {
  //   import("@toruslabs/torus-embed").then(() => {
  //     setTimeout(() => {
  //       web3Obj.setweb3();
  //     }, 1000);
  //   });
  // }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { url } = this.props.match;
    const { app } = this.props;
    return (
      <LocaleProvider locale={enUS}>
        <Layout style={{ height: "100vh" }}>
          <Content id="p-layout" className="p-layout">
            <AppRouter url={url} />
          </Content>
        </Layout>
      </LocaleProvider>
    );
  }
}
const mapStateToProps = state => {
  const { App, UI } = state;

  return {
    app: App,
    doneActions: UI.doneActions
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
