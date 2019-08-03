import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, LocaleProvider } from "antd";
import Sidebar from "../Sidebar";
import AppRouter from "./AppRouter";
import enUS from "antd/lib/locale-provider/en_US";
import ModalRoot from "utils/ModalSelector";

const { Content } = Layout;

export class App extends Component {
  render() {
    const { url } = this.props.match;
    const { app } = this.props;
    return (
      <LocaleProvider locale={enUS}>
        <Layout style={{ height: "100vh" }}>
          {app.modal ? <ModalRoot {...app.modal} /> : null}
          <Layout
            style={{
              height: "100vh",
              flexDirection: "row",
              overflow: "hidden"
            }}
          >
            <Sidebar url={url} />
            <Content id="p-layout" className="p-layout">
              <AppRouter url={url} />
            </Content>
          </Layout>
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
