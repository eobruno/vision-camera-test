import React from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { useEffect, useState } from "react";
import {
    Camera,
    useCameraDevices,
    useCameraDevice,
    CameraPosition,
    useFrameProcessor,
} from "react-native-vision-camera";


const Home = () => {
    const [texto, setTexto] = useState("teste");

    const devices = Camera.getAvailableCameraDevices();
    const device = devices.find((d) => d.position === "back");

    useEffect(() => {
        async function getPermission() {
            const permission = await Camera.requestCameraPermission();
            console.log(`Camera permission status: ${permission}`);
            if (permission === "denied") await Linking.openSettings();
        }
        getPermission();
    }, []);


    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)

    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 45, fontWeight: "700", color: "#1919ff" }}>
                {texto}
            </Text>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
            />
        </View>
    )
}

export default Home;