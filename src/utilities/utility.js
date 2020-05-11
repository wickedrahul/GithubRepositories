export const filterAnArrayOfObjects = (searchTerm, arrayOfObjects)=>{
    return arrayOfObjects.filter(i=>{
        return i.id.toString().includes(searchTerm) || i.name.includes(searchTerm);
      });
}

export const sortAnArrayBasedOnAPropertyValue = (list, field, sortType)=>{
    if(sortType === "DESC"){
        return list.sort((a, b) => parseFloat(b[field]) - parseFloat(a[field])); 
    }else{
        return list.sort((a, b) => parseFloat(a[field]) - parseFloat(b[field]));
    }
       
}