
export const categoriesModel = (name, description, currency) => {
  let a,b,c;
  const newCategory = (name, description, currency) => {
    a = name;
    b = description;
    c = currency;
    return {
        getName: () => a,
        getDescription: () => b,
        load,
        save        
    };
  }

  const load = (id) => {
    // get  redux action
    return this;
  }

  const save = () => {
    // save redux action
    return this;
  }

  return newCategory(name, description, currency);
}