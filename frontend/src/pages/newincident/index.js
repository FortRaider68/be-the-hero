import React,{useState} from 'react';
import './styles.css';
import {Link,useHistory} from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

import Api from '../../services/api'

export default function Newincident(){

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const History = useHistory('');

    async function HandleNewIncident(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value,
        }

        try{
            await Api.post('incidents',data,{
               headers:{
                Authorization: ongId,
               }
            });
            History.push('/profile');

        }catch(err){
            alert('Erro ao cadastrar caso.')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={HandleNewIncident}>
                    <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange={e=> setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="Valor em Reais"
                    value={value}
                    onChange={e=> setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}