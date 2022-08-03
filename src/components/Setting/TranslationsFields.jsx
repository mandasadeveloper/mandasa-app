import React, { useCallback, useEffect, useState } from "react";
import { Page, Card, Layout, TextField, Toast, Form } from "@shopify/polaris";
import axios from "axios";
import jsonLocals from "./TranslateJson/en.json";
export const TranslationsFields = (props) => {
  const [active, setActive] = useState(false);
  const [state, setState] = useState(jsonLocals["en"]);
  const [themes, setThemes] = useState([]);
  const { value, back } = props;
  useEffect(() => {
    getJson();
  }, []);

  const toggleActive = useCallback(() => setActive((active2) => !active2), []);

  const getJson = () => {
    const data = { locale: value.locale };
    axios.get(`/get-main-theme?shop=${Shop_name}`, data).then((response) => {
      if (response.status === 200) {
        let data = response.data.body;
        // data = data.filter(data => data.role==='main');
        console.log(data);
      }
    });
  };

  const hendleChangeUpdate = (value, name, index, i) => {
    setState((preValue) => {
      let newFormValues = [...preValue];
      newFormValues[index][index][i][name] = value;
      return newFormValues;
    });
  };
  const toastMarkup = active ? (
    <Toast content="save" onDismiss={toggleActive} />
  ) : null;

  const handleSubmit = () => {
    const data = {
      [value.locale]: state,
      locale: value.locale,
    };
    axios.post(`/create-jsonfile?shop=${Shop_name}`, data).then((response) => {
      if (response.status === 200) {
        console.log(response.data.body);
        setActive(true);
        getJson();
      }
    });
  };
  return (
    <Page
      title={value.name}
      breadcrumbs={[{ content: "Products", onAction: () => back(false) }]}
      primaryAction={{
        content: "Save",
        onAction: handleSubmit,
      }}
    >
      <Form>
        {state.map((local, index) => (
          <Card title={local.name}>
            <Card.Section>
              <Layout>
                {local[index].map((ele, i) => (
                  <Layout.AnnotatedSection title={ele.heading} key={i}>
                    <Card sectioned>
                      <TextField
                        name="value"
                        type="text"
                        value={ele.value}
                        onChange={(e) =>
                          hendleChangeUpdate(e, "value", index, i)
                        }
                      />
                    </Card>
                  </Layout.AnnotatedSection>
                ))}
              </Layout>
            </Card.Section>
          </Card>
        ))}
        {toastMarkup}
      </Form>
    </Page>
  );
};
