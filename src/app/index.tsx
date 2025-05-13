import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { useAuth } from '../app/contexts/authContext';

const VALID_USERS = [
  { email: 'ddm@gmail.com', password: '123456' },
  { email: 'aluno@gmail.com', password: '123456' },
  { email: 'professor@gmail.com', password: '123456' }
];

const MAX_LOGIN_ATTEMPTS = 3;

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
});

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  function handleSubmit() {
    if (isBlocked) {
      setErrorMsg('Muitas tentativas. Tente novamente mais tarde.');
      return;
    }

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrorMsg(result.error.errors[0].message);
      return;
    }

    const user = VALID_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      login(email);
      router.push('/profile');
    } else {
      setLoginAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          setIsBlocked(true);
          setTimeout(() => {
            setIsBlocked(false);
            setLoginAttempts(0);
          }, 30000); // 30 segundos de bloqueio
        }
        return newAttempts;
      });
      setErrorMsg(`Email ou senha incorretos. Tentativas restantes: ${MAX_LOGIN_ATTEMPTS - loginAttempts - 1}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMsg !== '' && <Text style={styles.error}>{errorMsg}</Text>}

        <TouchableOpacity 
          style={[styles.loginButton, isBlocked && styles.disabledButton]} 
          onPress={handleSubmit}
          disabled={isBlocked}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>Dica: Usuários válidos para teste:</Text>
        <Text style={styles.hint}>ddm@gmail.com</Text>
        <Text style={styles.hint}>aluno@gmail.com</Text>
        <Text style={styles.hint}>professor@gmail.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: { 
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15, 
    padding: 12,
    backgroundColor: 'white'
  },
  title: { 
    fontSize: 32, 
    marginBottom: 10, 
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666'
  },
  error: { 
    color: '#ff3333', 
    marginBottom: 15,
    textAlign: 'center'
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20
  },
  disabledButton: {
    backgroundColor: '#ccc'
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  hint: {
    color: '#666',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5
  }
});
