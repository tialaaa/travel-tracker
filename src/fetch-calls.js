function getData(endpoint) {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`)
  .then(response => response.json())
  .catch(err => {
    alert('Cannot access the server. Please try again later.');
    console.log(err);
  })
};

function postData(endpoint, bodyData) {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok && response.status === 422) {
      throw new Error('Verify data inputs')
    } else if (!response.ok) {
      throw new Error('Error:' + response.statusText)
    };

    response.json();
  })
  .catch(err => console.log(err))
};

export { getData, postData };