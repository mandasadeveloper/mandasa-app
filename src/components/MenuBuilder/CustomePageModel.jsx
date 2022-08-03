<<<<<<< HEAD
import { Button, FormLayout, Modal, Page, Select, TextContainer, TextField } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
export const CustomePageModel = () => {
    const [active, setActive] = useState(false);

    const handleChange = useCallback(() => setActive(!active), [active]);
  
    const activator = <Button onClick={handleChange}>Add Shopify Page</Button>;
    const [selected, setSelected] = useState('today');

    const handleSelectChange = useCallback((value) => setSelected(value), []);
  
    const options = [
      {label: 'Page-1', value: 'page-1'},
      {label: 'Page-2', value: 'page-2'},
      {label: 'Page-3', value: 'page-3'},
      {label: 'Page-4', value: 'page-4'},
    ];
  return (
    <div>
          <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title="Add Shopify Page"
            primaryAction={{
              content: 'Add',
              onAction: handleChange,
            }}
            // secondaryActions={[
            //   {
            //     content: 'Learn more',
            //     onAction: handleChange,
            //   },
            // ]}
          >
            <Modal.Section>
            <TextContainer>
                <FormLayout>
                <TextField label="Menu Label" onChange={() => {}} autoComplete="off" />
                <Select
                label="Select Page"
                options={options}
                onChange={handleSelectChange}
                value={selected}
                />
                </FormLayout>
              </TextContainer>
            </Modal.Section>
          </Modal>
        </div>   
  )
}
=======
import {
  Button,
  FormLayout,
  Modal,
  Select,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
export const CustomePageModel = (props) => {
  const Result = props.value;
  const getProfileData = props.getProfileData;
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [pages, setPages] = useState([]);
  const [state, setState] = useState({
    id: Result.length + 1,
    type: "page",
  });

  const handleChange = useCallback(() => {
    Clear();
    setActive(!active), [active];
  });

  const activator = <Button onClick={handleChange}>Add Shopify Page</Button>;

  useEffect(() => {
    GetTranslations();
  }, []);

  const Submit = () => {
    Result.push(state);
    console.log(Result);
    axios
      .post(
        `/post-reorder-fields?shop=${Shop_name}&query=menu_builder_fields`,
        Result
      )
      .then((response) => {
        console.log(response);
        getProfileData();
        handleChange();
      });
  };

  const Clear = () => {
    setState({
      id: Result.length + 1,
      type: "page",
    });
  };

  const ChangeHendle = (value, name) => {
    setState((preValue) => {
      if (value) setToggle(false);
      else setToggle(true);
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const loop = pages.map((ele, index) => {
    return { label: ele.handle, value: ele.handle };
  });

  const GetTranslations = () => {
    axios.get(`/get-pages?shop=${Shop_name}`).then((response) => {
      setPages(response.data);
    });
  };

  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Add Shopify Page"
        primaryAction={{
          content: "Add",
          onAction: Submit,
          disabled: toggle ? true : false,
        }}
      >
        <Modal.Section>
          <TextContainer>
            <FormLayout>
              <TextField
                label="Page Label"
                name="title"
                value={state.title}
                onChange={(value) => ChangeHendle(value, "title")}
                autoComplete="off"
              />
              <Select
                label="Select Page"
                options={loop}
                name="value"
                value={state.value}
                onChange={(value) => ChangeHendle(value, "value")}
              />
            </FormLayout>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
};
>>>>>>> d92db7b (make it better)
