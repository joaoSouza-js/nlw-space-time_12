import { StatusBar } from 'expo-status-bar';
import {  Text, View, ImageBackground, TouchableOpacity } from 'react-native';

import BackgroundBlur from '../../src/assets/blur_background.png'
import React, { useEffect } from 'react';
import Stripes from '../../src/assets/stripes.svg'
import NlwLogo from '../../src/assets/nlw_logo.svg'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { api } from '../libs/api';
import { saveTokenInLocalStorage } from '../storage/StorageToke';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/1807fd14cb0c1e8329fd',
};


export function SignIn() {  
    
    const [request, response, signInWithGithub] = useAuthRequest(
        {
            clientId: '1807fd14cb0c1e8329fd',
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'nlwSpaceTime'
            }),
        },
        discovery
    );


    async function getUserToken(code: string) {
        try {
            const tokenResponse = await api.post<{ token: string }>('/register', {
                code
            })
            const { token } = tokenResponse.data

            await saveTokenInLocalStorage(token)

        } catch (error) {
            console.log('authentication error => ', error)
        }



    }

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;

            getUserToken(code)

        }

    }, [response]);


    return (
        <ImageBackground
            source={BackgroundBlur}
            className='relative flex-1 items-center bg-gray-950 px-5 py-10'
            imageStyle={{
                position: 'absolute',
                left: '-100%'
            }}
        >
            <View className='absolute left-2 overflow-hidden'>
                <Stripes />
                <Stripes />
            </View>


            <View className='flex-1 items-center justify-center gap-6'>

                <NlwLogo />

                <View className=' space-y-2'>
                    <Text className='text-gray-50 font-title text-2xl leading-tight  text-center'>
                        Sua cápsula do tempo
                    </Text>

                    <Text className='text-gray-150 font-body text-base text-center leading-relaxed'>
                        Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!

                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => signInWithGithub()}
                    activeOpacity={.7}
                    className='bg-green-500 rounded-full px-5 py-2'

                >
                    <Text className='font-alt text-sm uppercase text-black'>COMEÇAR A CADASTRAR</Text>
                </TouchableOpacity>
            </View>


            <Text className='text-gray-150 -mt-8'>Feito com 💜 no NLW da Rocketseat</Text>



        </ImageBackground>
    )
}