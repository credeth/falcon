import React from "react";
import moment from "moment";
import { Row, Col, Form, Steps, message } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { connect } from "react-redux";
import {
  Input,
  Modal,
  DatePicker,
  Checkbox
} from "../../../../components/uielements";
import { closeModal } from "../../../../redux/App/actions";
import { removeDoneActions } from "../../../../redux/_UI/actions";
import { addWorkExpRequest, getWorkExpRequest } from "../../../../redux/Profile/actions";

interface Props extends FormComponentProps {
  closeModal: closeModal;
}

class AddWorkExpModal extends React.Component<Props> {
  state = {};
  componentWillReceiveProps = nextProps => {
    const { UI, removeDoneActions, closeModal, getWorkExpRequest } = nextProps;
    const { doneActions } = UI;
    if (doneActions.ADD_WORK_EXP_SUCCESS) {
      closeModal();
      message.success("Added Work Experience");
      removeDoneActions(["ADD_WORK_EXP_SUCCESS"]);
      getWorkExpRequest();
    }
  };

  onSave = () => {
    const Fields = [
      "CompanyName",
      "Designation",
      "MonthlySalary",
      "StartDate",
      "EndDate",
      "IsCurrent"
    ];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        values.Details = "";
        values.CTC = "";
        values.StartDate = moment(values.StartDate).format("YYYY-MM-DD");
        values.EndDate = moment(values.EndDate).isValid()
          ? moment(values.EndDate).format("YYYY-MM-DD")
          : "";
        if (values.IsCurrent) values.EndDate = "";
        this.props.addWorkExp(values);
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
        title="Add Work Experience"
        onSave={this.onSave}
        height="350px"
        okText="Add"
        width={650}
        closable={true}
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={24}>
            <Input
              label="Company Name"
              name="CompanyName"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={24}>
            <Input
              label="Designation"
              name="Designation"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={24}>
            <Input
              prefix="₹"
              label="Salary"
              name="MonthlySalary"
              required
              rules={Input.rules.amount}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <DatePicker
              format="MM/YYYY"
              monthPicker
              label="Start Date"
              disabledDate={c => moment().isBefore(moment(c))}
              name="StartDate"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            {!getFieldValue("IsCurrent") ? (
              <DatePicker
                format="MM/YYYY"
                monthPicker
                disabledDate={c => moment().isBefore(moment(c))}
                label="End Date"
                name="EndDate"
                required
                getFieldDecorator={getFieldDecorator}
              />
            ) : null}
          </Col>
          <Col md={12}>
            <Checkbox name="IsCurrent" getFieldDecorator={getFieldDecorator}>
              I Currently Work Here
            </Checkbox>
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
    return fields;
  }
})(AddWorkExpModal);

const mapStateToProps = state => {
  const { UI } = state;
  return {
    UI: UI,
    isFetching: UI.isLoading
  };
};
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  getWorkExpRequest: () => dispatch(getWorkExpRequest()),
  removeDoneActions: idxs => dispatch(removeDoneActions(idxs)),
  addWorkExp: data => dispatch(addWorkExpRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedForm);
