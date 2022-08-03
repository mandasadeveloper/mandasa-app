<<<<<<< HEAD
import { Button, ButtonGroup, Card, FormLayout, Layout, Page, TextStyle} from '@shopify/polaris'
import React from 'react'
import { Link } from 'react-router-dom'
export const Billing = () => {
    const cardData = [
        {title:"Basic",content:"",value:"1500 customers,  New Account page, Multi language support,  Reorder,  Order history, Add custom pages and links"},
        {title:"Standard",content:"",value:"4$/month, 1500+ customers, New Account page, Multi language support, Reorder, Order history, Add custom pages and links"},
    ]
    const needHelp = [
        {heading:"Need Help",value:"",content:"Go To Support",link:""},
    ]

    
  return (
<>
<Page title='Billing'>
  <Layout>
    {cardData.map((ele,index)=>(
          <Layout.Section key={index} oneHalf>
          <Card title={ele.title} actions={ele.content?[{content:ele.content}]:""}>
            <Card.Section>
              <TextStyle variation="subdued" ><div style={{maxWidth:"280px"}}>{ele.value}</div></TextStyle>
            </Card.Section>
          </Card>
        </Layout.Section>
    ))}
  </Layout>
</Page>
  <Page>
    <Layout>
        {
            needHelp.map((ele,index)=>(
              <Layout.AnnotatedSection
              title={ele.heading} key={index}>
              <Card sectioned>
                <FormLayout>
                  {ele.value?<p>{ele.value}</p>:""}
                  <ButtonGroup>
                  {ele.link?<Link to={ele.link}><Button>{ele.content?ele.content:""}</Button></Link>:<Button>{ele.content?ele.content:""}</Button>}
              </ButtonGroup>
                </FormLayout>
            
              </Card>
            </Layout.AnnotatedSection>
          ))
        }
    </Layout>
  </Page>
  </>
  )
}
=======
import {
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  Grid,
  Layout,
  Page,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
export const Billing = () => {
  const navigate = useNavigate();
  const cardData = [
    {
      title: "Basic",
      content: "Free",
      value: [
        "Free",
        "1500 customers",
        "New Account page",
        "Multi language support",
        "Reorder",
        "Order history",
        "Add custom pages and links",
      ],
    },
    {
      title: "Standard",
      content: "Upgrade",
      value: [
        "4$/month",
        "1500+ customers",
        "New Account page",
        "Multi language support",
        "Reorder",
        "Order history",
        "Add custom pages and links",
      ],
    },
    // {title:"Standard",content:"",value:"4$/month, 1500+ customers, New Account page, Multi language support, Reorder, Order history, Add custom pages and links"},
  ];
  const needHelp = [
    { heading: "Need Help", value: "", content: "Go To Support", link: "" },
  ];

  return (
    <>
      <Page
        title="Plan"
        breadcrumbs={[{ content: "Products", onAction: () => navigate(-1) }]}
      >
        <Grid>
          {cardData.map((ele, index) => (
            <Grid.Cell
              key={index}
              columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}
            >
              <Card className="sunil" title={ele.title} sectioned>
                {ele.value.map((val, index) => (
                  <TextStyle variation="subdued">
                    {index === 0 ? (
                      <p className="paidCard">
                        <b>{val}</b>
                      </p>
                    ) : (
                      <p className="paidCard">{val}</p>
                    )}
                  </TextStyle>
                ))}
                <Button primary fullWidth>
                  {ele.content}
                </Button>
              </Card>
            </Grid.Cell>
          ))}
        </Grid>
      </Page>
      <Page>
        <Layout>
          {needHelp.map((ele, index) => (
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
>>>>>>> d92db7b (make it better)
