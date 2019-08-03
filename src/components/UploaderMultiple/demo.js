import React from "react";
import Uploader from "./index";
import auth from "utils/authenticator";
export default class Demo extends React.Component {
  render() {
    return (
      <div style={{ padding: 128 }}>
        <Uploader
          defaultAccept={["image/jpeg"]}
          title={"Application Address Proof"}
          description={
            "Aadhaar Card, Ration Card, Passport, Driving License, Bank Statement, Electricity Bill. Any kind of bill submitted as a proof should not be older than 3 months.(Any one)."
          }
          documentType={2}
          documentSubType={2}
          uploadProps={{
            url: "http://localhost:4002/resources/user/documents/user/upload",
            headers: [
              {
                name: "x-access-token",
                value: auth.getToken()
              }
            ],
            requestType: "POST",
            inputName: "upload_file",
            queryParams: {
              DocumentName: "Saad"
            },
            onComplete: () => {
              // message.success("Done");
            }
          }}
        />
      </div>
    );
  }
}
