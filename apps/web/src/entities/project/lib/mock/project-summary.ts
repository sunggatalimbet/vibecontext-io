import { type DeepPartial } from 'ai'
import { type z } from 'zod'
import { type summarySchema } from '@/lib/schemas'

export type MockSummary = DeepPartial<z.infer<typeof summarySchema>>

// No data at all - completely empty
export const noDataMock: MockSummary = {}

// Partial data - only basic app overview
export const partialDataMock: MockSummary = {
  appOverview: {
    projectName: 'FitTracker Pro',
    purpose: 'Help gym enthusiasts track their workouts and progress over time',
    // Missing coreValue and usageContext
  },
  targetUsers: [
    {
      primary: 'Gym enthusiasts',
      // Missing other user details
    },
  ],
}

// Almost all data - missing some optional fields
export const almostCompleteDataMock: MockSummary = {
  appOverview: {
    projectName: 'FitTracker Pro',
    purpose: 'Help gym enthusiasts track their workouts and progress over time',
    coreValue: 'Simplified workout logging with visual progress tracking',
    usageContext:
      'Used during and after gym sessions to log exercises and review progress',
  },
  targetUsers: [
    {
      primary: 'Gym enthusiasts',
      secondary: ['Fitness beginners', 'Personal trainers'],
      characteristics: [
        'Regular gym attendance',
        'Goal-oriented',
        'Tech-savvy',
      ],
      techComfort: 'High',
    },
  ],
  coreFeatures: [
    {
      featureName: 'Workout logging',
      description: 'Log exercises with sets, reps, and weights',
      userStories: ['As a user, I want to quickly log my workout data'],
      priority: 'High',
    },
    {
      featureName: 'Progress tracking',
      description:
        'Visual charts showing strength and performance improvements',
      // Missing userStories
      priority: 'High',
    },
  ],
  technicalApproach: {
    authentication: {
      required: true,
      type: 'Accounts',
      reasoning:
        'User accounts needed to sync data across devices and maintain workout history',
    },
    platform: {
      primary: 'Mobile',
      responsive: true,
      offline: false,
      // Missing specialRequirements
    },
  },
  // Missing mvpScope and futureConsiderations
}

// Full data - complete summary
export const fullDataMock: MockSummary = {
  appOverview: {
    projectName: 'FitTracker Pro',
    purpose: 'Help gym enthusiasts track their workouts and progress over time',
    coreValue: 'Simplified workout logging with visual progress tracking',
    usageContext:
      'Used during and after gym sessions to log exercises and review progress',
  },
  targetUsers: [
    {
      primary: 'Gym enthusiasts',
      secondary: ['Fitness beginners', 'Personal trainers'],
      characteristics: [
        'Regular gym attendance',
        'Goal-oriented',
        'Tech-savvy',
      ],
      techComfort: 'High',
    },
  ],
  coreFeatures: [
    {
      featureName: 'Workout logging',
      description: 'Log exercises with sets, reps, and weights',
      userStories: ['As a user, I want to quickly log my workout data'],
      priority: 'High',
    },
    {
      featureName: 'Progress tracking',
      description:
        'Visual charts showing strength and performance improvements',
      userStories: ['As a user, I want to see my progress over time'],
      priority: 'High',
    },
    {
      featureName: 'Exercise database',
      description: 'Comprehensive library of exercises with instructions',
      userStories: ['As a user, I want to discover new exercises'],
      priority: 'Medium',
    },
  ],
  userWorkflow: {
    primaryActions: [
      'Log workout',
      'View progress',
      'Browse exercise database',
    ],
    dataInputs: ['Exercise type', 'Sets and reps', 'Weight used'],
    dataOutputs: ['Workout history', 'Progress charts', 'Performance metrics'],
    typicalSession:
      'Open app → Select exercise → Input sets/reps/weight → Save workout → Review progress',
  },
  technicalApproach: {
    authentication: {
      required: true,
      type: 'Accounts',
      reasoning:
        'User accounts needed to sync data across devices and maintain workout history',
    },
    dataStorage: {
      persistence: true,
      location: 'Cloud',
      crossDevice: true,
      dataRecovery: true,
    },
    platform: {
      primary: 'Mobile',
      responsive: true,
      offline: false,
      specialRequirements: ['iOS focus initially', 'Apple Health integration'],
    },
  },
  userExperience: {
    mainScreen: "Today's workout with quick-add buttons for common exercises",
    navigation: 'Bottom tab navigation between workout, progress, and profile',
    visualStyle: 'Clean, minimal design with bold colors for CTAs',
    accessibility: ['Large touch targets', 'High contrast mode'],
    keyUIPatterns: ['Input forms', 'Progress charts', 'Exercise library'],
  },
  mvpScope: {
    mustHave: [
      'Basic workout logging',
      'Exercise database',
      'Simple progress charts',
    ],
    wontHave: ['Social features', 'Advanced analytics', 'Meal tracking'],
    constraints: ['iOS only', 'Limited exercise categories'],
    successCriteria: [
      '100 active users within first month',
      'Average 3 workouts logged per user',
    ],
  },
  futureConsiderations: [
    'Android version',
    'Social sharing features',
    'Advanced workout plans',
  ],
}

export const mockDataStates = {
  noData: noDataMock,
  partial: partialDataMock,
  almostComplete: almostCompleteDataMock,
  full: fullDataMock,
} as const

export type MockDataState = keyof typeof mockDataStates
