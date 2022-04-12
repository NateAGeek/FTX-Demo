import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export interface PrimaryLayoutProps {
  children?: React.ReactNode;
}

export default function PrimaryLayout({
  children
}: PrimaryLayoutProps) {
  return (
    <View>
      <View>

      </View>
      <View style={tw`flex-col items-center`}>
        {children}
      </View>
    </View>
  );
}