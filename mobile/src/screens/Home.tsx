import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Heading, VStack, Text } from "native-base";

import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { AppNavigatorRoutesApp } from "@routes/app.routes";

export function Home() {
    const [groups, setGroups] = useState(["Costas", "Biceps", "Triceps", "Ombro"]);
    const [exercises, setExercises] = useState(["Puxada frontal", "Remada curvada", "Remada unilateral", "Levantamento peso"]);
    const [groupSelected, setGroupSelected] = useState("costa");

    const navigation = useNavigation<AppNavigatorRoutesApp>();

    function handleOpenExerciseDetails() {
        navigation.navigate("exercise");
    }

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={String(groupSelected).toLocaleUpperCase() === String(item).toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxH={10}
                minH={10}
            />

            <VStack flex={1} px={8}>
                <HStack justifyContent="space-between" mb={5}>
                    <Heading color="gray.200" fontSize="md" fontFamily="heading">
                        Exercicios
                    </Heading>

                    <Text color="gray.200" fontSize="sm">
                        4
                    </Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard 
                            onPress={handleOpenExerciseDetails}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom: 20 }}
                />
            </VStack>
        </VStack>
    );
}
