const APIURL = 'https://api.github.com/users/'


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// todo Get user
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)
      //  console.log(data)
        createUserCard(data)
        getRepos(username)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('User not found!')
        }
    }
}

// todo Get repos
async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')
      //  console.log(data)
        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }
}

// todo Create user card
function createUserCard(user) {
    const userID = user.name || user.login
    var crdate = user.created_at;
    crdate = crdate.split('T')[0];
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class="card">
        <div class="user-data"> 
            <a href="${user.html_url}" target="_blank"><img src="${user.avatar_url}" alt="${user.name}" class="avatar"></a>
            <ul>
                <li class="line"><strong>Followers</strong> ${user.followers} </li>
                <li><strong>Repos</strong> ${user.public_repos} </li>
                <li class="line"><strong>Following</strong> ${user.following} </li>
            </ul>
            <div class="created">
                <p> Creation date: ${crdate}
            </div>
        </div>
        <div class="user-info">
            <a href="${user.html_url}" target="_blank" style="color:#fff"><h2>${userID}</h2></a>
        ${userBio}
            <br>
             <div id="repos"></div>
        </div>
    </div>
    `
    //console.log(cardHTML)
    main.innerHTML = cardHTML
    
}

// todo Create error card
function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `
  //  console.log(cardHTML)
    main.innerHTML = cardHTML
}

// todo Add repos to card
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')
    repos
        .slice(0, 10)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            //console.log
            reposEl.appendChild(repoEl)
        })
}

// todo Event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value

    if(user) {
        getUser(user)
        search.value = ''
    }
})