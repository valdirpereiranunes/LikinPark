import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import AuthForm from "../components/auth/AuthForm";
import AuthInput from "../components/auth/AuthInput";
import LoadingButton from "../components/ui/LoadingButton";
import api from "../services/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidEmail = (value: string) => {
        const trimmed = value.trim();
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(trimmed);
    };

    const handleRegister = async () => {
        const nomeTrim = nome.trim();
        const emailTrim = email.trim();

        if (!nomeTrim || !emailTrim || !senha) {
            return Alert.alert("Atenção", "Preencha todos os campos");
        }

        if (!isValidEmail(emailTrim)) {
            return Alert.alert("Atenção", "Por favor, insira um email válido");
        }

        setLoading(true);
        try {
            const res = await api.post("/auth/register", {
                nome: nomeTrim,
                email: emailTrim,
                senha: senha,
            });

            if (res.status === 200 || res.status === 201) {
                Alert.alert("Sucesso", "Usuário registrado com sucesso", [
                    { text: "OK", onPress: () => router.replace("/login") },
                ]);
            } else {
                Alert.alert("Erro", res.data?.message || "Falha ao registrar usuário");
            }
        } catch (error: any) {
            Alert.alert(
                "Erro",
                error?.response?.data?.message || "Falha ao conectar com o servidor"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <AuthForm title="Cadastre-se" subtitle="Crie sua conta">
                <AuthInput
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                    keyboardType="default"
                    icon="style"
                />

                <AuthInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    icon="email"
                />

                <AuthInput
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                    icon="lock"
                />

                <LoadingButton title="Registrar" onPress={handleRegister} loading={loading} />
            </AuthForm>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
});
