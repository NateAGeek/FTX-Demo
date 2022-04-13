import React, { useState } from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import { useNFTCollections } from '../../api/hooks/useNFTCollections';
import NFTCollection from '../../components/NFTCollection/NFTCollection';
import PrimaryLayout from '../PrimaryLayout';

const NFTPAGE_SIZE = 5;

export default function NFTsPage() {
  const [page, setPage] = useState(0);
  const {data: collections} = useNFTCollections(page, NFTPAGE_SIZE);

  return (
    <PrimaryLayout>
        {collections === undefined && (
          <Text>Loading in collections</Text>
        )}
        {collections !== undefined && collections.result.collections.map((collection, i) => {
          if(collection.collectionDict === undefined) {
            return <></>
          }
          return (
            <View style={tw`mb-4`} key={'nft_collection_' + i}>
              <NFTCollection
                collection={collection.collectionDict}
                collectionVolume={collection.volume}
                firstNFT={collection.first_nft}
              />
            </View>
          )
        })}
      <View style={tw`flex-row my-6 self-center`}>
          {page !== 0 && (
            <Text style={tw`font-bold text-lg mr-2`} onPress={() => {
              setPage(page - 1)
            }}>{'<'}</Text>
          )}
          <Text style={tw`font-bold text-lg`}>{page + 1}</Text>
          {collections !== undefined && page * NFTPAGE_SIZE < data?.result.count && (
            <Text style={tw`font-bold text-lg ml-2`} onPress={() => {
              setPage(page + 1)
            }}>{'>'}</Text>
          )}
      </View>
    </PrimaryLayout>
  );
}