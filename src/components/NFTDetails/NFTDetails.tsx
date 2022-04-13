import React from 'react';
import {View, Text} from 'react-native';
import CryptoFontIcon from '../../fonts/CryptoFont';
import tw from 'twrnc';
import { NFT } from '../../api/types';

export interface NFTDetailsProps {
  /** NFT sent back from the server */
  nft: NFT
}
/**
 * Parses NFTs sent from the backend and properly passes the fields to the renderer
 * @param {NFTDetailsProps} props props needed to render NFT Details
 * @return {JSX.Element}
 */
export default function NFTDetails({
  nft
}: NFTDetailsProps) {
  return (
  <NFTDetailsRender 
    nftName={nft.name}
    nftPrice={nft.auction?.bestBid}
    nftCurrency={nft.quoteCurrency.toLowerCase()}
    nftAttributes={nft.attributes}
  />);
}

export interface NFTDetailsRenderProps {
  nftName: string;
  nftPrice: number | undefined | null;
  nftCurrency: string; //'sol' | 'eth';
  nftAttributes: Record<string, string> | null;
}
/**
 * Render component only for styling
 * @param {NFTDetailsRenderProps} props needed to render the NFT Details
 * @returns 
 */
export function NFTDetailsRender({
  nftName,
  nftPrice,
  nftCurrency,
  nftAttributes,
}: NFTDetailsRenderProps) {
  return (
    <View style={tw`flex-col p-4 shadow-md bg-white`}>
      <Text style={tw`text-2xl font-bold`}>{nftName}</Text>
      {nftPrice !== undefined && nftPrice !== null && (
        <View style={tw`flex-row items-center`}>
          <Text style={tw`mr-1`}>{nftPrice.toLocaleString()}</Text>
          <CryptoFontIcon name={nftCurrency}/>
        </View>
      )}
      {nftAttributes !== null && (
        <View>
          <Text style={tw`font-bold text-lg my-2`}>Attributes</Text>
          <View style={tw`flex-row flex-wrap justify-center md:justify-start`}>
            {Object.keys(nftAttributes).map((attributeKey, i) => (
              <View style={tw`mr-4 mb-4 shadow-md items-center p-2 w-40`} key={'nft_attr_' + i}>
                <Text style={tw`font-semibold`}>{attributeKey}</Text>
                <Text style={tw`text-sm`}>{nftAttributes[attributeKey]}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}