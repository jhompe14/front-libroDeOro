

export const filterDropById = (objectList, id) => {
    return objectList.filter(obj => obj.id !== id);
}