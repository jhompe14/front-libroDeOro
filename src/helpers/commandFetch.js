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

export const commandFetchFormData = async(url, method, sendObject, attachedFiles, token) => {
  const formData = new FormData();
  const keysObject = Object.keys(sendObject);  
  keysObject.forEach(key => {
    if(typeof sendObject[key] === "object" && sendObject[key]?.length > 0){
        sendObject[key].forEach(keyArray => formData.append(key, keyArray));
    }else{
      formData.append(key, sendObject[key]);
    }
  });  
  
  if(attachedFiles != null && attachedFiles != undefined){
    for (let i = 0; i < attachedFiles.length; i++) {
      formData.append(`attachedFiles`, attachedFiles[i])
    }
  }
  
  const fetchCommand = await fetch(url, {
    method: method,      
    headers: {
      'Authorization': token,
    },
    body: formData
  });
  
  return fetchCommand;
}