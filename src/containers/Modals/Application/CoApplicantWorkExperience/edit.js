import React from "react";
import moment from "moment";
import { Row, Col, Form, Steps, message, Button } from "antd";
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

interface Props extends FormComponentProps {
  closeModal: closeModal;
}

class EditCoApplicantWorkExpModal extends React.Component<Props> {
  state = {};

  componentWillReceiveProps = nextProps => {
    const { UI, removeDoneActions, closeModal } = nextProps;
    const { doneActions } = UI;
    if (doneActions.UPDATE_COAPPLICANT_WORK_EXP_SUCCESS) {
      closeModal();
      message.success("Added Work Experience");
      removeDoneActions(["UPDATE_COAPPLICANT_WORK_EXP_SUCCESS"]);
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
        values.Id = this.props.data.Id;
        values.Details = "";
        values.CTC = "";
        values.StartDate = moment(values.StartDate).format("DD/MM/YYYY");
        values.EndDate = moment(values.EndDate).isValid()
          ? moment(values.EndDate).format("DD/MM/YYYY")
          : null;
        if (values.IsCurrent) values.EndDate = null;
        this.props.updateWorkExp({
          ApplicationId: this.props.data.ApplicationId,
          items: [
            {
              ...values,
              ApplicationId: this.props.data.ApplicationId,
              Action: 2
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
        title="Edit Co-Applicant Work Experience"
        footer={[
          <Button size="small" type="primary" onClick={this.onSave}>
            Save
          </Button>
        ]}
        height="300px"
        width={650}
        closable={true}
        loading={isFetching}
      >
        <Row type="flex" gutter={24}>
          <Col md={12}>
            <Input
              label="Company Name"
              name="CompanyName"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <Input
              label="Designation"
              name="Designation"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={24}>
            <Input
              label="Salary"
              name="MonthlySalary"
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            <DatePicker
              format="MMM - YYYY"
              monthPicker
              label="Start Date"
              name="StartDate"
              disabledDate={t => moment().isBefore(moment(t))}
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            {!getFieldValue("IsCurrent") ? (
              <DatePicker
                format="MMM - YYYY"
                monthPicker
                label="End Date"
                name="EndDate"
                disabledDate={t => moment().isBefore(moment(t))}
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
    const data = { ...props.data };

    let fields = {};
    fields.CompanyName = Form.createFormField({ value: data.CompanyName });
    fields.MonthlySalary = Form.createFormField({ value: data.MonthlySalary });
    fields.Designation = Form.createFormField({ value: data.Designation });
    fields.StartDate = Form.createFormField({ value: moment(data.StartDate) });
    fields.IsCurrent = Form.createFormField({ value: data.IsCurrent === 1 });
    fields.EndDate = Form.createFormField({
      value:
        data.IsCurrent == null || data.IsCurrent == 1
          ? moment()
          : moment(data.EndDate)
    });
    return fields;
  }
})(EditCoApplicantWorkExpModal);

const mapStateToProps = state => {
  const { UI } = state;
  return {
    UI: UI
  };
};
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  removeDoneActions: idxs => dispatch(removeDoneActions(idxs)),
  updateWorkExp: data => dispatch(updateCoapplicantWorkExpRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedForm);
