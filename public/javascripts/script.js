let likes = document.querySelector('.likes');
let likeButton = document.querySelector('likeButton');

let likeCount = 0;

const likeFunction = (e) => {
  likeCount += 1;
  likes.innerHTML = likeCount;
  console.log(likeCount)
  // console.log(like)
  
}
