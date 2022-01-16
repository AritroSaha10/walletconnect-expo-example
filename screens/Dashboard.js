import React, { useState, useEffect } from 'react'
import { SafeAreaView, ImageBackground, View, StyleSheet, ScrollView } from 'react-native'
import {
    Icon,
    IconButton,
    NativeBaseProvider,
    Box,
    Text,
    HStack,
    Heading,
    Center,
    VStack,
    Stack,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import AppBar from '../components/app_bar.js'
import HomeCard from '../components/home_card.js'
import BottomNav from '../components/bottom_nav.js'
import Action from '../components/floating_action'

const image = { uri: "https://i.ibb.co/Z88yrNT/Onboarding-Screen-2.png" }

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // make call here
        setData([0, 1, 2, 3, 4])
    });

    return (
        <ImageBackground source={image} style={styles.image}>
            <ScrollView>
                <AppBar />
                <VStack space={3} paddingTop={'20px'}>
                    <HStack justifyContent='space-between' alignItems='center' paddingLeft={'15px'}>
                        <Text color="white" fontSize="40" fontFamily="Philosopher-Bold">Trending</Text>
                        <IconButton paddingRight={'15px'} icon={<Icon size="md" as={<MaterialIcons name='chevron-right' />} color="white" />} />
                    </HStack>
                    <Stack paddingLeft={'15px'} alignItems='center'>
                        <ScrollView horizontal={true}>
                            <HStack space={5}>
                                <HomeCard />
                                <HomeCard />
                            </HStack>
                        </ScrollView>
                    </Stack>
                    <HStack justifyContent='space-between' alignItems='center' paddingLeft={'15px'}>
                        <Text color="white" fontSize="40" fontFamily="Philosopher-Bold">My Collection</Text>
                        <IconButton paddingRight={'15px'} icon={<Icon size="md" as={<MaterialIcons name='chevron-right' />} color="white" />} />
                    </HStack>
                    <Stack paddingLeft={'15px'} alignItems='center'>
                        <ScrollView horizontal={true}>
                            <HStack space={5}>
                                <HomeCard />
                                <HomeCard />
                            </HStack>
                        </ScrollView>
                    </Stack>
                </VStack>
            </ScrollView>
            <BottomNav />
            <Action />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
    },
});

export default Dashboard