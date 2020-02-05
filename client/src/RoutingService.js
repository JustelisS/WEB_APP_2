
class RoutingService {
  async postData(url = '', data = {}) {
    await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      //redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then((data) => data.json())
    .then((data) => {
      alert('Success:', data);
    })
    .catch((error) => {
      alert('Error:', error);
    });
  }

  /*postData('https://example.com/answer', { answer: 42 })
    .then((data) => {
      console.log(data); // JSON data parsed by `response.json()` call
    });*/
}

export default RoutingService;
