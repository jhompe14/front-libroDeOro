

export const filterDropById = (objectList, id) => {
    return objectList.filter(obj => obj.id !== id);
}

export const filterById = (objectList, id) => {
    return objectList.filter(obj => obj.id == id); 
}

export const filterRamasByGrupo = (ramas, idGrupo) => {
    return ramas.filter(rama => rama.idGrupo == idGrupo);
}