import React, { useState } from 'react';
import {View, Text} from 'react-native';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import tw from 'twrnc';
import { useNFTSingleCollection } from '../../api/hooks/useNFTSingleCollection';
import { NFT, NFTCollectionDict } from '../../api/types';
import NFTCard from '../../components/NFTCard/NFTCard';
import NFTCollection from '../../components/NFTCollection/NFTCollection';
import PrimaryLayout from '../PrimaryLayout';


const NFTCOLLECTIONPAGE_SIZE = 6;

interface LocationState {
  collection: NFTCollectionDict;
  collectionVolume: number;
  firstNFT: NFT;
}

export default function NFTCollectionPage() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  let { nftCollection } = useParams();
  const location = useLocation();
  const state = location.state as LocationState;
  console.log("state", state);
  
  let {data} = useNFTSingleCollection(page, NFTCOLLECTIONPAGE_SIZE, {
    collection: nftCollection
  });
  return (
    <PrimaryLayout>
      <NFTCollection
        firstNFT={state.firstNFT}
        collection={state.collection}
        collectionVolume={state.collectionVolume}
        hideNFT={true}
      />
      <View style={tw`flex-row flex-wrap justify-center`}>
        {data?.result !== undefined && data.result.nfts.map((nft, i) => (
          <View style={tw`w-full sm:w-60`}>
            <NFTCard nft={nft} onPress={() => {
              navigate(`/${encodeURIComponent(nftCollection as string)}/${encodeURIComponent(nft.name)}`, {
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
      <View style={tw`flex-row my-6 self-center`}>
          {page !== 0 && (
            <Text style={tw`font-bold text-lg mr-2`} onPress={() => {
              setPage(page - 1)
            }}>{'<'}</Text>
          )}
          <Text style={tw`font-bold text-lg`}>{page + 1}</Text>
          {data !== undefined && page * NFTCOLLECTIONPAGE_SIZE < data?.result.count && (
            <Text style={tw`font-bold text-lg ml-2`} onPress={() => {
              setPage(page + 1)
            }}>{'>'}</Text>
          )}
      </View>
    </PrimaryLayout>
  );
}