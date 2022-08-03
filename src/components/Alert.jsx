import { Banner, Page } from "@shopify/polaris";
import React from "react";
import { Link } from "react-router-dom";

export const Alert = ({ value }) => {
  const alert1 = (
    <Banner
      title="Your free plan will be active up to 1500 customers. Please upgrade your plan."
      action={{
        content: (
          <Link className="sidebar_navigation" to="/plan">
            Upgrade
          </Link>
        ),
      }}
      status="warning"
    />
  );
  const alert2 = (
    <Banner
      title="You have more than 1500 customers. Please upgrade your plan."
      action={{
        content: (
          <Link className="sidebar_navigation" to="/plan">
            Upgrade
          </Link>
        ),
      }}
      status="critical"
    />
  );
  return (
    <Page>
      {value > 1200 && value <= 1500 ? alert1 : value > 1500 ? alert2 : ""}
    </Page>
  );
};
