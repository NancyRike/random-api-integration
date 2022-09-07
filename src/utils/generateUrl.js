/**
 * 
 * @param {string} baseUrl 
 * @param {object} parameters 
 * @returns {string}
 */
 export const generateUrl = (baseUrl, parameters) => {
    const queryStringArray = [];
    for (const key in parameters) {
      if (parameters[key] !== "") {
        queryStringArray.push(`${key}=${encodeURIComponent(parameters[key])}`);
      }
    }
  
    return `${baseUrl}?${queryStringArray.join("&")}`;
  };
