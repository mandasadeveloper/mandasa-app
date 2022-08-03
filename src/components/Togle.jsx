<<<<<<< HEAD
import { Layout, Page, SettingToggle, TextStyle } from '@shopify/polaris';
import React, { useCallback, useState } from 'react'

export const Toggle=({content})=>{
    const [active, setActive] = useState(false);
  
    const handleToggle = useCallback(() => setActive((active) => !active), []);
  
    const contentStatus = active ? 'Deactivate' : 'Activate';
    const textStatus = active ? 'Activated' : 'Deactivated';
  
    return (
    <Page>
        <Layout>
        <Layout.Section>
        <SettingToggle
        action={{
          content: contentStatus,
          onAction: handleToggle,
        }}
        enabled={active}
      >{content} <TextStyle variation="strong">{textStatus}</TextStyle>.
      </SettingToggle>
        </Layout.Section>
    </Layout>
    </Page>
    );
  }
=======
import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Toggle = ({ content, table }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    getToggleValue();
  }, []);

  const handleToggle = () => {
    if (table !== "") {
      setActive(!active);
      const data = { active: !active };
      axios
        .post(`/toggle-value?shop=${Shop_name}&query=${table}`, data)
        .then((response) => {
          console.log(response);
        });
    }
  };

  const getToggleValue = () => {
    if (table !== "") {
      axios
        .get(`/get-data?shop=${Shop_name}&query=${table}`)
        .then((response) => {
          setActive(response.data[0].status);
        });
    }
  };

  const contentStatus = active ? "Deactivate" : "Activate";
  const textStatus = active ? "Activated" : "Deactivated";

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: contentStatus,
              onAction: handleToggle,
            }}
            enabled={active}
          >
            {content} <TextStyle variation="strong">{textStatus}</TextStyle>.
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
>>>>>>> d92db7b (make it better)
