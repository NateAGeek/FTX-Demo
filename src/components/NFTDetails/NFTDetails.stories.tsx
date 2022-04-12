import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {NFTDetailsRender} from './NFTDetails';

export default {
  title: 'NFTDetails',
  component: NFTDetailsRender,
} as ComponentMeta<typeof NFTDetailsRender>;

const Template: ComponentStory<typeof NFTDetailsRender> = (args) => <NFTDetailsRender {...args}/>;

export const Empty = Template.bind({});
Empty.args = {}