let likes = document.querySelector(".likes");
let likeButton = document.querySelector("likeButton");

// let likeCount = 0;



const likeFunction = (id) => {
  const data = {id: id}
  fetch("/posts/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      const span = document.querySelector(`#likes-${id}`)
      span.innerHTML = data.likes;
    });
};
