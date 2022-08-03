<<<<<<< HEAD
import React from 'react'
import { Page,Card} from '@shopify/polaris'
import { Toggle } from './Togle'

export const ToggleFeature = () => {
  return (
    <Page title='Toggle Feature'>
       <Toggle content="Customers Dashboard Is"/>
       <Toggle content="Reorder Is"/>
       <Toggle content="Allows your customers to update their marketing preference from within their customer account profiles."/>
    </Page>
  )
}
=======
import React from "react";
import { Page, Card } from "@shopify/polaris";
import { Toggle } from "./Togle";
import { useNavigate } from "react-router-dom";

export const ToggleFeature = () => {
  const navigate = useNavigate();
  return (
    <Page
      title="Toggle Feature"
      breadcrumbs={[{ content: "Products", onAction: () => navigate(-1) }]}
    >
      <Toggle content="Customers Dashboard Is" table="" />
      <Toggle content="Reorder Is" table="" />
      <Toggle
        content="Allows your customers to update their marketing preference from within their customer account profiles."
        table=""
      />
    </Page>
  );
};
>>>>>>> d92db7b (make it better)