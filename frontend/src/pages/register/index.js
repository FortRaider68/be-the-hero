import React,{useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

import Api from '../../services/api';


export default function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [city,setcity] = useState('');
    const [uf,setuf] = useState('');
    
    const History = useHistory();

    async function HandleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{
            const response = await Api.post('ongs',data);

            alert(`Seu ID de Acesso: ${response.data.id}`);
            
            History.push('/');
        } catch(err){
             alert(`Erro no cadastro`);
        }
        
      
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={HandleRegister}>
                    <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    />
                    <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    />
                    <input 
                    placeholder="whatsApp"
                    value={whatsapp}
                    onChange={e=>setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={e=> setcity(e.target.value)}
                        />
                        <input 
                        placeholder="UF" 
                        style={{width:80}}
                        value={uf}
                        onChange={e=> setuf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
