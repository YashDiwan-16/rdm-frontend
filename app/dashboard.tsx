import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Dashboard</ThemedText>
        <ThemedText style={styles.subtitle}>
          Welcome to RDM Moodverse! Goal management features coming soon.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.light.primary,
    marginBottom: 16,
  },
  subtitle: {
    color: Colors.light.primary,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
});
