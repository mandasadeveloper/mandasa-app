import {
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  Layout,
  Page,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import { Link } from "react-router-dom";
// import { Toggle } from './Togle'

export const Dashboard = () => {
  const cardData = [
    {
      title: "Customers",
      content: "View Customers",
      link: "/customers",
      value: 125,
    },
    { title: "Order", content: "All Orders", link: "/orders", value: 999 },
    { title: "Current Plan", content: "", link: "", value: "Basic-Free" },
  ];
  const dataCard = [
    {
      heading: "Translations",
      value: "Add translations to use Customer Dashboard in any language.",
      content: "Manage Translations",
      link: "/translations",
    },
    { heading: "Plan", value: "Basic-Free", content: "Upgrade Plan", link: "" },
    { heading: "Need Help", value: "", content: "Go To Support", link: "" },
    {
      heading: "What Your Thinkable Customer",
      value: "",
      content: "Give Us Feedback",
      link: "",
    },
    {
      heading: "Don't Have What You Need",
      value: "",
      content: "Request A Feature",
      link: "",
    },
  ];

  return (
    <>
      <Page title="Dashboard">
        <Layout>
          {cardData.map((ele, index) => (
            <Layout.Section key={index} oneThird>
              <Card
                title={ele.title}
                actions={
                  ele.content
                    ? [{ content: <Link to={ele.link}>{ele.content}</Link> }]
                    : ""
                }
              >
                <Card.Section>
                  <TextStyle variation="subdued">{ele.value}</TextStyle>
                </Card.Section>
              </Card>
            </Layout.Section>
          ))}
        </Layout>
      </Page>
      {/* <Toggle content="Customers Dashboard Is" table=''/> */}
      <Page title="Setting">
        <Layout>
          {dataCard.map((ele, index) => (
            <Layout.AnnotatedSection title={ele.heading} key={index}>
              <Card sectioned>
                <FormLayout>
                  {ele.value ? <p>{ele.value}</p> : ""}
                  <ButtonGroup>
                    {ele.link ? (
                      <Link to={ele.link}>
                        <Button>{ele.content ? ele.content : ""}</Button>
                      </Link>
                    ) : (
                      <Button>{ele.content ? ele.content : ""}</Button>
                    )}
                  </ButtonGroup>
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
          ))}
        </Layout>
      </Page>
    </>
  );
};
