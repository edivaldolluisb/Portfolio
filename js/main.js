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

// works.html marks its list with data-all: every work, year instead of index
function listRecent(array) {
    const showAll = 'all' in recentWorks.dataset;
    recentWorks.innerHTML = '';
    array
      .filter((work) => showAll || work.show_recents !== false)
      .slice(0, showAll ? undefined : 5)
      .forEach((work, index) => {
          const row = document.createElement('div');
          row.className = 'work-row';
          row.tabIndex = 0;

          const idx = document.createElement('span');
          idx.className = 'work-index';
          idx.textContent = showAll ? work.year : String(index + 1).padStart(2, '0');

          const title = document.createElement('p');
          title.className = 'work-title';
          title.textContent = work.title;

          const desc = document.createElement('span');
          desc.className = 'work-desc';
          desc.textContent = work.short_description;

          const links = document.createElement('div');
          links.className = 'work-links';
          links.appendChild(buildLinks(work.link));

          // details revealed when the row opens
          const more = document.createElement('div');
          more.className = 'work-more';
          const moreInner = document.createElement('div');
          const fullDesc = document.createElement('p');
          fullDesc.textContent = work.description;
          const tags = document.createElement('div');
          tags.className = 'work-tags';
          work.built_with.forEach((tech) => {
              const tag = document.createElement('span');
              tag.textContent = tech;
              tags.appendChild(tag);
          });
          moreInner.append(fullDesc, tags);
          more.appendChild(moreInner);

          row.append(idx, title, desc, links, more);
          recentWorks.appendChild(row);
      });
}
