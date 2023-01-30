const API_URL = 'https://api.github.com/users/';

const main = document.querySelector('.main');
const form = document.querySelector('.search-form');
const searchEl = document.querySelector('.search-user');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = searchEl.value.replace(' ', '');

  if (user) {
    getUserApi(user);

    searchEl.value = '';
  }
});

async function getUserApi(username) {
  try {
    const { data } = await axios(API_URL + username);

    createCardUser(data);
    getReposApi(username);
  } catch (error) {
    if (error.response.status === 404) {
      createCardError('404 - Nome de usuário não encontrado!');
    }
  }
}

async function getReposApi(username) {
  try {
    const { data } = await axios(API_URL + username + '/repos?short=created');

    addRepoToCard(data);
  } catch (error) {
    createCardError('Erro ao buscar repositórios!');
  }
}

function createCardUser(user) {
  const { avatar_url, bio, followers, following, name, public_repos } = user;
  const card = `     
  <div class="card-user">
    <div>
        <img
        src="${avatar_url}"
        alt="usuario pesquisado"
        class="avatar"
        />
    </div>
    <div class="user-info">
        <h2>${name}</h2>
        <p>
        ${bio}
        </p>

        <ul>
        <li>Followers<strong>-${followers}</strong></li>
        <li>Following<strong>-${following}</strong></li>
        <li>Repos<strong>-${public_repos}</strong></li>
        </ul>

    <div class="repos">
     
    </div>
  </div>
</div>`;

  main.innerHTML = card;
}

function addRepoToCard(repos) {
  const reposEl = document.querySelector('.repos');

  repos.slice(0, 5).forEach((repo) => {
    const { html_url, name } = repo;

    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = html_url;
    repoEl.target = '_blank';
    repoEl.innerText = name;

    reposEl.appendChild(repoEl);
  });
}

function createCardError(msg) {
  const card = `
      <div class='card-user'>
        <h1>${msg}</h1>
      </div>
    `;

  main.innerHTML = card;
}
