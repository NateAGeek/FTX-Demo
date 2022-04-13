import React from 'react';
import {View, Text} from 'react-native';
import { useLocation, useNavigate } from 'react-router-dom';
import { NFT, NFTCollectionDict } from '../../api/types';
import PrimaryLayout from '../PrimaryLayout';
import tw from 'twrnc';
import NFTCard from '../../components/NFTCard/NFTCard';
import NFTCollection from '../../components/NFTCollection/NFTCollection';
import NFTDetails from '../../components/NFTDetails/NFTDetails';
import { useNFTSingleCollection } from '../../api/hooks/useNFTSingleCollection';

interface LocationState {
  nft: NFT,
  collection: NFTCollectionDict;
  collectionVolume: number;
}

export default function NFTDetailsPage(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  let {data} = useNFTSingleCollection(0, 5, {
    collection: state.collection.name
  })

  return (
    <PrimaryLayout>
      <View style={tw`flex flex-col lg:flex-row`}>
        <View style={tw`my-2 w-full lg:m-0 lg:w-1/3`}>
          <NFTCard nft={state.nft} hideDetails={true} />
        </View>
        <View style={tw`mb-2 w-full lg:w-2/3`}>
          <View style={tw`mb-2`}>
            <NFTCollection
              collection={state.collection}
              collectionVolume={state.collectionVolume}
              firstNFT={state.nft}
              hideNFT={true}
            />
          </View>
          <View>
            <NFTDetails nft={state.nft}/>
          </View>
          {data?.result !== undefined && data.result.nfts.filter(filterNFT => filterNFT.name !== state.nft.name).length > 0 && (  
            <Text style={tw`my-4 font-bold text-lg`}>Related NFTs</Text>
          )}
        <View style={tw`flex-row flex-wrap justify-center`}>
        {data?.result !== undefined && data.result.nfts.filter(filterNFT => filterNFT.name !== state.nft.name).map((nft, i) => (
          <View style={tw`w-full sm:w-60`} key={'suggested_nft_' + i}>
            <NFTCard nft={nft} onPress={() => {
              navigate(`/${encodeURIComponent(state.collection.name as string)}/${encodeURIComponent(nft.name)}`, {
                state: {
                  nft,
                  collection: state.collection,
                  collectionVolume: state.collectionVolume
                }
              })
            }}/>
          </View>
        ))}
      </View>
        </View>
      </View>
    </PrimaryLayout>
  );
}