import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

interface AuthFormProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthForm({ title, subtitle, children }: AuthFormProps) {
  return (
      <View style={styles.safeArea}>
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          {children}
        </KeyboardAvoidingView>
      </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: "#1f1212"
  },
  container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 24
  },
  header: {
      marginBottom: 32
  },
  title: {
      fontSize: 36,
      fontWeight: "700",
      color: "#c54b4b",
      textAlign: "center",
      marginBottom: 4
  },
  subtitle: {
      fontSize: 16,
      color: "#ffa0a0",
      textAlign: "center"
  },
});