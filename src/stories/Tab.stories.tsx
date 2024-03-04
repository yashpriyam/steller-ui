import { ComponentMeta, ComponentStory, StoryFn, Meta } from '@storybook/react';
import {Tab} from "../components/tab/Tab"
export default {
  title: "Example/Tab",
  component: Tab,
} as ComponentMeta<typeof Tab>;
const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;
export const Default = Template.bind({});
Default.args = {
  label: "Default Tab",
  style: {
    padding: "20px",
    width: "20em",
    color: "white",
    fontSize: "19px",
    cursor: "pointer",
    border: "2px solid #fecd43",
    background: "#fecd43",
  },
  onClick: () => {
    console.log("You clicked the Default Tab");
  },
};
export const White = Template.bind({});
White.args = {
  label: "White Tab",
  style: {
    ...Default.args.style,
    color: "black",
    background: "white",
    border: "2px solid black",
  },
  onClick: () => {
    console.log("You clicked the White tab");
  },
};
export const Small = Template.bind({});
Small.args = {
  label: "Small Tab",
  style: {
    ...Default.args.style,
    padding: "3px",
    width: "10em",
    margin: "2px",
    color: "white",
    fontSize: "14px",
  },
  onClick: () => {
    console.log("You clicked the Small Tab");
  },
};
