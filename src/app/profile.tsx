import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../app/contexts/authContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>Bem-vindo!</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.sessionInfo}>Sessão iniciada em: {new Date().toLocaleString()}</Text>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  email: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 20
  },
  sessionInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});
