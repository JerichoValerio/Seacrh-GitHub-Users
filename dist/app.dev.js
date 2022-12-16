"use strict";

var APIURL = 'https://api.github.com/users/';
var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search'); // todo Get user

function getUser(username) {
  var _ref, data;

  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios(APIURL + username));

        case 3:
          _ref = _context.sent;
          data = _ref.data;
          //  console.log(data)
          createUserCard(data);
          getRepos(username);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);

          if (_context.t0.response.status == 404) {
            createErrorCard('User not found!');
          }

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // todo Get repos


function getRepos(username) {
  var _ref2, data;

  return regeneratorRuntime.async(function getRepos$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(axios(APIURL + username + '/repos?sort=created'));

        case 3:
          _ref2 = _context2.sent;
          data = _ref2.data;
          //  console.log(data)
          addReposToCard(data);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          createErrorCard('Problem fetching repos');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
} // todo Create user card


function createUserCard(user) {
  var userID = user.name || user.login;
  var crdate = user.created_at;
  crdate = crdate.split('T')[0];
  var userBio = user.bio ? "<p>".concat(user.bio, "</p>") : '';
  var cardHTML = "\n    <div class=\"card\">\n        <div class=\"user-data\"> \n            <a href=\"".concat(user.html_url, "\" target=\"_blank\"><img src=\"").concat(user.avatar_url, "\" alt=\"").concat(user.name, "\" class=\"avatar\"></a>\n            <ul>\n                <li class=\"line\"><strong>Followers</strong> ").concat(user.followers, " </li>\n                <li><strong>Repos</strong> ").concat(user.public_repos, " </li>\n                <li class=\"line\"><strong>Following</strong> ").concat(user.following, " </li>\n            </ul>\n            <div class=\"created\">\n                <p> Creation date: ").concat(crdate, "\n            </div>\n        </div>\n        <div class=\"user-info\">\n            <a href=\"").concat(user.html_url, "\" target=\"_blank\" style=\"color:#fff\"><h2>").concat(userID, "</h2></a>\n        ").concat(userBio, "\n            <br>\n             <div id=\"repos\"></div>\n        </div>\n    </div>\n    "); //console.log(cardHTML)

  main.innerHTML = cardHTML;
} // todo Create error card


function createErrorCard(msg) {
  var cardHTML = "\n        <div class=\"card\">\n            <h1>".concat(msg, "</h1>\n        </div>\n    "); //  console.log(cardHTML)

  main.innerHTML = cardHTML;
} // todo Add repos to card


function addReposToCard(repos) {
  var reposEl = document.getElementById('repos');
  repos.slice(0, 10).forEach(function (repo) {
    var repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name; //console.log

    reposEl.appendChild(repoEl);
  });
} // todo Event listeners


form.addEventListener('submit', function (e) {
  e.preventDefault();
  var user = search.value;

  if (user) {
    getUser(user);
    search.value = '';
  }
});