import React from 'react';
import { View, Text } from 'react-native';
import { useNavigate } from 'react-router-dom';
import tw from 'twrnc';

export interface PrimaryLayoutProps {
  children?: React.ReactNode;
}

export default function PrimaryLayout({
  children
}: PrimaryLayoutProps) {
  const navigate = useNavigate();
  return (
    <View style={tw`flex flex-col flex-1 bg-gray-50`}>
      <View style={tw`px-6 py-4 mb-4 shadow-xl`}>
        <Text onPress={() => {
          navigate("/");
        }} style={tw`text-6xl font-extrabold`}>NFTs</Text>
      </View>
      <View style={tw`flex items-center mx-4 lg:mx-0 `}>
        <View style={tw`w-full md:w-3/4 lg:w-2/3`}>
          {children}
        </View>
      </View>
    </View>
  );
}