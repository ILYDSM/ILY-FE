import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from 'react-native-modal'
import CustomButton from "./CustomButton";

interface PrposType{
    IsOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    title?: string;
}

export default function CustomModal({ IsOpen, setIsOpen, children, title }:PrposType){
    function closeModal(){
        setIsOpen(false);
    }
    
    return(
        <Modal
        hasBackdrop
        backdropOpacity={0.25}
        isVisible={IsOpen}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        onSwipeComplete={closeModal}
        backdropTransitionInTiming={150}
        backdropTransitionOutTiming={150}
        style={style.backdrop}
        >
            <View style={{flex:1}}/>
            <View style={style.modal}>
                <View style={style.modalHandleContainer}>
                    <View style={style.modalHandle}/>
                </View>
                {title && <Text style={style.title}>{title}</Text>}
                {children}
                <CustomButton title="닫기" color="Gray" onPress={closeModal}/>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
    modal:{
        backgroundColor:'white',
        padding: 16,
        borderRadius: 20,
        width: '100%',
        display: 'flex',
        gap: 12,
    },
    modalHandle:{
        width:40,
        height:8,
        backgroundColor:'#E6E6E6',
        borderRadius:99,

    },
    modalHandleContainer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    title:{
        width: '100%',
        fontSize: 28,
        fontWeight: '700',
    },
    backdrop:{
        margin: 8,
        display: "flex",
        alignItems: 'flex-end',
        flexDirection:'column',
    }
})