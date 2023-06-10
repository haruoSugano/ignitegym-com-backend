import { TouchableOpacity } from "react-native";
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { AppNavigatorRoutesApp } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export function Exercise() {
    const navigation = useNavigation<AppNavigatorRoutesApp>();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <VStack flex={1}>
            <VStack px={8} bg="gray.600" pt={10}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color="green.500"
                        size={6}
                    />
                </TouchableOpacity>

                <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
                    <Heading color="gray.100" fontSize="lg" fontFamily="heading" flexShrink={1}>
                        Puxada frontal
                    </Heading>

                    <HStack alignItems="center">
                        <BodySvg />
                        <Text color="gray.200" ml={1} textTransform="capitalize">
                            Costas
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack p={8}>
                    <Image
                        w="full"
                        h={80}
                        source={{ uri: "https://www.pontotel.com.br/wp-content/uploads/2021/12/auxilio-academia.webp" }}
                        alt="Nome do exercícios"
                        mb={3}
                        resizeMode="cover"
                        rounded="lg"
                        overflow="hidden"
                    />

                    <Box bg="gray.600" rounded="md" pb={4} px={4}>
                        <HStack alignItems="center" justifyContent="space-around" mb={5} mt={4}>
                            <HStack>
                                <SeriesSvg />
                                <Text color="gray.200" ml="2">
                                    3 séries
                                </Text>
                            </HStack>

                            <HStack>
                                <RepetionsSvg />
                                <Text color="gray.200" ml="2">
                                    12 repetições
                                </Text>
                            </HStack>
                        </HStack>

                        <Button
                            title="Marcar como realizado"
                        />
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    );
}
