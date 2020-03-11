import AjaxResponse from './AjaxResponse'

class AjaxError
{
  response;
  data;

  constructor(xhttp, e = null)
  {
    this.data = e;
    this.response = new AjaxResponse(xhttp);
  }
}

export default AjaxError;