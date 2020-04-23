import React,{useEffect,useState} from 'react';
import {View,Image,FlatList,Text,TouchableOpacity,Linking } from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';


import Styles from './styles';
import imgLogo from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';


export default function Detail() {
    

    const Navigation = useNavigation();
    const Route = useRoute();

    const incident = Route.params.incident;

    const Message = `Olá ${incident.name},estou entrando em contato para contribuir com o caso "${incident.title}" com o valor de:${Intl.NumberFormat('pt-BR',
    {style:'currency',currency:'BRL'})
    .format(incident.value)}`;

    function navigateBack(){
        Navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject:`Herói do caso:${incident.title}`,
            recipients:[incident.emai],
            body:Message,

        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=&text=${Message}`);

    }

    return(
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Image source={imgLogo}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041"/>
                </TouchableOpacity>
            </View>

            <View style={Styles.incident}>
                     <Text style={[Styles.IncidentProperty,{marginTop:0}]}>ONG:</Text>
                    <Text style={Styles.incidentValue}>{incident.name}</Text>

                    <Text style={Styles.IncidentProperty}>CASO:</Text>
                    <Text style={Styles.incidentValue}>{incident.title}</Text>
                    
                    <Text style={Styles.IncidentProperty}>VALOR:</Text>
                    <Text style={Styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',
                        {style:'currency',currency:'BRL'})
                        .format(incident.value)}
                    </Text>
            </View>

            <View styles={Styles.contactBox}>
                 <Text styles={Styles.heroTitle}>Salve o dia!</Text>
                 <Text styles={Styles.heroTitle}>Seja o herói desse caso.</Text>

                 <Text styles={Styles.heroTitle}>Entre em contato:</Text>

                 <View style={Styles.actions}>
                     <TouchableOpacity style={Styles.action} onPress={sendWhatsapp}>
                         <Text style={Styles.actionText}>WhatsApp</Text>
                     </TouchableOpacity>

                     <TouchableOpacity style={Styles.action} onPress={sendMail}>
                         <Text style={Styles.actionText}>E-mail</Text>
                     </TouchableOpacity>
                 </View>
            </View>
        </View>
    );
}