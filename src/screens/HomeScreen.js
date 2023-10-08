import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <SafeAreaView classname="flex-1 flex justify-around bg-white">
      <View classname="space-y-2">
        <Text classname="text-center font-bold text-gray-400 text-4xl">
          Jarvis
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;