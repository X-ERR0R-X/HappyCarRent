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

interface Loja {
    id: number;
    nome: string;
    descricao: string;
    technicalData: string;
    imagem: string;
}


const Lojas: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState<Loja | null>(null);
    const [ Lojas, setLojas ] = useState<Loja[]>([])

    useEffect(() => {
        const fetchLojas = async () => {
            try {
                const response = await fetch('http://localhost:3000/lojas');
                const data = await response.json();
                setLojas(data);
            } catch (error) {
                console.error('Erro a buscar as lojas:', error);
            }
        };
        fetchLojas();
    }, []);


    const handleOpenModal = (store: Loja) => {
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
                    <IonTitle>Lojas</IonTitle>
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
                            <IonRow><IonLabel>{selectedStore.descricao}</IonLabel></IonRow>
                            <IonRow><IonLabel> {selectedStore.technicalData}</IonLabel></IonRow>
                            <IonRow><IonButton onClick={handleExitModal} color={'red'}>Sair</IonButton></IonRow>
                        </IonContent>
                    </IonModal>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Lojas