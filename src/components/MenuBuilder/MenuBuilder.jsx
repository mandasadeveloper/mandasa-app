<<<<<<< HEAD
import { Page } from '@shopify/polaris'
import React from 'react'
import {Drag} from '../Drag'
import { CustomeLinkPage } from './customeLinkModel'
import { CustomePageModel } from './CustomePageModel'

export const MenuBuilder = () => {
  return (
  <>
<Drag/>
<Page>
<div style={{display:"flex",justifyContent:"space-between"}}>
<CustomePageModel/>
<CustomeLinkPage/>
</div>
</Page>
</>
  )
}
=======
import { Page, Layout, Card } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileReorder from "../ProfileSetup/ProfileReorder";
import { CustomeLinkPage } from "./customeLinkModel";
import { CustomePageModel } from "./CustomePageModel";

export const MenuBuilder = () => {
  const [defaultProfile, setDefaultProfile] = useState([
    {
      id: 1,
      title: "My Profile",
    },
    {
      id: 2,
      title: "Orders",
    },
    {
      id: 3,
      title: "Address",
    },
    {
      id: 4,
      title: "Phone",
    },
  ]);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = () => {
    axios
      .get(`/get-data?shop=${Shop_name}&query=menu_builder_fields`)
      .then((response) => {
        // const res = JSON.parse(response.data[0].fields);
        // setDefaultProfile(res);
        console.log(response);
      });
  };

  return (
    <>
      <Page
        title="Menu Builder"
        breadcrumbs={[{ content: "Menu", onAction: () => navigate(-1) }]}
      >
        <Layout>
          <Layout.Section oneHalf>
            <Card>
              <Card.Section>
                <ProfileReorder
                  value={defaultProfile}
                  result={getProfileData}
                  table="menu_builder_fields"
                  status="default"
                />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
      <Page>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CustomePageModel
            value={defaultProfile}
            getProfileData={getProfileData}
          />
          <CustomeLinkPage
            value={defaultProfile}
            getProfileData={getProfileData}
          />
        </div>
      </Page>
    </>
  );
};
>>>>>>> d92db7b (make it better)
