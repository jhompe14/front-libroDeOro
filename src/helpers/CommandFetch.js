
export const commandFetch= async(url, method, sendObject) => {
  return await fetch(url, {
    method: method,      
    headers: {
      'Content-Type': 'application/json'
    },
    body: sendObject ? JSON.stringify(sendObject) : undefined
  });
}