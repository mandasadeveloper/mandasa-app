<<<<<<< HEAD
import { Button, Card, Layout, Modal, Page, SettingToggle, TextContainer } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { Toggle } from '../Togle';
import { AddFieldsModel } from './AddFieldsModel';
import { ProfileReorder } from './ProfileReorder'

export const ProfileSetup = () => {
  const [active, setActive] = useState(false);
  const handleToggle = useCallback(() => setActive((active) => !active), []);
  const contentStatus = active ? 'Deactivate' : 'Activate';
  const textStatus = active ? 'activated' : 'deactivated';

  const ITEMS = [
    {
      id: "1",
      title: "My Profile"
    },
    {
      id: "2",
      title: "Orders"
    },
    {
      id: "3",
      title: "Address"
    },
    {
      id: "4",
      title: "Phone"
    }
  ];
  const ITEMS_2 = [
    {
      id: "1",
      title: "Phone"
    },
    {
      id: "2",
      title: "DOB"
    },
  ];
  return (
<>
<Page title='Profile Setup'
   primaryAction={<AddFieldsModel/>}>
   <Layout>
     <Layout.Section oneHalf>
       <Card title="Profile Default Fields">
         <Card.Section>
         <ProfileReorder value={ITEMS}/>
         </Card.Section>
  
       </Card>
     </Layout.Section>
     <Layout.Section oneHalf>
       <Card title="Additional Fields">
         <Card.Section>
         <ProfileReorder value={ITEMS_2}/>
         </Card.Section>
       </Card>
     </Layout.Section>
   </Layout>
 </Page>
 <Page>
<Toggle content="  Allows your customers to update their marketing preference from within their customer account profiles."/>
 </Page>
</>
  )
}
=======
import { Card, Layout, Page } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toggle } from "../Togle";
import { AddFieldsModel } from "./AddFieldsModel";
import ProfileReorder from "./ProfileReorder";

export const ProfileSetup = () => {
  const navigate = useNavigate();
  const [additional, setAdditional] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [defaultProfile, setDefaultProfile] = useState([
    {
      id: "1",
      title: "My Profile",
    },
    {
      id: "2",
      title: "Orders",
    },
    {
      id: "3",
      title: "Address",
    },
    {
      id: "4",
      title: "Phone",
    },
  ]);

  useEffect(() => {
    getAdditionalData();
    getProfileData();
  }, []);

  const getProfileData = () => {
    axios
      .get(`/get-data?shop=${Shop_name}&query=profile_default_fields`)
      .then((response) => {
        const res = JSON.parse(response.data[0].fields);
        setDefaultProfile(res);
      });
  };

  const getAdditionalData = () => {
    axios
      .get(
        `/get-profile-additional-fields?shop=${Shop_name}&query=profile_additional_fields`
      )
      .then((response) => {
        const res = response.data;
        const result = [];
        res.map((ele, index) => {
          result.push({
            key: ele.id,
            id: index,
            title: JSON.parse(ele.fields).singleFields.label,
          });
        });
        setAdditional(result);
      });
  };

  return (
    <>
      <Page
        title="Profile Setup"
        breadcrumbs={[{ content: "Products", onAction: () => navigate(-1) }]}
        primaryAction={<AddFieldsModel getAdditionalData={getAdditionalData} />}
      >
        <Layout>
          <Layout.Section oneHalf>
            <Card title="Profile Default Fields">
              <Card.Section>
                <ProfileReorder
                  value={defaultProfile}
                  result=""
                  table="profile_default_fields"
                  status="default"
                />
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card title="Additional Fields">
              <Card.Section>
                <ProfileReorder
                  value={additional}
                  result={getAdditionalData}
                  status="additional"
                />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
      <Page>
        <Toggle
          content="Allows your customers to update their marketing preference from within their customer account profiles."
          table="admin_setting"
        />
      </Page>
    </>
  );
};
>>>>>>> d92db7b (make it better)
