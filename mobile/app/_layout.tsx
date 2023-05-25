import React, { ReactNode, useEffect, useState } from "react";
import Stripes from '../src/assets/stripes.svg'
import { View, ImageBackground,StatusBar } from "react-native";
import BackgroundBlur from '../src/assets/blur_background.png'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree"
import { useFonts } from "expo-font";
import { Loader } from "../src/components/Loader";
import { Slot, Stack } from "expo-router";
import { getTokenInLocalStorage } from "../src/storage/StorageToke";


export default function Layout(children: ReactNode){
    const [isUserAuthenticated, setIsUserAuthenticated] = useState< boolean>(false)
    const [fontIsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold
    })
 


    async function handleCheckUserAuthentication() {
        try {
            const token = await getTokenInLocalStorage()
           setIsUserAuthenticated(!!token)
        } catch (error) {
            console.log('error')
        }
    }

    useEffect(() => {
        handleCheckUserAuthentication()
    }, [])
     

    if (!fontIsLoaded) {
        return <Loader />
    }

    return (
        <ImageBackground
            source={BackgroundBlur}
            className='relative flex-1  bg-gray-950 '
            imageStyle={{
                position: 'absolute',
                left: '-100%'
            }}
        >
            <View className='absolute left-2 overflow-hidden'>
                <Stripes />
                <Stripes />
            </View>

            <Stack   screenOptions={{headerShown:false,animation:'fade', contentStyle:{backgroundColor:'transparent'}}}>

                <Stack.Screen name='index' redirect={isUserAuthenticated}/>
                <Stack.Screen name='memories'/>
                <Stack.Screen name='new' />
                
            </Stack>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'transparent'}
                translucent
            />
        </ImageBackground>


    )
    
    
}