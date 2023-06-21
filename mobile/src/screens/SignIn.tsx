import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Controller, useForm } from "react-hook-form";

type FormData = {
    email: string,
    password: string,
}

export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    function handleNewAccount() {
        navigation.navigate("signUp");
    }

    function handleSignIn({ email, password }: FormData) {
        console.log(email, password);
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1} px={10}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={24}>
                    <LogoSvg />

                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>

                <Center>
                    <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={6}>
                        Acesse sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: "Informe o e-mail" }}
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: "Informe a senha" }}
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        title="Acessar"
                        onPress={handleSubmit(handleSignIn)}
                    />
                </Center>

                <Center mt={24}>
                    <Text
                        color="gray.100"
                        fontSize="sm"
                        fontFamily="body"
                        mb={3}
                    >
                        Ainda não tem acesso?
                    </Text>

                    <Button
                        title="Criar conta"
                        variant="outline"
                        onPress={handleNewAccount}
                    />
                </Center>

            </VStack>
        </ScrollView>
    );
}
