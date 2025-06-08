import { z } from 'zod'

export const summarySchema = z.object({
  appOverview: z.object({
    projectName: z.string().min(1),
    purpose: z
      .string()
      .min(1)
      .describe('Brief description of problem being solved'),
    coreValue: z.string().min(1).describe('Main benefit to users'),
    usageContext: z.string().min(1).describe('When/where users will use app'),
  }),
  targetUsers: z.array(
    z.object({
      primary: z.string().min(1).describe('Main user type/persona'),
      secondary: z
        .array(z.string())
        .optional()
        .describe('Array of secondary users type/persona'),
      characteristics: z
        .array(z.string().min(1))
        .describe('Array of user traits/behaviors'),
      techComfort: z.enum(['Low', 'Medium', 'High']),
    })
  ),
  coreFeatures: z.array(
    z.object({
      featureName: z.string().min(1),
      description: z.string().min(1),
      userStories: z.array(z.string().min(1)),
      priority: z.enum(['Low', 'Medium', 'High']),
    })
  ),
  userWorkflow: z.object({
    primaryActions: z
      .array(z.string().min(1))
      .describe('Array of 2-3 main user actions'),
    dataInputs: z
      .array(z.string().min(1))
      .describe('Array of information user provides'),
    dataOutputs: z
      .array(z.string().min(1))
      .describe('Array of what app gives back to user'),
    typicalSession: z.string().min(1).describe('Step-by-step user flow'),
  }),
  technicalApproach: z.object({
    authentication: z.object({
      required: z.boolean(),
      type: z.enum(['Anonymous', 'Accounts', 'Social']),
      reasoning: z
        .string()
        .describe('Explanation of authentication type selected'),
    }),
    dataStorage: z.object({
      persistence: z.boolean().describe('save between sessions'),
      location: z.enum(['Local', 'Cloud', 'Hybrid']),
      crossDevice: z.boolean(),
      dataRecovery: z.boolean(),
    }),
    platform: z.object({
      primary: z.enum(['Mobile', 'Web', 'Desktop']),
      responsive: z.boolean(),
      offline: z.boolean(),
      specialRequirements: z
        .array(z.string().min(1))
        .describe('Array of any special needs'),
    }),
  }),
  userExperience: z.object({
    mainScreen: z.string().min(1).describe('What users see first'),
    navigation: z.string().min(1).describe('How users move between sections'),
    visualStyle: z.string().min(1).describe('Design aesthetics'),
    accessibility: z
      .array(z.string())
      .describe('Array of accessibility requirements'),
    keyUIPatterns: z
      .array(z.string())
      .describe('Array of UI components needed'),
  }),
  mvpScope: z.object({
    mustHave: z
      .array(z.string().min(1))
      .describe('Array of essential features for MVP'),
    wontHave: z
      .array(z.string().min(1))
      .describe('Array of features explicitly out of scope'),
    constraints: z
      .array(z.string().min(1))
      .describe('Array of known limitations'),
    successCriteria: z
      .array(z.string().min(1))
      .describe('Array of how to measure MVP success'),
  }),
  futureConsiderations: z
    .array(z.string().min(1))
    .describe('Array of post-MVP features/implementations'),
})
