import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit3 } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(res => {
      setIncidents(res.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  const history = useHistory();

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  async function handleEdit(incident) {
    console.log(incident);

    localStorage.setItem('incidentId', incident.id);
    localStorage.setItem('incidentTitle', incident.title);
    localStorage.setItem('incidentDescription', incident.description);
    localStorage.setItem('incidentValue', incident.value);

    history.push('/incidents/edit')
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>
        
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>
      
      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
            
            <button type="button">
              <FiEdit3 onClick={() => handleEdit(incident)} className="editButton" size={20} color="#a8a8b3"/>
            </button>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
