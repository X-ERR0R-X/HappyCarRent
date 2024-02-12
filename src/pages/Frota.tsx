import React, {ReactNode, useEffect, useState} from 'react';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonList,
    IonItem,
    IonModal,
    IonTitle,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent, IonToolbar, IonSearchbar, IonButton, IonPage, IonLabel, IonMenuButton, IonGrid, IonRow, IonCol,
} from '@ionic/react';
import './Lojas.css';

interface Frota {
    id: number;
    nome: string;
    descricao: string;
    technicalData: string;
    imagem: string;
}


const Frota: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState<Frota | null>(null);
    const [ Lojas, setLojas ] = useState<Frota[]>([])

    useEffect(() => {
        const fetchLojas = async () => {
            try {
                const response = await fetch('http://localhost:3000/frota');
                const data = await response.json();
                setLojas(data);
            } catch (error) {
                console.error('Erro a buscar as lojas:', error);
            }
        };
        fetchLojas();
    }, []);


    const handleOpenModal = (store: Frota) => {
        setSelectedStore(store);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedStore(null);
    };
    const handleExitModal = () => {
        setShowModal(false);
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Frota</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonList>
                    {Lojas.map((store, index) => (
                        <IonItem key={index}>
                            <IonGrid fixed={true}>
                                <IonRow>
                                    <IonCol>
                                        <IonTitle>{store.nome}</IonTitle>
                                        <p>{store.descricao}</p>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton onClick={() => handleOpenModal(store)} color={'red'}>Mais informações</IonButton>
                                        <IonButton routerLink={`/Frota?loja=${store.id}`} color={'red'}>Frota</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    ))}
                </IonList>

                {selectedStore && (
                    <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
                        <IonContent>
                            <IonRow><IonTitle><h2>{selectedStore.nome}</h2></IonTitle></IonRow>
                            <IonRow><IonImg src={selectedStore.imagem}></IonImg></IonRow>
                            <h3>Morada</h3>
                            <IonRow><IonLabel>{selectedStore.descricao}</IonLabel></IonRow>
                            <h3>Descrição</h3>
                            <IonRow><p>{selectedStore.descricao}</p></IonRow>
                            <IonRow><IonLabel>email: {selectedStore.technicalData}</IonLabel></IonRow>
                            <IonRow><IonButton onClick={handleExitModal} color={'red'}>Sair</IonButton></IonRow>
                        </IonContent>
                    </IonModal>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Frota