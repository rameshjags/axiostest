import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';

const DashboardScreen = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user.profile_image && (
        <Image
          source={{ uri: user.profile_image }}
          style={styles.profileImage}
        />
      )}

      <Text style={styles.title}>
        Welcome, {user.first_name} {user.last_name}!
      </Text>

      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Phone: {user.phone_number}</Text>
      <Text style={styles.info}>Company: {user.company_name}</Text>
      <Text style={styles.info}>Job Title: {user.job_title}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} color="#ff4444" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default DashboardScreen;