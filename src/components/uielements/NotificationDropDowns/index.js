import React from "react";
import { Badge, Popover } from "antd";
import { Link } from "react-router-dom";
import "./style.less";
type Props = {
  title: string,
  icon: string,
  count?: number,
  loading?: boolean,
  height?: number,
  width?: number,
  content?: any,
  footer?: any
};
function NotificationDropDown(props: Props) {
  const { title, loading, height, width, icon, count, content, footer } = props;
  const _content = (
    <div className="notification-dropdown">
      <div className="__content">
        <div className="__header">
          <h3>{title}</h3>
        </div>
        <div className="__body">{content}</div>
        <div className="__footer">{footer}</div>
      </div>
    </div>
  );
  return (
    <Popover content={_content} trigger="click">
      <div className="notification-icons">
        <Badge count={count}>
          <i className={icon} />
        </Badge>
      </div>
    </Popover>
  );
}
NotificationDropDown.ListItem = props => {
  if (props.to) {
    return (
      <Link to={props.to} className="__list-item">
        {props.children}
      </Link>
    );
  } else {
    return <div className="__list-item">{props.children}</div>;
  }
};
NotificationDropDown.ListItemHead = props => (
  <div className="list-item-head">
    <h5>{props.title}</h5>
    <span className="list-item-date">{props.date}</span>
  </div>
);
NotificationDropDown.defaultProps = {
  count: 0
};
export default NotificationDropDown;
