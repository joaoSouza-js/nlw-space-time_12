import * as SecureStore from 'expo-secure-store';

const appLocalStorageKey = "nlwspacetime"
const appLocalSotrageTokenKey = `${appLocalStorageKey}_token`

export async function saveTokenInLocalStorage(token: string) {
    await SecureStore.setItemAsync(appLocalSotrageTokenKey, token);
}

export async function getTokenInLocalStorage() {
    const token = await SecureStore.getItemAsync(appLocalSotrageTokenKey);
    return token;
}

export async function removeTokenInLocalStorage() {
    await SecureStore.deleteItemAsync(appLocalSotrageTokenKey);
}
