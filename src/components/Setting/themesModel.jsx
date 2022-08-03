import { Button, Modal, Select, TextContainer } from "@shopify/polaris";
import { useState, useCallback } from "react";

export const ThemesModel = (props) => {
  console.log(props.themes);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState("today");

  const options = props.themes.map((theme) => {
    return { label: theme.name, value: theme.id };
  });

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Select Theme</Button>;

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="नीचे दिए गए विकल्प का विषय चुनें"
      primaryAction={{
        content: "Save",
        onAction: () => console.log(selected),
      }}
    >
      <Modal.Section>
        <Select
          label="Select Theme"
          options={options}
          onChange={(value) => setSelected(value)}
          value={selected}
        />
      </Modal.Section>
    </Modal>
  );
};
