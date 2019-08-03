import React from "react";
import { Link } from "react-router-dom";

// export default function({ collapsed, styling }) {
export default function({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <Link to="/dashboard">
          <img src="/images/shortlogo_new.png" height={35} />
        </Link>
      ) : (
        <Link to="/dashboard">
          <img src="/images/PropelldAgent_New.png" height={28} />
        </Link>
      )}
    </div>
  );
}
