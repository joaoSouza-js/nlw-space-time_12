import { ActivityIndicator, View } from "react-native";

export function Loader(){
    
    return (
        <View className="flex-1 text-center justify-center bg-slate-200">
            <ActivityIndicator size="large" className="text-purple-950"/>  
        </View>
    )
}