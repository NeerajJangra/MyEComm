const BASE_URL = 'https://dummyjson.com';

export const Auth = {
  loginUser: async (username: string, password: string) => {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
      });
      const data = await res.json();

      if(data.message){
        throw new Error(JSON.stringify(data.message));
      }

      return data
      
    
  },
};
