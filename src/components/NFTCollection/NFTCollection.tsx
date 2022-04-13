import React from 'react';
import {View, Image, Text, Linking, GestureResponderEvent, Pressable} from 'react-native';
import tw from 'twrnc';
import {NFTCardRender} from '../NFTCard/NFTCard';
import CryptoFontIcon from '../../fonts/CryptoFont';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import {NFTCollectionDict, NFT} from '../../api/types';
import { useNavigate } from 'react-router';

export interface NFTCollectionProps {
  collection: NFTCollectionDict;
  collectionVolume: number;
  firstNFT: NFT;
  hideNFT?: boolean
}

export default function NFTCollection({
  collection,
  collectionVolume,
  firstNFT,
  hideNFT,
}: NFTCollectionProps) {
  let navigate = useNavigate();
  return (
    <NFTCollectionRender
      collectionName={collection.name}
      collectionDescription={collection.description}
      collectionBannerUri={collection.bannerImageUrl}
      collectionIconUri={collection.avatarImageUrl}
      collectionVolume={collectionVolume}
      collectionCurrency={firstNFT.quoteCurrency.toLowerCase()}
      contractAddress={firstNFT.ethContractAddress === null ? firstNFT.solMintAddress : firstNFT.ethContractAddress}
      firstNFTName={firstNFT.name}
      firstNFTUri={firstNFT.imageUrl}
      firstNFTPrice={firstNFT.auction?.bestBid}
      twitter={collection.twitterUrl}
      discord={collection.discordUrl}
      website={collection.homepageUrl}
      hideNFT={hideNFT}
      onCollectionPress={() => {
        navigate(`/${encodeURIComponent(collection.name)}`, {
          state: {
            collection,
            collectionVolume,
            firstNFT
          }
        })
      }}
    />
  );
}

export interface NFTCollectionRenderProps {
  collectionName: string,
  collectionDescription: string | null,
  collectionBannerUri: string | null,
  collectionIconUri: string | null,
  collectionVolume: number,
  collectionCurrency: string, // 'eth' | 'sol'
  contractAddress: string | null,
  firstNFTName: string,
  firstNFTUri: string | null,
  firstNFTPrice: number | null | undefined,
  twitter: string | null,
  discord: string | null,
  website: string | null,
  hideNFT?: boolean,
  onCollectionPress: (event: GestureResponderEvent) => void
}

function openNFTCollectionSocialLink(url: string) {
  Linking.canOpenURL(url).then((supported) => {
    return Linking.openURL(url);
  });
}

function openNFTCollectionEtherscan(contract: string) {
  const ethscan_url = 'https://etherscan.io/address/';
  Linking.canOpenURL(ethscan_url + contract).then((supported) => {
    return Linking.openURL(ethscan_url + contract);
  });
}
function openNFTCollectionSolscan(contract: string) {
  const ethscan_url = 'https://solscan.io/token/';
  Linking.canOpenURL(ethscan_url + contract).then((supported) => {
    return Linking.openURL(ethscan_url + contract);
  });
}

export function NFTCollectionRender({
  collectionName,
  collectionDescription,
  collectionBannerUri,
  collectionIconUri,
  collectionVolume,
  contractAddress,
  collectionCurrency,
  firstNFTUri,
  firstNFTName,
  firstNFTPrice,
  twitter,
  discord,
  website,
  hideNFT = false,
  onCollectionPress
}: NFTCollectionRenderProps) {
  return (
    <View style={tw`flex-col shadow-md bg-white`}>
      <View style={tw`w-full`}>
        {collectionBannerUri !== null && (
          <Image style={tw`h-[148px]`} source={{uri: collectionBannerUri}}/>
        )}
        {collectionBannerUri === null && (
          <Text>Banner Not Set</Text>
        )}
      </View>
      <View style={tw`absolute px-4 w-full flex-row items-baseline justify-center ${hideNFT ? 'top-[22px]' : 'top-[34px] md:top-[64px] md:justify-between'}`}>
          {collectionIconUri !== null && (
            <View style={tw`${hideNFT ? 'flex' : 'hidden'} bg-white rounded-lg border-4 shadow-md border-white md:flex`}>
              <Image style={tw`w-24 h-24`} source={{uri: collectionIconUri}}/>
            </View>
          )}
          {!hideNFT && (
            <View style={tw`w-36`}>
              <Pressable onPress={onCollectionPress} disabled={hideNFT}>
              <NFTCardRender
                nftName={firstNFTName}
                nftCurrency={collectionCurrency}
                nftPrice={firstNFTPrice}
                nftUri={firstNFTUri}
                collectionStack={true}
              />
              </Pressable>
            </View>
          )}
      </View>
      <View style={tw`p-2 md:pt-2 ${hideNFT ? 'pt-0' : 'pt-8'}`}>
        <View style={tw`mb-2 items-center ${hideNFT ? '' : 'md:items-start md:ml-32'}`}>
          <Text onPress={onCollectionPress} style={tw`text-lg font-extrabold`}>{collectionName}</Text>
          {contractAddress !== null && (collectionCurrency === 'eth' || collectionCurrency === 'sol') ? (
            <Text
              onPress={() => {
                if(collectionCurrency === 'eth') {
                  openNFTCollectionEtherscan(contractAddress);
                } else if (collectionCurrency === 'sol') {
                  openNFTCollectionSolscan(contractAddress);
                }
              }}
              style={tw`text-xs text-gray-800`}>
                {`View on ${collectionCurrency === 'eth' ? 'Etherscan' : 'Solscan'}`} <OcticonsIcons name='link-external'/>
            </Text>
          ) : (
            <Text style={tw`text-xs text-gray-800`}>Contract off chain</Text>
          )}
        </View>
        <Text style={tw`mb-2`}>{collectionDescription}</Text>
        <View style={tw`flex-row justify-between`}>
          {(website !== null || discord !== null || website !== null) && (
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-sm mr-1`}>Socials:</Text>
              {twitter !== null && (
                <MaterialCommunityIcons
                  onPress={() => {openNFTCollectionSocialLink(twitter)}}
                  size={16} 
                  name={"twitter"}
                />
              )}
              {discord !== null && (
                <MaterialCommunityIcons
                  onPress={() => {openNFTCollectionSocialLink(discord)}}
                  size={16}
                  name={"discord"}
                />
              )}
              {website !== null && (
                <MaterialCommunityIcons
                  onPress={() => {openNFTCollectionSocialLink(website)}}
                  size={16}
                  name={"web"}
                />
              )}
            </View>
          )}
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-base mr-1`}>Volume:</Text>
            <Text style={tw`text-base mr-1`}>{collectionVolume.toLocaleString()}</Text>
            <CryptoFontIcon size={12} name={collectionCurrency}/>
          </View>
        </View>
      </View>
    </View>
  );
}