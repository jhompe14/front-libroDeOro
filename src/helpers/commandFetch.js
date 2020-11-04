export const commandFetch= async(url, method, sendObject, token) => {
    const fetchCommand = await fetch(url, {
      method: method,      
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: sendObject ? JSON.stringify(sendObject) : undefined
    });  
  
    return fetchCommand;
  }