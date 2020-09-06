import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  let [repos, setRepos] = useState([]);

  useEffect(()=>{
    api.get('repositories').then( response => {
      setRepos(response.data);
    } )
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:`Repo de teste ${Date.now()}`,
      url: "minha url fake",
      techs: ["ReactJs", "NodeJs"]
    });
    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepos(repos.filter(r=> r.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(r=>{
          return (
            <li key={r.id}>
          {r.title}

          <button onClick={() => handleRemoveRepository(r.id)}>
            Remover
          </button>
        </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
