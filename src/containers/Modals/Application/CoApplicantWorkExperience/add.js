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
import { updateCoapplicantWorkExpRequest } from "../../../../redux/Applications/actions";

const Step = Steps.Step;

interface Props extends FormComponentProps {
  closeModal: closeModal;
}

class AddCoApplicantWorkExpModal extends React.Component<Props> {
  state = {};
  componentWillReceiveProps = nextProps => {
    const { UI, removeDoneActions, closeModal } = nextProps;
    const { doneActions } = UI;
    if (doneActions.UPDATE_COAPPLICANT_WORK_EXP_SUCCESS) {
      removeDoneActions(["UPDATE_COAPPLICANT_WORK_EXP_SUCCESS"]);
      message.success("Added Work Experience");
      closeModal();
      // Shifted Fetch Application to Middleware

      // fetchApplicationById(this.props.data.ApplicationId);
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
        values.StartDate = moment(values.StartDate).format("DD/MM/YYYY");
        values.EndDate = moment(values.EndDate).isValid()
          ? moment(values.EndDate).format("DD/MM/YYYY")
          : "";
        if (values.IsCurrent) values.EndDate = "";
        this.props.addWorkExp({
          ApplicationId: this.props.data.ApplicationId,
          items: [
            {
              ...values,
              ApplicationId: this.props.data.ApplicationId,
              Action: 1
            }
          ]
        });
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
        title="Add Co-Applicant Work Experience"
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
})(AddCoApplicantWorkExpModal);

const mapStateToProps = state => {
  const { UI } = state;
  return {
    UI: UI,
    isFetching: UI.isLoading
  };
};
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  removeDoneActions: idxs => dispatch(removeDoneActions(idxs)),

  addWorkExp: data => dispatch(updateCoapplicantWorkExpRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedForm);
