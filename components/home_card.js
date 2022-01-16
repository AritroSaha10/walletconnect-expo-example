import React from 'react'
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    HStack,
    Stack,
    NativeBaseProvider,
    Button,
    Icon,
} from "native-base"
import { MaterialIcons } from '@expo/vector-icons';

const HomeCard = () => {
    return (
        <Box
            maxW="80"
            rounded="30px"
            overflow="hidden"
            // borderColor="#010024"
            borderWidth="1"
        // backgroundColor= "#010024"
        >
            <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                    <Image source={{ uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg" }} alt="imposter?!" />
                </AspectRatio>
                <HStack justifyContent='space-between' alignItems='center'>
                    <Stack p="4" space={2}>
                        <Heading color="white" size="md" fontFamily="Philosopher-Bold">Las Vegas Trip</Heading>
                        <Text color="white" fontFamily="Philosopher-Normal">0x9144f659c82Fa8esad78fgcg</Text>
                    </Stack>
                    <Button
                        variant="subtle"
                        colorScheme="secondary"
                        leftIcon={
                            <Icon as={MaterialIcons}
                                color="red"
                                name="favorite"
                                size="sm" />
                        }
                    >
                        980
                    </Button>
                </HStack>

            </Box>

        </Box>
    )
}
export default HomeCard