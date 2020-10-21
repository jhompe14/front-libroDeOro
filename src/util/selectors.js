

export const filterDropById = (objectList, id) => {
    return objectList.filter(obj => obj.id !== id);
}

export const filterById = (objectList, id) => {
    return objectList.filter(obj => obj.id == id); 
}

export const filterRamasByGrupo = (ramas, idGrupo) => {
    return ramas.filter(rama => rama.idGrupo == idGrupo);
}

export const filterSeccionesByRama = (secciones, idRama) => {
    return secciones.filter(seccion => seccion.idRama == idRama);
}

export const filterCargosByGrupoRamaSeccion = (cargos, idGrupo, idRama, idSeccion) => {
    return cargos.filter(cargo => cargo.idGrupo == idGrupo || cargo.idRama == idRama || cargo.idSeccion == idSeccion);
}