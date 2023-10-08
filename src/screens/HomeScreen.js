import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

import Features from '../components/Features'
import { dummyMessages } from '../constants'

function HomeScreen() {
  const navigation = useNavigation()
  const [messages, setMessages] = useState(dummyMessages)
  const [recording, setRecording] = useState(true)
  const [loading, setLoading] = useState(false)
  const [speaking, setSpeaking] = useState(true)

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/bot.png')}
            style={{ width: wp(15), height: wp(15) }}
          />
        </View>

        {messages.length > 0 ? (
          <View className="space-y-2 flex-1">
            <Text
              className="text-gray-700 font-semibold ml-1"
              style={{ fontSize: wp(5) }}
            >
              Assistant
            </Text>

            <View
              style={{ height: hp(58) }}
              className="bg-neutral-200 rounded-3xl p-4"
            >
              <ScrollView
                // ref={scrollViewRef}
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message, index) => {
                  if (message.role == 'assistant') {
                    if (message.content.includes('https')) {
                      // result is an ai image
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                            <Image
                              source={{
                                uri: message.content,
                              }}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{
                                height: wp(60),
                                width: wp(60),
                              }}
                            />
                          </View>
                        </View>
                      )
                    } else {
                      // chat gpt response
                      return (
                        <View
                          key={index}
                          style={{ width: wp(70) }}
                          className="bg-emerald-100 p-2 rounded-xl rounded-tl-none"
                        >
                          <Text
                            className="text-neutral-800"
                            style={{
                              fontSize: wp(4),
                            }}
                          >
                            {message.content}
                          </Text>
                        </View>
                      )
                    }
                  } else {
                    // user input text
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View
                          style={{ width: wp(70) }}
                          className="bg-white p-2 rounded-xl rounded-tr-none"
                        >
                          <Text
                            style={{
                              fontSize: wp(4),
                            }}
                          >
                            {message.content}
                          </Text>
                        </View>
                      </View>
                    )
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}

        <View className="flex justify-center items-center my-5">
          {loading ? (
            <Image
              source={require('../../assets/images/loading.gif')}
              style={{ width: hp(10), height: hp(10) }}
            />
          ) : recording ? (
            <TouchableOpacity className="space-y-2">
              {/* recording stop button */}
              <Image
                className="rounded-full"
                source={require('../../assets/images/voiceLoading.gif')}
                style={{ width: hp(10), height: hp(10) }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              {/* recording start button */}
              <Image
                className="rounded-full"
                source={require('../../assets/images/recordingIcon.png')}
                style={{ width: hp(10), height: hp(10) }}
              />
            </TouchableOpacity>
          )}
          {messages.length > 0 && (
            <TouchableOpacity
              // onPress={clear}
              className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
            >
              <Text className="text-white font-semibold">Clear</Text>
            </TouchableOpacity>
          )}
          {speaking && (
            <TouchableOpacity
              // onPress={stopSpeaking}
              className="bg-red-400 rounded-3xl p-2 absolute left-10"
            >
              <Text className="text-white font-semibold">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen
