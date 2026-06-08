/*skills*/
const skill_button = document.querySelector('.skill_button');
const skill_wrapper = document.querySelector('.skills-wrapper');
const skill_panel = document.querySelector('.skills');

function toggleSkills() {
    const open = skill_button.getAttribute('aria-expanded') === 'true';
    skill_button.setAttribute('aria-expanded', String(!open));
    skill_wrapper.classList.toggle('is-open', !open);
    skill_button.classList.toggle('is-open', !open);
}

skill_button.addEventListener('click', toggleSkills);

skill_panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        skill_button.setAttribute('aria-expanded', 'false');
        skill_wrapper.classList.remove('is-open');
        skill_button.classList.remove('is-open');
        skill_button.focus();
    }
});

//recent works

// fetch works.json 
function readfromJson() {
    //write to a json file
    fetch("./js/works.json")
        .then(response => response.json())
        .then(data => {
            // arquivo JSON foi convertido em um objeto JavaScript
            //console.log(data.works);
            //console.log(data.works);
            listRecent(data.works)


        }).catch(() => {});

}
readfromJson()

// get the works data and render as typographic rows
const recentWorks = document.querySelector('.some_works');

function buildLinks(link) {
    const fragment = document.createDocumentFragment();
    const sites = ["site", "git_hub"];
    sites.forEach((site) => {
        if (link[site] !== "") {
            const icon = site === "site" ? "fa-solid fa-arrow-up-right-from-square" : "fa-brands fa-github";
            const label = site === "site" ? "View project" : "GitHub";
            const a = document.createElement('a');
            a.className = 'work-link';
            a.href = link[site];
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.setAttribute('aria-label', label);
            const i = document.createElement('i');
            i.className = icon;
            i.setAttribute('aria-hidden', 'true');
            a.appendChild(i);
            fragment.appendChild(a);
        }
    });
    return fragment;
}

function listRecent(array) {
    recentWorks.innerHTML = '';
    array
      .filter((work) => work.show_recents !== false)
      .forEach((work, index) => {
          const row = document.createElement('div');
          row.className = 'work-row';

          const idx = document.createElement('span');
          idx.className = 'work-index';
          idx.textContent = String(index + 1).padStart(2, '0');

          const title = document.createElement('p');
          title.className = 'work-title';
          title.textContent = work.title;

          const desc = document.createElement('span');
          desc.className = 'work-desc';
          desc.textContent = work.short_description;

          const links = document.createElement('div');
          links.className = 'work-links';
          links.appendChild(buildLinks(work.link));

          row.append(idx, title, desc, links);
          recentWorks.appendChild(row);
      });
}
