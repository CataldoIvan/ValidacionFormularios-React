export const helpFetch = () => {
  const customFetch = (endPoint, options={}) => {
    const defaultHeader = {
      Accept: "application/json",
    };

   /*  const controller = new AbortController();
    const signal = controller.signal;
 */
    options.method = options.method || 'GET';
    options.headers = options.headers
      ? {
         /*  ...defaultHeader, */
          ...options.headers,
        }
      : defaultHeader;
    //hay que transformar a string el body
    options.body = JSON.stringify(options.body);
    console.log("Headers");
    console.log(options.headers);
    console.log("method");
    console.log(options.method);

    //if (!options.body) delete options.body;
/* 
    setTimeout(() => {
      controller.abort();
    }, 5000); */

    return fetch(endPoint, options)
      .then((response) =>response.ok
      ? response.json()
      : Promise.reject({
          err: true,
          status: response.status || "00",
          statusText: response.statusText || "Ocurrio un error en la peticion",
        })
  ).catch((err) => {
        console.log("el error aca");
        console.log(err);
        return err
      });
  };

  const post = (url, options={}) => {
    options.method = 'POST';
    return customFetch(url, options);
  };
  const get = (url, options={}) => {
    options.method = "GET";
    return customFetch(url, options);
  };

  return { post ,get};
};
