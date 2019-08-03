import React from "react";
import "./home.less";
import lottie from "lottie-web";
import {
  Tabs,
  Table,
  Tag,
  Divider,
  Card,
  Button,
  Modal,
  Form,
  message
} from "antd";
import { Input } from "components/uielements";
import web3Obj from "utils/web3.helper";
import auth from "utils/authenticator";
import moment from "moment";
import copy from "copy-to-clipboard";
import HomeModalContent from "./home.modal";
const { TabPane } = Tabs;

const columns = [
  {
    title: "From",
    dataIndex: "to",
    key: "to",
    render: from =>
      auth.getToken().toLowerCase() == from.toLowerCase() ? "Me" : from
  },
  {
    title: "To",
    dataIndex: "from",
    key: "from",
    render: to =>
      auth.getToken().toLowerCase() == to.toLowerCase() ? "Me" : to
  },
  {
    title: "Vouched On",
    dataIndex: "time",
    key: "time",
    render: time => moment.unix(time).format("DD-MMM-YYYY hh:mm:ss")
  },
  {
    title: "Reputation",
    dataIndex: "value",
    key: "value",
    render: val => (
      <Tag
        style={{
          padding: "0px 12px",
          background: "#7dc32f",
          fontWeight: 500,
          color: "white"
        }}
      >
        {val}
      </Tag>
    )
  }
];
class Home extends React.Component {
  state = {
    reputation: "",
    loading: false,
    history: [],
    vouchModal: false
  };
  componentDidMount() {
    const ninjaAnim = lottie.loadAnimation({
      wrapper: document.getElementById("ninja-anim"),
      animType: "svg",
      loop: true,
      path: "https://assets2.lottiefiles.com/packages/lf20_7bcrOj.json"
    });
    const vouchIconAnim = lottie.loadAnimation({
      wrapper: document.getElementById("vouch-icon-anim"),
      animType: "svg",
      loop: true,
      path: "https://assets2.lottiefiles.com/packages/lf20_7bcrOj.json"
    });
    const animation = lottie.loadAnimation({
      wrapper: document.getElementById("repo-anim"),
      animType: "svg",
      loop: true,

      path: "https://assets9.lottiefiles.com/packages/lf20_W6Y4aV.json"
    });
    animation.setSpeed(0.5);
    // setTimeout(() => {
    //     web3Obj
    //       .getReputationHistory(auth.getToken())
    //       .then(result => console.log("Reputation", result));
    //   }, 2000);
    setTimeout(() => {
      this.fetchData();
    }, 4000);
  }
  fetchData = () => {
    this.setState({
      loading: true
    })
    web3Obj
      .getReputation(auth.getToken())
      .call()
      .then(r => {
        this.setState({
          reputation: r, loading: false
        });
      });
    web3Obj.getReputationHistory(auth.getToken()).then(r => {
      console.log("History", r);
      this.setState({ history: r, loading: false });
      
    });
  };
  onClose = () => {
    this.setState({
      vouchModal: false
    });
    this.fetchData();
  };
  onCopy = () => {
    message.success("Copied to clipboard!");
    copy(auth.getToken());
  };
  render() {
    return (
      <div className="t-layout t-layout--home">
        <div className="header">
          <div style={{ height: 300 }} id="ninja-anim" />
          <div className="basic-info">
            <div className="title">Hello!!</div>
            <Button
              style={{ zIndex: 1000 }}
              className="desc btn btn--action"
              onClick={this.onCopy}
            >
              Address: {auth.getToken()}
            </Button>
          </div>
          <div className="reputation-info">
            <div id="repo-anim" />
            <div className="overlay">
              <div className="title">{this.state.reputation}</div>
              <div className="desc">Reputation</div>
            </div>
          </div>
        </div>
        <div className="content">
          <div style={{ padding: 24 }}>
            <Button.Group>
              <Button
                type="primary"
                onClick={() => {
                  this.setState({ vouchModal: true });
                }}
              >
                I want to Vouch Someone!
              </Button>
              <Button type="primary" onClick={() => this.props.history.push("/earn")}>How do i earn reputation?</Button>
            </Button.Group>
          </div>
          <Card title="Vouch History">
            <Table
            loading={this.state.loading}
              columns={columns}
              pagination={false}
              dataSource={
                Array.isArray(this.state.history) ? this.state.history : []
              }
            />
          </Card>
        </div>
        <Modal
          destroyOnClose
          width={700}
          footer={false}
          onCancel={this.onClose}
          visible={this.state.vouchModal}
        >
          <HomeModalContent />
        </Modal>
      </div>
    );
  }
}
const Wrapped = Form.create()(Home);
export default Wrapped;
