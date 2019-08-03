import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import {
  toggleAll,
  toggleCollapsed,
  changeCurrent
} from "../../redux/App/actions";
import Logo from "../../components/utility/logo";
import { logOutRequest as logOutUser } from "../../redux/Authentication/actions";
import { openModal } from "../../redux/App/actions";

const { Sider } = Layout;
type Props = {
  collapsed: boolean,
  onCollapse: Function
};
class Sidebar extends React.Component {
  state = {};
  handleClick = e => {
    this.props.changeCurrent(e.key);
    if (e.key === "dashboard.logout") {
      this.props.logOutUser();
      return;
    }
  };

  render() {
    const { sidebar } = this.props.app;
    const { url } = this.props;
    return (
      <Sider
        collapsedWidth={60}
        className={`sidebar-container ${sidebar.theme}`}
        collapsed={sidebar.isCollapsed}
        collapsible
        onCollapse={() => this.props.toggleCollapsed()}
      >
        <div className="sidebar-top">
          <a href="/dashboard">
            <Logo collapsed={sidebar.isCollapsed} />
          </a>
        </div>
        <Menu
          onClick={this.handleClick}
          className="sidebar-menu"
          defaultSelectedKeys={[sidebar.currentKey]}
          mode="inline"
        >
          <Menu.Item key="dashboard.home">
            <Link to={`${url}`}>
              <Icon type="home" />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="dashboard.logout">
            <Link to="/">
              <Icon type="logout" />
              <span>Logout</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
const mapStateToProps = state => {
  const { App } = state;
  return {
    app: App
  };
};
const mapDispatchToProps = dispatch => ({
  toggleCollapsed: () => dispatch(toggleCollapsed()),
  changeCurrent: k => dispatch(changeCurrent(k)),
  logOutUser: () => dispatch(logOutUser()),
  openModal: (name, props) => dispatch(openModal(name, props))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
