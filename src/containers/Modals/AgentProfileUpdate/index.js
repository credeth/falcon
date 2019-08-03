import React from "react";
import { Row, Col, Form, Steps, message } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { connect } from "react-redux";
import {
  Input,
  Modal,
  RadioGroup,
  TextArea
} from "../../../components/uielements";
import { closeModal } from "../../../redux/App/actions";
import { updateAgentsProfile } from "../../../redux/_UI/actions";
const Step = Steps.Step;

interface Props extends FormComponentProps {
  closeModal: closeModal;
}

class AgentProfileModal extends React.Component<Props> {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.doneAction === "add") {
      this.props.closeModal();
    }
  }

  onSave = () => {
    const Fields = ["Name", "Mobile"];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        let data = {};
        data.name = values.Name;
        data.mobile = values.Mobile;
        this.props.updateAgentsProfile(data);
        message.success("Updated Counsellor Profile");
        this.props.closeModal();
      }
    });
  };

  render() {
    const { isFetching, error } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="Counsellor Information"
        onSave={this.onSave}
        height="200px"
        okText="Update"
        width={468}
        closable={false}
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={24}>
            <Input
              label="Name"
              name="Name"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={24}>
            <Input
              label="Mobile"
              name="Mobile"
              required
              rules={Input.rules.mobile}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({
  mapPropsToFields(props) {
    const profile = { ...props.UI.profile };
    let fields = {};
    fields["Name"] = Form.createFormField({ value: profile.name });
    fields["Mobile"] = Form.createFormField({ value: profile.mobile });
    return fields;
  }
})(AgentProfileModal);

const mapStateToProps = state => {
  const { UI } = state;
  return {
    UI: UI
  };
};
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  updateAgentsProfile: data => dispatch(updateAgentsProfile(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
