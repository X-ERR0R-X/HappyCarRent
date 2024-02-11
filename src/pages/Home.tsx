import {
    IonButton,
    IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonImg,
    IonMenuButton,
    IonPage, IonRow, IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { Geolocation } from '@capacitor/geolocation';
import {
    GoogleMap,
    LoadScript,
    Marker,
} from '@react-google-maps/api';
import { logoIonic } from 'ionicons/icons';
import React, {useEffect, useState} from "react";
import './Home.css';
import { rainySharp } from 'ionicons/icons';
const Home: React.FC = () => {

    const [weather, setWeather] = useState<any>(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [store, setStore] = useState({});

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; 
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
    
        return distance;
    };        

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Obter a posição atual do dispositivo
                const position = await Geolocation.getCurrentPosition();
                const { latitude, longitude } = position.coords;

                // Fazer solicitação para a API de previsão do tempo com base nas coordenadas
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`);
                const data = await response.json();

                // Armazenar os dados da previsão do tempo no estado
                setWeather(data);
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        };

        fetchWeather();
    }, []);
    

return (
    <IonPage>
        <IonHeader translucent={ true }>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Início</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Início</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonImg src="https://mobilidade.estadao.com.br/wp-content/uploads/2020/12/Aluguel-de-carrosFrota-Localiza4.jpg" />

            <div>
                <h2>Lojas</h2>
                <LoadScript googleMapsApiKey="AIzaSyAMcfkuNJPDUzehSoFZBQeXIuGL91jfkvk">
                <GoogleMap
                    mapContainerStyle={{
                        width: '100%',
                        height: '300px',
                    }}
                    center={{ lat: latitude || 0, lng: longitude || 0 }}
                    zoom={15}
                >
                    {/*Viana Do Castelo*/}
                    {latitude && longitude && (
                        <Marker position={{ lat: 41.69170549382038, lng: -8.834516997033361 }} />)}
                    {/*Braga*/}
                    {latitude && longitude && (
                        <Marker position={{ lat: 41.54572316918318, lng: -8.427901896581135 }} />)}
                    {/*Porto*/}
                    {latitude && longitude && (
                        <Marker position={{ lat: 41.15665233670994, lng: -8.637226158590055 }} />)}
                </GoogleMap>
            </LoadScript>
            </div>

            <IonGrid>
            <IonRow>
                <IonCol>
                    <IonText>
                        <p>
                        Cansado das mesmas opções de aluguer de automóveis? A Happy Car Renty está aqui para mudar isso, somos uma empresa que se dedica a proporcionar-lhe uma experiência de aluguer inesquecível e acessível.
                        </p>
                        <IonRow>
                            <IonCol>
                                <IonIcon name="pin-outline"></IonIcon>
                            </IonCol>
                            <IonCol>
                                <IonButton routerLink="./Lojas" color={"red"}>
                                    <IonIcon slot="icon-only" name="map" />
                                    Loja mais próxima
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <IonIcon name="car-outline"></IonIcon>
                            </IonCol>
                            <IonCol>
                                <IonButton routerLink="./Frota" color={"red"}>
                                    <IonIcon slot="icon-only" name="car" />
                                    Novos carros
                                </IonButton>
                            </IonCol>
                        </IonRow>
                            <IonTitle>Ultimas Notícias</IonTitle>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonIcon name="trophy-outline"></IonIcon>
                                        <IonCardTitle>Prêmios Carros</IonCardTitle>
                                        <IonCardSubtitle>
                                            <p>10/01/2024</p>
                                            <p>Opel Corsa</p>
                                            <p>BMW M3</p>
                                            <p>Mercedes c220</p>
                                            <p>Ferrari</p>
                                        </IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonButton className={"sabermais"} fill="clear">Saber Mais</IonButton>
                                </IonCard>
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonIcon name="pricetags-outline"></IonIcon>
                                                <IonCardTitle>Promoção Black Friday</IonCardTitle>
                                                    <IonCardSubtitle>
                                                    <p>20/01/2024</p>
                                                    <p>Aproveite o desconto de Black friday no aluguel de um veículo a sua escolha!</p>
                                        </IonCardSubtitle>
                                    </IonCardHeader>
                                <IonButton className={"sabermais"} fill="clear">Saber Mais</IonButton>
                            </IonCard>
                        </IonText>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
);
};

export default Home;

function setTemperature(temp: any) {
    throw new Error("Function not implemented.");
}
