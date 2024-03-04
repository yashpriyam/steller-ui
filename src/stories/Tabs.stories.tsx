import { ComponentMeta, ComponentStory, StoryFn, Meta } from '@storybook/react';
import {Tabs} from "../components/tabs/Tabs"
export default {
  title: "Example/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;
const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;
export const Default = Template.bind({});
Default.args = {
  label: "Default Tabs",
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
    console.log("You clicked the Default Tabs");
  },
};
export const White = Template.bind({});
White.args = {
  label: "White Tabs",
  style: {
    ...Default.args.style,
    color: "black",
    background: "white",
    border: "2px solid black",
  },
  onClick: () => {
    console.log("You clicked the White tabs");
  },
};
export const Small = Template.bind({});
Small.args = {
  label: "Small Tabs",
  style: {
    ...Default.args.style,
    padding: "3px",
    width: "10em",
    margin: "2px",
    color: "white",
    fontSize: "14px",
  },
  onClick: () => {
    console.log("You clicked the Small Tabs");
  },
};
