const likeFunction = (id) => {
  const data = { id: id };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("/posts/like", options)
    .then((response) => response.json())
    .then((data) => {
      const span = document.querySelector(`#likes-${id}`);
      span.innerHTML = data.likes;
    });
};
