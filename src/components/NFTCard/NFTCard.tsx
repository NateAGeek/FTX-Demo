import React from 'react';
import {View, Image, Text} from 'react-native';
import CryptoFontIcon from '../../fonts/CryptoFont';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import { NFT } from '../../api/types';

export interface NFTCardProps {
  nft: NFT;
  collectionStack?: boolean;
  hideDetails?: boolean;
}

export default function NFTCard({
  nft,
  collectionStack,
  hideDetails
}: NFTCardProps) {
  return (
    <NFTCardRender
      nftUri={nft.imageUrl}
      nftName={nft.name}
      nftPrice={nft.auction?.bestBid}
      nftCurrency={nft.quoteCurrency}
      collectionStack={collectionStack}
      hideDetails={hideDetails}
    />
  );
}

export interface NFTCardRenderProps {
  nftUri: string | null;
  nftName: string;
  nftCurrency: string;
  nftPrice: number | null | undefined;
  collectionStack?: boolean,
  hideDetails?: boolean
}

export function NFTCardRender({
  nftUri,
  nftName,
  nftCurrency,
  nftPrice,
  collectionStack = false,
  hideDetails = false
}: NFTCardRenderProps) {
  return (
  <View style={tw`m-2`}>
    {collectionStack && (
      <>
        <View style={[tw`absolute top-0 h-full aspect-square border-white border-2 rounded-lg shadow-lg`, {
          transform: [{
            rotateZ: '10deg'
          }]
        }]}>
          {nftUri !== null && (
            <Image style={tw`h-full`} source={{uri: nftUri}}/>
          )}
        </View>
        <View style={[tw`absolute top-0 h-full aspect-square border-white border-2 rounded-lg shadow-lg`, {
          transform: [{
            rotateZ: '5deg'
          }]
        }]}>
          {nftUri !== null && (
            <Image style={tw`h-full`} source={{uri: nftUri}}/>
          )}
        </View>
      </>
    )}
    <View style={tw`aspect-square rounded-lg overflow-hidden border-white border-2 shadow-lg`}>
      {nftUri !== null && (
        <Image style={tw`h-full`} source={{uri: nftUri}}/>
      )}
      {nftUri === null && (
        <Text>No NFT Preview Image Found</Text>
      )}
      {!hideDetails && (
        <LinearGradient colors={['#00000000', '#000000DD']} style={tw`p-2 absolute bottom-0 w-full`}>
          <Text style={tw`text-white text-xs`}>{nftName}</Text>
          {nftPrice !== undefined && nftPrice !== null && (
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-[8px] text-white mr-1`}>1.23</Text>
              <CryptoFontIcon style={tw`text-white text-[8px]`} name={nftCurrency}/>
            </View>
          )}
        </LinearGradient>
      )}
    </View>
  </View>
  );
}