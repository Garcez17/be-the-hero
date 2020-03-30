import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
  const incidentId = localStorage.getItem('incidentId');
  const incidentTitle = localStorage.getItem('incidentTitle');
  const incidentDescription = localStorage.getItem('incidentDescription');
  const incidentValue = localStorage.getItem('incidentValue');

  const [title, setTitle] = useState(incidentTitle);
  const [description, setDescription] = useState(incidentDescription);
  const [value, setValue] = useState(incidentValue);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  function cleanLS() {
    localStorage.removeItem('incidentId');
    localStorage.removeItem('incidentDescription');
    localStorage.removeItem('incidentTitle');
    localStorage.removeItem('incidentValue');
  }

  async function handleEditIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };
    try {
      const res = await api.put(`incidents/${incidentId}`, data, {
        headers: {
          Authorization: ongId,
        }
      });

      console.log(res)
      cleanLS();

      history.push('/profile')
    } catch (err) {
      alert('Erro ao editar caso, tente novamente')
    }
  }

  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Editar caso: {incidentTitle}</h1>
          <p>Descreva o caso detalhadamente para encontrar o herói para resolver isso.</p>

          <Link onClick={cleanLS} className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleEditIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea type="email" 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Editar</button>
        </form>
      </div>
    </div>
  );
}