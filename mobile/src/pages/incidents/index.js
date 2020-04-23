import React, { useEffect,useState } from 'react';
import {View,FlatList,Image,Text,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Api from '../../services/api';


import imgLogo from '../../assets/logo.png';
import {Feather} from  '@expo/vector-icons';

import styles from './styles';

export default function Incidents() {

    const [incident,setIncident] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident});
    }

    async function loadIncidents(){

        if (loading){
            return;
        }
        if (total > 0 && total===incident.length){
            return;
        }

        setLoading(true);
        const response = await Api.get('incidents',{
            params:{page}
        });

        
        setIncident([...incident,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
        
    }

    useEffect(()=>{
        loadIncidents();
    },[]);


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={imgLogo}/>
                <Text style={styles.headerText}>
                    Total de casos:<Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList
                data={incident}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident})=>(<View style={styles.Incident}>
                    <Text style={styles.IncidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.IncidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                    
                    <Text style={styles.IncidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',
                        {style:'currency',currency:'BRL'})
                        .format(incident.value)}
                    </Text>

                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={()=>navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>
            )}
            />
      
        </View>
    );
}
