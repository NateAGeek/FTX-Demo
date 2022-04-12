import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {NFTCardRender} from './NFTCard';

export default {
  title: 'NFTCard',
  component: NFTCardRender,
} as ComponentMeta<typeof NFTCardRender>;

const Template: ComponentStory<typeof NFTCardRender> = (args) => <NFTCardRender {...args}/>;

export const Empty = Template.bind({});
Empty.args = {};

export const SingleCard = Template.bind({});
SingleCard.args = {
  nftUri: 'https://lh3.googleusercontent.com/ZB6NqdEAwZEDqLGmwz_iPeqTrbVTjylx6EyFNWchd-3OQSZC69-c_VRB5YJ81ol7x1mRWVtZPuMGJz4cZS-uN6qKJ3W8_MeWybTDNtQ',
};

export const StackedCollectionCards = Template.bind({});
StackedCollectionCards.args = {
  nftUri: 'https://lh3.googleusercontent.com/ZB6NqdEAwZEDqLGmwz_iPeqTrbVTjylx6EyFNWchd-3OQSZC69-c_VRB5YJ81ol7x1mRWVtZPuMGJz4cZS-uN6qKJ3W8_MeWybTDNtQ',
  collectionStack: true  
};

export const HideDetailsCard = Template.bind({});
HideDetailsCard.args = {
  nftUri: 'https://lh3.googleusercontent.com/ZB6NqdEAwZEDqLGmwz_iPeqTrbVTjylx6EyFNWchd-3OQSZC69-c_VRB5YJ81ol7x1mRWVtZPuMGJz4cZS-uN6qKJ3W8_MeWybTDNtQ',
  hideDetails: true
};