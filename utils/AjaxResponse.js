class AjaxResponse
{
  headers;
  responseUrl;
  data;
  status;

  constructor(xhttp)
  {
    this.processHeaders(xhttp.getAllResponseHeaders());

    this.responseUrl = xhttp.responseUrl;
    this.status = xhttp.status;
    this.statusText = xhttp.statusText;

    if(xhttp.getResponseHeader("Content-Type") == 'application/json') {
      this.data = JSON.parse(xhttp.responseText);
    }
    else this.data = xhttp.responseText;
  }

  processHeaders(rawHeaders)
  {
    var arr = rawHeaders.trim().split(/[\r\n]+/);

    // Create a map of header names to values
    var headerMap = {};
    arr.forEach(function (line) {
      var parts = line.split(': ');
      var header = parts.shift().toLowerCase().replace('-', '_');
      var value = parts.join(': ');
      headerMap[header] = value;
    });

    this.headers = headerMap;
  }
}

export default AjaxResponse;