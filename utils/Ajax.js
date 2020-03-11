import AjaxError from './AjaxError';
import AjaxResponse from './AjaxResponse'

const METHOD_GET    = "GET";
const METHOD_POST   = "POST";
const METHOD_PUT    = "PUT";
const METHOD_DELETE = "DELETE";

const INITIALIZING_CONECTION = 0;
const ESTABLISHING_CONECTION = 1;
const REQUEST_RECIEVED       = 2;
const PROCESSING_REQUEST     = 3;
const REQUEST_FINISHED       = 4;

const STATUS_MESSAGE = [
  "request not initialized",
  "server connection established",
  "request received",
  "processing request",
  "request finished and response is ready"
];

class Ajax
{
  static wrapQueryData(data)
  {
    if(data == null || Object.keys(data).length == 0) return "";

    let first = true;
    let result = '';
    for (const [key, value] of Object.entries(data)) {
      if(!first) result += '&';
      else first = false;
  
      result += `${key}=${value}`;
    }

    return result;
  }

  static get(url, data = {}, headers = {})
  {
    const query = Ajax.wrapQueryData(data);
    return Ajax.performRequest(METHOD_GET, url + '?' + query, null, headers);
  }

  static post(url, data = {}, headers = {})
  {
    return Ajax.performRequest(METHOD_POST, url, data, headers);
  }

  static put(url, data = {}, headers = {})
  {
    return Ajax.performRequest(METHOD_PUT, url, data, headers);
  }

  static delete(url, headers = {})
  {
    return Ajax.performRequest(METHOD_DELETE, url, headers);
  }

  static performRequest(type, url, data = {}, headers = {})
  {
    return new Promise((resolve, reject) => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        // console.log(STATUS_MESSAGE[this.readyState]);

        switch(this.readyState) {
          case INITIALIZING_CONECTION:
            // Inicializando conexion con el servidor
          break;

          case ESTABLISHING_CONECTION:
            // Estableciendo conexion con el servidor
          break;
          
          case REQUEST_RECIEVED:
            // La peticion ha sido recibida por el servidor
          break;

          case PROCESSING_REQUEST:
            // La peticion se esta procesando
          break;
          
          case REQUEST_FINISHED:
            // Exito
            if(this.status >= 200 && this.status < 300) {
              resolve(new AjaxResponse(xhttp));
            }
            // Error
            else reject(new AjaxError(xhttp));
          break;
        }
      };
      xhttp.open(type, url, true);

      Ajax.setHeaders(xhttp, headers);

      try {
        xhttp.send(Ajax.wrapQueryData(data));
      } catch(e) {
        reject(new AjaxError(xhttp, e));
      }
    })
  }

  static setHeaders(xhttp, headers)
  {
    if(Object.keys(headers).length == 0) return;

    for (const [key, value] of Object.entries(headers)) {
      xhttp.setRequestHeader(key, value);
    }
  }
}

export default Ajax;