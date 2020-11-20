import { StatusCodes } from 'http-status-codes';

export const queryFetch= async(url, token) => {
    return await fetch(url, {
      headers: {
        'Authorization': token
      },
    })
    .then(resp => {
        if(resp.status === StatusCodes.OK){
            return resp.json()
        }else{
            return new Promise((resolve, reject) => reject(resp));
        }
    });
  }
