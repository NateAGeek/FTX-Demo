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

/** Shared location state */
interface LocationState {
  collection: NFTCollectionDict;
  collectionVolume: number;
  firstNFT: NFT;
}

/**
 * Renders the collection page. Giving a nice grid of all the NFTs in the collection
 * @return {JSX.Element}
 */
export default function NFTCollectionPage() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  let { nftCollection } = useParams();
  const location = useLocation();
  const state = location.state as LocationState;
  
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
            <Text style={tw`font-bold text-2xl mr-2`} onPress={() => {
              setPage(page - 1)
            }}>{'<'}</Text>
          )}
          <Text style={tw`font-bold text-2xl`}>{page + 1}</Text>
          {data !== undefined && (page + 1) * NFTCOLLECTIONPAGE_SIZE < data?.result.total && (
            <Text style={tw`font-bold text-2xl ml-2`} onPress={() => {
              setPage(page + 1)
            }}>{'>'}</Text>
          )}
      </View>
    </PrimaryLayout>
  );
}