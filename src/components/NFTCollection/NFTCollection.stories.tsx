import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {NFTCollectionRender} from './NFTCollection';

export default {
  title: 'NFTCollection',
  component: NFTCollectionRender,
} as ComponentMeta<typeof NFTCollectionRender>;

const Template: ComponentStory<typeof NFTCollectionRender> = (args) => <NFTCollectionRender {...args}/>;

export const Empty = Template.bind({});
export const FullExample = Template.bind({});
FullExample.args = {
  collectionBannerUri: 'https://static.ftx.com/nfts/324118815755185136.jpeg',
  collectionIconUri: 'https://static.ftx.com/nfts/466483285571882431.png',
  collectionName: 'Bored Ape Yacht Club',
  collectionDescription: 'BAYC is a collection of 10,000 Bored Ape NFTs. Owning a Bored Ape doubles as your membership to the Club.',
  firstNFTUri: 'https://lh3.googleusercontent.com/ZB6NqdEAwZEDqLGmwz_iPeqTrbVTjylx6EyFNWchd-3OQSZC69-c_VRB5YJ81ol7x1mRWVtZPuMGJz4cZS-uN6qKJ3W8_MeWybTDNtQ',
}
export const OnlyCollection = Template.bind({});
OnlyCollection.args = {
  collectionBannerUri: 'https://static.ftx.com/nfts/324118815755185136.jpeg',
  collectionIconUri: 'https://static.ftx.com/nfts/466483285571882431.png',
  collectionName: 'Bored Ape Yacht Club',
  collectionDescription: 'BAYC is a collection of 10,000 Bored Ape NFTs. Owning a Bored Ape doubles as your membership to the Club.',
  firstNFTUri: 'https://lh3.googleusercontent.com/ZB6NqdEAwZEDqLGmwz_iPeqTrbVTjylx6EyFNWchd-3OQSZC69-c_VRB5YJ81ol7x1mRWVtZPuMGJz4cZS-uN6qKJ3W8_MeWybTDNtQ',
  hideNFT: true
}