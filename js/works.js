

// fetch works.json and return works array
function readfromJson() {
    //write to a json file
    fetch("./js/works.json")
        .then(response => response.json())
        .then(data => {
            // arquivo JSON foi convertido em um objeto JavaScript
            console.log(data.works);
            createTable(data.works);


        }).catch(error => console.log("Erro ao tentar ler o ficheiro: " + error));

}
readfromJson()

// get the works data and create a table row for each work

var tabela = document.querySelector('table > tbody');
function createTable(array) {
    tabela.innerHTML = "";
    for (const work of array) {
        console.log(work);
        tabela.innerHTML += `
        <tr>
            <td>${work.year}</td>
            <td>${work.title}</td>
            <td>${show_built_with(work.built_with)}</td>
            <td>                            
                <div class="extern_git_links">
                    ${show_links(work.link)}
                    
                </div>
            </td>
        </tr>
        `
    }
}

function show_links(link) {
    let links = "";
    const sites = ["site", "git_hub"];
    sites.forEach((site) => {
      if (link[site] !== "") {
        const icon = site === "site" ? "fa-solid fa-arrow-up-right-from-square" : "fa-brands fa-github";
        links += `<a href="${link[site]}" target="_blank" rel="noopener noreferrer">
                  <i class="${icon}"></i>
                </a>`;
      }
    });
    return links;
  }
  function show_built_with(array) {
    return array.join("<span>·</span>");
  }
  
  
