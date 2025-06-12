export interface IAppIdeaSummary {
  appOverview: IAppIdeaSummaryOverview
  targetUsers: IAppIdeaSummaryTargetUsers
  coreFeatures: Array<IAppIdeaSummaryCoreFeature>
  userWorkflow: IAppIdeaSummaryUserWorkflow
  technicalApproach: IAppIdeaSummaryTechnicalApproach
  userExperience: IAppIdeaSummaryUserExperience
  mvpScope: IAppIdeaSummaryMVP
  futureConsiderations: Array<string>
}

export interface IAppIdeaSummaryOverview {
  projectName: string
  purpose: string
  coreValue: string
  usageContext: string
}

export interface IAppIdeaSummaryTargetUsers {
  primary: string
  secondary?: string
  characteristics: Array<string>
  techComfort: string
}

export interface IAppIdeaSummaryCoreFeature {
  featureName: string
  description: string
  userStories: Array<string>
  priority: string
}

export interface IAppIdeaSummaryUserWorkflow {
  primaryActions: Array<string>
  dataInputs: Array<string>
  dataOutputs: Array<string>
  typicalSession: string
}

export interface IAppIdeaSummaryTechnicalApproach {
  authentication: {
    required: boolean
    type: string
    reasoning: string
  }
  dataStorage: {
    persistence: boolean
    location: string
    crossDevice: boolean
    dataRecovery: boolean
  }
  platform: {
    primary: string
    responsive: boolean
    offline: boolean
    specialRequirements: Array<string>
  }
}

export interface IAppIdeaSummaryUserExperience {
  mainScreen: string
  navigation: string
  visualStyle: string
  accessibility: Array<string>
  keyUIPatterns: Array<string>
}

export interface IAppIdeaSummaryMVP {
  mustHave: Array<string>
  wontHave: Array<string>
  constraints: Array<string>
  successCriteria: Array<string>
}
