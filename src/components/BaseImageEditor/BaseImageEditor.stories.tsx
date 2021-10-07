import {Meta} from "@storybook/react/types-6-0";
import {BaseImageEditor, BaseImageEditorProps} from "./index";
import {Story} from "@storybook/react";
import React from "react";

// @ts-ignore
// import imageFile from '../../../static/example.jpeg';

export default {
    title: "Components/Image Editor",
    component: BaseImageEditor,

} as Meta;


// Create a master template for mapping args to render the Button component
const Template: Story<BaseImageEditorProps> = (args) => <BaseImageEditor {...args} />;

export const Basic = Template.bind({});
Basic.args = {imgPath: '../../../static/example.jpeg'};

