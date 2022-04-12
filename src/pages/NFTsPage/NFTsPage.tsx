import React, { useState } from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import { useNFTCollections } from '../../api/hooks/useNFTCollections';
import NFTCollection from '../../components/NFTCollection/NFTCollection';
import PrimaryLayout from '../PrimaryLayout';

export interface NFTsPageProps {

}

export default function NFTsPage(props: NFTsPageProps) {
  console.log(props);
  const [page, setPage] = useState(0);
  const {data} = useNFTCollections(page);

  return (
    <PrimaryLayout>
    <View style={tw`flex-6`}>
      {data !== undefined &&(
        <View>
          {data.result.collections.map((collection) => {
            if(collection.collectionDict === undefined) {
              return <></>
            }
            return (<NFTCollection
              collection={collection.collectionDict}
              collectionVolume={collection.volume}
              firstNFT={collection.first_nft}
            />)
          })}
        </View>
      )}
    </View>
    </PrimaryLayout>
  );
}