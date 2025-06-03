import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const LOGGEDIN_USER = 'loggedin_user'

export const UserManagement = {
  saveToken: async (token: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  getToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  saveUser: async (userData: string) => {
    console.log({userData})
    await AsyncStorage.setItem(LOGGEDIN_USER, userData)
  },

  getUser: async ()=>{
    
    const userData =  await AsyncStorage.getItem(LOGGEDIN_USER)
    console.log(userData)
    return userData
  },

  removeToken: async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  removeUser: async () => {
    await AsyncStorage.removeItem(LOGGEDIN_USER)
  },

  isLoggedIn: async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  }
};
