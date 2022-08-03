import React from "react";
// import { ListContainer, ListItem } from "./styles";
// import { DragHandle } from "./partials/DragHandle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { DeleteComponent } from "../DeleteComponent";
import { EditFields } from "./EditFields";
import { DeleteMenu } from "../MenuBuilder/DeleteMenu";
import { EditMenu } from "../MenuBuilder/EditMenu";
import { LinkMinor, PageMajor } from "@shopify/polaris-icons";
import { Icon, Tooltip } from "@shopify/polaris";

const ProfileReorder = (props) => {
  const list = props.value;
  const getProfileData = props.result;
  return (
    <div className="App">
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            list.splice(desI, 0, list.splice(srcI, 1)[0]);
            if (props.status === "default") {
              axios
                .post(
                  `/post-reorder-fields?shop=${Shop_name}&query=${props.table}`,
                  list
                )
                .then((response) => {
                  console.log(response);
                });
              return list;
            }
            if (props.status === "additional") {
              axios
                .post(`/put-profile-additional-fields?shop=${Shop_name}`, list)
                .then((response) => {
                  console.log(response);
                });
              return list;
            }
          }
        }}
      >
        {/* <ListContainer> */}
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item, i) => (
                <Draggable
                  key={item.id}
                  draggableId={"draggable-" + item.id}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <></>
                    // <ListItem
                    //   ref={provided.innerRef}
                    //   {...provided.draggableProps}
                    //   style={{
                    //     ...provided.draggableProps.style,
                    //     boxShadow: snapshot.isDragging
                    //       ? "0 0 .4rem #666"
                    //       : "none",
                    //   }}
                    // >
                    //   <DragHandle {...provided.dragHandleProps} />
                    //   <span>{item.title}</span>
                    //   {props.status === "additional" ? (
                    //     <DeleteComponent
                    //       data={props.result}
                    //       table="profile_additional_fields"
                    //       id={item.key}
                    //     />
                    //   ) : (
                    //     ""
                    //   )}
                    //   {props.status === "additional" ? (
                    //     <EditFields
                    //       getAdditionalData={props.result}
                    //       table="profile_additional_fields"
                    //       id={item.key}
                    //     />
                    //   ) : (
                    //     ""
                    //   )}
                    //   {item.type === "link" ? (
                    //     <span
                    //       style={{
                    //         width: "20px",
                    //         float: "right",
                    //         marginLeft: "10px",
                    //         cursor: "pointer",
                    //       }}
                    //     >
                    //       <Tooltip content="Link">
                    //         <Icon source={LinkMinor} />
                    //       </Tooltip>
                    //     </span>
                    //   ) : (
                    //     ""
                    //   )}
                    //   {item.type === "page" ? (
                    //     <span
                    //       style={{
                    //         float: "right",
                    //         marginLeft: "10px",
                    //         cursor: "pointer",
                    //       }}
                    //     >
                    //       <Tooltip content="Page">
                    //         <Icon source={PageMajor} />
                    //       </Tooltip>
                    //     </span>
                    //   ) : (
                    //     ""
                    //   )}
                    //   {item.type === "page" ? (
                    //     <DeleteMenu
                    //       value={list}
                    //       id={item.id}
                    //       getProfileData={getProfileData}
                    //     />
                    //   ) : item.type === "link" ? (
                    //     <DeleteMenu
                    //       value={list}
                    //       id={item.id}
                    //       getProfileData={getProfileData}
                    //     />
                    //   ) : (
                    //     ""
                    //   )}
                    //   {item.type === "page" ? (
                    //     <EditMenu
                    //       value={list}
                    //       id={i}
                    //       getProfileData={getProfileData}
                    //     />
                    //   ) : item.type === "link" ? (
                    //     <EditMenu
                    //       value={list}
                    //       id={i}
                    //       getProfileData={getProfileData}
                    //     />
                    //   ) : (
                    //     ""
                    //   )}
                    // </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* </ListContainer> */}
      </DragDropContext>
    </div>
  );
};

export default ProfileReorder;
