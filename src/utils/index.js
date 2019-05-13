export const queryFormat = function(query = "") {
  let params = [];
  Object.keys(query).forEach(val => {
    if (query[val] !== "" && query[val] !== undefined) {
      params.push(val + "=" + query[val]);
    }
  });

  return params.length ? `?${params.join("&")}` : "";
};


export const searchToObject = function(search) {
  let result = {};
  const arr = search.slice(1).split("&");
  arr.forEach(val => {
    const md = val.split("=");
    result[md[0]] = md[1];
  });
  return result;
};
