const mainContent = document.getElementById('main-content');
const profileMenu = document.getElementById('profile-menu');

function navigateTo(page) {
  if (page === 'home') {
    mainContent.innerHTML = `
      <h1>사용자1</h1>
      <p>홈 페이지 내용입니다.</p>
    `;
  } else if (page === 'videos') {
    mainContent.innerHTML = `
      <h1>동영상</h1>
    `;
  } else if (page === 'community') {
    mainContent.innerHTML = `
      <h1>커뮤니티</h1>
      <textarea class="community-input" placeholder="어떤 생각을 하고 계신가요?"></textarea>
      <button onclick="postMessage()">게시</button>
      <div id="community-posts"></div>
    `;
  }
}

function postMessage() {
  const input = document.querySelector('.community-input');
  const posts = document.getElementById('community-posts');
  if (input.value.trim() !== '') {
    const post = document.createElement('div');
    post.className = 'post';
    post.textContent = input.value;
    posts.appendChild(post);
    input.value = '';
  }
}

document.getElementById('profile-icon').addEventListener('click', () => {
  profileMenu.classList.toggle('hidden');
});

navigateTo('home');
