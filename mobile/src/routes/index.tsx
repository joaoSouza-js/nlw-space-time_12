import {NavigationContainer} from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { useEffect, useState } from 'react'
import { getTokenInLocalStorage } from '../storage/StorageToke'
import { Loader } from '../components/Loader'
import { AppRoutes } from './app.routes'

export function Routes(){
    

    return(
        <NavigationContainer>
            <AuthRoutes/>
        </NavigationContainer>
    )
}