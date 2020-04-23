import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './styles.css';

import {FiPower,FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import Api from '../../services/api';

export default function Profile(){
    const [incidents,setIncidents] =  useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const History = useHistory('');

    useEffect(()=>{
        Api.get('profile',{
            headers:{
                Authorization:ongId,
            }
        }).then(Response =>{
            setIncidents(Response.data);
        })
    },[ongId]);

    async function HandleDeleteIncident(id){
        try{
            await Api.delete(`incidents/${id}`,{
                headers:{
                    Authorization:ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao Deletar Caso.')
        }
    }

    function HandleLogout(){
        localStorage.clear();
        History.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda,{ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
                <button onClick={HandleLogout} type="button">
                    <FiPower size={18} color="#E02042"/>
                </button>
            </header>
            <h1>Casos Cadastrados:</h1>
            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>

                    <button onClick={()=>HandleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color='#a8a8b3' />
                    </button>
                </li>
               ))}
            </ul>
        </div>
    );
}