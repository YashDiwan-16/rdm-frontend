import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Goal {
  id: string;
  title: string;
  completed: boolean;
  roadmap?: string[];
}

interface TokenWallet {
  name: string;
  balance: number;
  color: string;
}

export default function DashboardScreen() {
  const [customGoalName, setCustomGoalName] = useState('');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showRoadmap, setShowRoadmap] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('');
  
  const [wallets] = useState<TokenWallet[]>([
    { name: 'Base Purse', balance: 150, color: Colors.light.accent },
    { name: 'Reward Purse', balance: 75, color: Colors.light.success },
  ]);

  const suggestedGoals = [
    { id: '1', title: '10 min meditation', icon: '🧘‍♀️' },
    { id: '2', title: 'Drink 2L water', icon: '💧' },
    { id: '3', title: 'Read 20 pages', icon: '📚' },
    { id: '4', title: 'Walk 5000 steps', icon: '🚶‍♀️' },
    { id: '5', title: 'Practice gratitude', icon: '🙏' },
    { id: '6', title: '30 min workout', icon: '💪' },
  ];

  const addGoalFromDropdown = (goalTitle: string) => {
    const roadmap = generateRoadmap(goalTitle);
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goalTitle,
      completed: false,
      roadmap,
    };
    setGoals(prev => [...prev, newGoal]);
    setSelectedGoal('');
    setShowDropdown(false);
    
    Alert.alert('Goal Added!', `"${goalTitle}" has been added to your goals.`);
  };

  const generateRoadmap = (goalName: string): string[] => {
    const roadmaps: { [key: string]: string[] } = {
      'meditation': [
        'Find a quiet space',
        'Start with 5 minutes daily',
        'Focus on breathing',
        'Use meditation apps',
        'Increase to 10 minutes'
      ],
      'water': [
        'Get a water bottle',
        'Set hourly reminders',
        'Drink water when you wake up',
        'Track your daily intake',
        'Add lemon for variety'
      ],
      'exercise': [
        'Set a workout time',
        'Start with 15 minutes',
        'Track your progress',
        'Gradually increase intensity',
        'Rest between workout days'
      ],
      'reading': [
        'Choose an interesting book',
        'Read for 30 minutes daily',
        'Find a comfortable spot',
        'Take notes of key points',
        'Discuss with others'
      ],
      'default': [
        'Define your objective clearly',
        'Break into smaller tasks',
        'Set a realistic timeline',
        'Track daily progress',
        'Celebrate small wins'
      ]
    };

    const lowerGoal = goalName.toLowerCase();
    if (lowerGoal.includes('meditat')) return roadmaps.meditation;
    if (lowerGoal.includes('water') || lowerGoal.includes('drink')) return roadmaps.water;
    if (lowerGoal.includes('exercise') || lowerGoal.includes('workout')) return roadmaps.exercise;
    if (lowerGoal.includes('read') || lowerGoal.includes('book')) return roadmaps.reading;
    return roadmaps.default;
  };

  const createCustomGoal = () => {
    if (!customGoalName.trim()) {
      Alert.alert('Error', 'Please enter a goal name');
      return;
    }

    const roadmap = generateRoadmap(customGoalName);
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: customGoalName,
      completed: false,
      roadmap,
    };

    setGoals(prev => [...prev, newGoal]);
    setShowRoadmap(newGoal.id);
    setCustomGoalName('');
  };

  const completeGoal = (goalId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: true } : goal
    ));

    const tokensEarned = Math.floor(Math.random() * 20) + 10;
    
    Alert.alert('Goal Completed!', `You earned ${tokensEarned} tokens!`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>RDM Moodverse</ThemedText>
          <ThemedText style={styles.subtitle}>Your mindful journey</ThemedText>
        </View>

        {/* Token Portfolio */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Token Portfolio</ThemedText>
          <View style={styles.portfolioCards}>
            {wallets.map((wallet, index) => (
              <View key={index} style={styles.portfolioCard}>
                <ThemedText style={styles.portfolioLabel}>{wallet.name}</ThemedText>
                <ThemedText style={styles.portfolioBalance}>{wallet.balance}</ThemedText>
                <ThemedText style={styles.portfolioUnit}>tokens</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Suggested Goals Dropdown */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Mindful Goals</ThemedText>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={styles.dropdownButton}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <ThemedText style={styles.dropdownButtonText}>
                {selectedGoal || 'Select a mindful goal'}
              </ThemedText>
              <ThemedText style={styles.dropdownArrow}>
                {showDropdown ? '▲' : '▼'}
              </ThemedText>
            </TouchableOpacity>
            
            {showDropdown && (
              <View style={styles.dropdownList}>
                {suggestedGoals.map((goal) => (
                  <TouchableOpacity
                    key={goal.id}
                    style={styles.dropdownItem}
                    onPress={() => addGoalFromDropdown(goal.title)}
                  >
                    <ThemedText style={styles.goalEmoji}>{goal.icon}</ThemedText>
                    <ThemedText style={styles.dropdownItemText}>{goal.title}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Custom Goal Creation */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Create Custom Goal</ThemedText>
          <View style={styles.formCard}>
            <ThemedText style={styles.inputLabel}>Goal Description</ThemedText>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your personal goal"
              placeholderTextColor="#999"
              value={customGoalName}
              onChangeText={setCustomGoalName}
              multiline
            />
            <TouchableOpacity style={styles.primaryButton} onPress={createCustomGoal}>
              <ThemedText style={styles.primaryButtonText}>Create Goal</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Goals */}
        {goals.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Your Goals ({goals.length})</ThemedText>
            {goals.map((goal) => (
              <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <ThemedText style={[styles.goalTitle, goal.completed && styles.goalCompleted]}>
                    {goal.title}
                  </ThemedText>
                  {goal.completed && (
                    <View style={styles.completedBadge}>
                      <ThemedText style={styles.completedBadgeText}>✓</ThemedText>
                    </View>
                  )}
                </View>
                
                {/* Roadmap */}
                {showRoadmap === goal.id && goal.roadmap && (
                  <View style={styles.roadmapContainer}>
                    <ThemedText style={styles.roadmapHeader}>Roadmap:</ThemedText>
                    {goal.roadmap.map((step, index) => (
                      <View key={index} style={styles.roadmapStep}>
                        <View style={styles.stepIndicator}>
                          <ThemedText style={styles.stepNumber}>{index + 1}</ThemedText>
                        </View>
                        <ThemedText style={styles.stepText}>{step}</ThemedText>
                      </View>
                    ))}
                  </View>
                )}
                
                <View style={styles.goalActions}>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => setShowRoadmap(showRoadmap === goal.id ? null : goal.id)}
                  >
                    <ThemedText style={styles.secondaryButtonText}>
                      {showRoadmap === goal.id ? 'Hide' : 'Show'} Roadmap
                    </ThemedText>
                  </TouchableOpacity>
                  
                  {!goal.completed && (
                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={() => completeGoal(goal.id)}
                    >
                      <ThemedText style={styles.primaryButtonText}>Complete</ThemedText>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  
  // Header
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
    textAlign: 'center',
  },

  // Section
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.primary,
    marginBottom: 16,
  },

  // Portfolio
  portfolioCards: {
    flexDirection: 'row',
    gap: 16,
  },
  portfolioCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.light.lightBlue,
    shadowColor: Colors.light.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  portfolioLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.icon,
    marginBottom: 8,
  },
  portfolioBalance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 4,
  },
  portfolioUnit: {
    fontSize: 12,
    color: Colors.light.icon,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Suggested Goals
  horizontalList: {
    paddingRight: 24,
  },
  
  // Dropdown Styles
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdownButton: {
    height: 56,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.light.lightBlue,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.light.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 16,
    color: Colors.light.icon,
    fontWeight: 'bold',
  },
  dropdownList: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.lightBlue,
    shadowColor: Colors.light.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1001,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  goalEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: '500',
    flex: 1,
  },

  // Form
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 2,
    borderColor: Colors.light.lightBlue,
    shadowColor: Colors.light.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
    marginBottom: 8,
  },
  textInput: {
    height: 56,
    borderWidth: 2,
    borderColor: Colors.light.lightBlue,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: Colors.light.primary,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  // Buttons
  primaryButton: {
    height: 56,
    backgroundColor: Colors.light.accent,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryButton: {
    height: 48,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    flex: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
  },

  // Goals
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.light.lightBlue,
    shadowColor: Colors.light.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.primary,
    flex: 1,
  },
  goalCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.light.icon,
  },
  completedBadge: {
    backgroundColor: Colors.light.success,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  completedBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Roadmap
  roadmapContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  roadmapHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
    marginBottom: 12,
  },
  roadmapStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.icon,
    lineHeight: 20,
  },

  // Goal Actions
  goalActions: {
    flexDirection: 'row',
    gap: 12,
  },

  // Bottom padding
  bottomPadding: {
    height: 40,
  },
});