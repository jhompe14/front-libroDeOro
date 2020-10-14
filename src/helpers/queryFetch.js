
export const queryFetch= async(url) => {
    return await fetch(url, {
      headers: {
        'Authorization': ''
      },
    });
  }