
export const queryFetch= async(url, token) => {
    return await fetch(url, {
      headers: {
        'Authorization': token
      },
    });
  }