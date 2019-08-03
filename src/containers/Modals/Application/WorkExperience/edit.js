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
import {
  updateWorkExpRequest,
  getWorkExpRequest
} from "../../../../redux/Profile/actions";

interface Props extends FormComponentProps {
  closeModal: closeModal;
}

class EditWorkExpModal extends React.Component<Props> {
  state = {};

  componentWillReceiveProps = nextProps => {
    const { UI, removeDoneActions, closeModal, getWorkExpRequest } = nextProps;
    const { doneActions } = UI;
    if (doneActions.UPDATE_WORK_EXP_SUCCESS) {
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
      "isCurrent"
    ];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        values.Id = this.props.data.Id;
        values.Details = "";
        values.CTC = "";
        values.StartDate = moment(values.StartDate).format("YYYY-MM-DD");
        values.EndDate = moment(values.EndDate).isValid()
          ? moment(values.EndDate).format("YYYY-MM-DD")
          : null;
        if (values.isCurrent) values.EndDate = null;
        this.props.updateWorkExp(values);
      }
    });
  };

  render() {
    const { isFetching, error, UI } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let allErrors = [];
    if (error) allErrors = error.errors;
    return (
      <Modal
        errors={allErrors}
        title="Edit Work Experience"
        footer={[
          <Button
            loading={UI.isLoading}
            size="small"
            type="primary"
            onClick={this.onSave}
          >
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
              name="Salary"
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
              required
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col md={12}>
            {!getFieldValue("isCurrent") ? (
              <DatePicker
                format="MMM - YYYY"
                monthPicker
                label="End Date"
                name="EndDate"
                required
                getFieldDecorator={getFieldDecorator}
              />
            ) : null}
          </Col>
          <Col md={12}>
            <Checkbox name="isCurrent" getFieldDecorator={getFieldDecorator}>
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
    fields.CompanyName = { value: data.CompanyName };
    fields.Salary = { value: data.MonthlySalary };
    fields.Designation = { value: data.Designation };
    fields.StartDate = { value: moment(data.StartDate, "YYYY/MM") };
    fields.isCurrent = { value: data.EndDate === null };
    fields.EndDate = data.isCurrent
      ? moment()
      : moment(data.EndDate, "YYYY/MM");
    return fields;
  }
})(EditWorkExpModal);

const mapStateToProps = state => {
  const { UI } = state;
  return {
    UI: UI
  };
};
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  getWorkExpRequest: () => dispatch(getWorkExpRequest()),
  removeDoneActions: idxs => dispatch(removeDoneActions(idxs)),
  updateWorkExp: data => dispatch(updateWorkExpRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedForm);
