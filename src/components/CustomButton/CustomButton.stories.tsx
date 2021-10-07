import React from "react";
import {Meta} from "@storybook/react/types-6-0";
import {Story} from "@storybook/react";

import CustomButton from "./index";

export default {
    title: "Components/CustomButton",
    component: CustomButton,
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<{}> = (args) => <CustomButton {...args} />;

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = {};
