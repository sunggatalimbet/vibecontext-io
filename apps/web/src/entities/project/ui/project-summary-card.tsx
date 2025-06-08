/**
 * @file: project-summary-card.tsx
 * @description: Bento Grid Project Summary Card component for displaying comprehensive project analysis
 * @dependencies: summarySchema types, Lucide React icons
 * @created: 2025-01-07
 */

import { type DeepPartial } from 'ai'
import {
  Target,
  Users,
  Star,
  CheckCircle,
  TrendingUp,
  Calendar,
  Smartphone,
  BarChart3,
  Lightbulb,
  Award,
  Zap,
  Shield,
  Clock,
  AlertTriangle,
  Globe,
  Monitor,
} from 'lucide-react'
import { type z } from 'zod'
import { type summarySchema } from '@/lib/schemas'

interface ProjectSummaryCardProps {
  summary: DeepPartial<z.infer<typeof summarySchema>>
}

const PlatformIcon = ({ platform }: { platform?: string }) => {
  switch (platform) {
    case 'Mobile':
      return <Smartphone className="w-4 h-4 text-accent-foreground" />
    case 'Web':
      return <Globe className="w-4 h-4 text-accent-foreground" />
    case 'Desktop':
      return <Monitor className="w-4 h-4 text-accent-foreground" />
    default:
      return <Smartphone className="w-4 h-4 text-accent-foreground" />
  }
}

export const ProjectSummaryCard = ({ summary }: ProjectSummaryCardProps) => {
  const {
    appOverview,
    targetUsers,
    coreFeatures,
    technicalApproach,
    mvpScope,
    futureConsiderations,
  } = summary

  if (!appOverview?.projectName) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-min">
          <div className="col-span-1 md:col-span-4 lg:col-span-6 bg-gradient-to-br from-muted via-muted/90 to-muted/70 rounded-2xl p-8 text-center">
            <div className="text-muted-foreground">
              Generating project summary...
            </div>
          </div>
        </div>
      </div>
    )
  }

  const highPriorityFeatures =
    coreFeatures?.filter(f => f?.priority === 'High') || []
  const primaryUser = targetUsers?.[0]

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-min">
        {/* Header Cell - Full Width */}
        <div className="col-span-1 md:col-span-4 lg:col-span-6 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/50 rounded-2xl p-8 text-primary-foreground relative overflow-hidden border border-border/20">
          {/* Subtle pattern overlay for texture */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-foreground/5 via-transparent to-primary-foreground/10 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary-foreground/20 backdrop-blur-sm p-4 rounded-full">
                <Award className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4 drop-shadow-sm">
              {appOverview.projectName}
            </h1>
            <p className="text-xl text-center text-primary-foreground/90 max-w-4xl mx-auto mb-6 leading-relaxed drop-shadow-sm">
              {appOverview.purpose}
            </p>
            {primaryUser && (
              <div className="flex items-center justify-center text-primary-foreground/90 drop-shadow-sm">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-medium">{primaryUser.primary}</span>
              </div>
            )}
          </div>
        </div>

        {/* Core Value Cell - Large */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center mb-4">
            <Target className="w-7 h-7 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-card-foreground">
              Core Value
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Main Benefit
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {appOverview.coreValue}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Usage Context
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {appOverview.usageContext}
              </p>
            </div>
            {primaryUser?.techComfort && (
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-foreground">
                    Tech Comfort
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {primaryUser.techComfort}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Target user capability
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Technical Approach Cell - Large */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-secondary rounded-2xl p-6 border border-border">
          <div className="flex items-center mb-4">
            <Smartphone className="w-7 h-7 text-accent-foreground mr-3" />
            <h2 className="text-2xl font-bold text-secondary-foreground">
              Technical Strategy
            </h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Platform
                  </span>
                  <PlatformIcon
                    platform={technicalApproach?.platform?.primary}
                  />
                </div>
                <p className="text-lg font-bold text-foreground">
                  {technicalApproach?.platform?.primary || 'Web'}
                </p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Auth Required
                  </span>
                  <Shield className="w-4 h-4 text-accent-foreground" />
                </div>
                <p className="text-lg font-bold text-foreground">
                  {technicalApproach?.authentication?.required ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
            {technicalApproach?.platform?.specialRequirements &&
              technicalApproach.platform.specialRequirements.length > 0 && (
                <div>
                  <h3 className="font-semibold text-secondary-foreground mb-2">
                    Special Requirements
                  </h3>
                  <ul className="space-y-2">
                    {technicalApproach.platform.specialRequirements
                      .slice(0, 2)
                      .map((req, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <CheckCircle className="w-4 h-4 text-accent-foreground mr-2 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
          </div>
        </div>

        {/* Feature Cards - 3 Medium Cells */}
        {highPriorityFeatures.slice(0, 3).map((feature, index) => {
          if (!feature) return null
          return (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-2 bg-card rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center mb-3">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  {index === 0 && <Star className="w-5 h-5 text-primary" />}
                  {index === 1 && <Zap className="w-5 h-5 text-primary" />}
                  {index === 2 && (
                    <BarChart3 className="w-5 h-5 text-primary" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-card-foreground">
                  {feature.featureName}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>
              {feature.userStories && feature.userStories[0] && (
                <div className="bg-secondary rounded-lg p-3 border border-border">
                  <p className="text-secondary-foreground text-sm font-medium italic">
                    {feature.userStories[0]}
                  </p>
                </div>
              )}
            </div>
          )
        })}

        {/* Fill empty slots if less than 3 high priority features */}
        {highPriorityFeatures.length < 3 && coreFeatures && (
          <>
            {coreFeatures
              .filter(f => f?.priority !== 'High')
              .slice(0, 3 - highPriorityFeatures.length)
              .map((feature, index) => {
                if (!feature) return null
                const actualIndex = highPriorityFeatures.length + index
                return (
                  <div
                    key={`medium-${index}`}
                    className="col-span-1 md:col-span-2 lg:col-span-2 bg-muted rounded-2xl p-6 border border-border"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-muted-foreground/10 p-2 rounded-lg mr-3">
                        {actualIndex === 0 && (
                          <Star className="w-5 h-5 text-muted-foreground" />
                        )}
                        {actualIndex === 1 && (
                          <Zap className="w-5 h-5 text-muted-foreground" />
                        )}
                        {actualIndex === 2 && (
                          <BarChart3 className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        {feature.featureName}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    {feature.userStories && feature.userStories[0] && (
                      <div className="bg-background rounded-lg p-3 border border-border">
                        <p className="text-foreground text-sm font-medium italic">
                          {feature.userStories[0]}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
          </>
        )}

        {/* MVP Scope Cell - Medium */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-accent rounded-2xl p-6 border border-border">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-7 h-7 text-accent-foreground mr-3" />
            <h2 className="text-2xl font-bold text-accent-foreground">
              MVP Essentials
            </h2>
          </div>
          <div className="space-y-4">
            {mvpScope?.mustHave && mvpScope.mustHave.length > 0 && (
              <div>
                <h3 className="font-semibold text-accent-foreground mb-3">
                  Must-Have Features
                </h3>
                <div className="space-y-2">
                  {mvpScope.mustHave.slice(0, 3).map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-background rounded-lg p-3 border border-border"
                    >
                      <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Development Phase
                </span>
                <span className="text-2xl font-bold text-primary">MVP</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Ready for validation
              </p>
            </div>
          </div>
        </div>

        {/* Success Metrics Cell - Medium */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-7 h-7 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-card-foreground">
              Success Metrics
            </h2>
          </div>
          <div className="space-y-3">
            {mvpScope?.successCriteria &&
            mvpScope.successCriteria.length > 0 ? (
              mvpScope.successCriteria.slice(0, 3).map((criteria, index) => (
                <div
                  key={index}
                  className="bg-secondary rounded-lg p-4 border border-border"
                >
                  <div className="flex items-start">
                    <TrendingUp className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-secondary-foreground text-sm leading-relaxed">
                      {criteria}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <div className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-foreground text-sm leading-relaxed">
                    Success metrics to be defined
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Future Vision Cell - Small */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-secondary rounded-2xl p-6 border border-border">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-accent-foreground mr-3" />
            <h2 className="text-xl font-bold text-secondary-foreground">
              Future Vision
            </h2>
          </div>
          <div className="space-y-3">
            {futureConsiderations && futureConsiderations.length > 0 ? (
              futureConsiderations.slice(0, 3).map((consideration, index) => (
                <div
                  key={index}
                  className="flex items-start bg-background rounded-lg p-3 border border-border"
                >
                  <Calendar className="w-4 h-4 text-accent-foreground mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">
                    {consideration}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-start bg-background rounded-lg p-3 border border-border">
                <Calendar className="w-4 h-4 text-accent-foreground mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-foreground text-sm">
                  Future features to be planned
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Platform Details Cell - Small */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-muted rounded-2xl p-6 border border-border">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-xl font-bold text-foreground">
              Platform Details
            </h2>
          </div>
          <div className="space-y-3">
            <div className="bg-background rounded-lg p-3 border border-border">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Responsive
              </div>
              <div className="text-lg font-bold text-primary">
                {technicalApproach?.platform?.responsive ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-border">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Offline Support
              </div>
              <div className="text-lg font-bold text-primary">
                {technicalApproach?.platform?.offline ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>

        {/* Constraints Cell - Small */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-destructive/5 rounded-2xl p-6 border border-border">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive mr-3" />
            <h2 className="text-xl font-bold text-foreground">
              Key Constraints
            </h2>
          </div>
          <div className="space-y-2">
            {mvpScope?.constraints && mvpScope.constraints.length > 0 ? (
              mvpScope.constraints.slice(0, 3).map((constraint, index) => (
                <div
                  key={index}
                  className="flex items-start bg-background rounded-lg p-3 border border-border"
                >
                  <AlertTriangle className="w-4 h-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{constraint}</span>
                </div>
              ))
            ) : (
              <div className="flex items-start bg-background rounded-lg p-3 border border-border">
                <AlertTriangle className="w-4 h-4 text-destructive mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-foreground text-sm">
                  No major constraints identified
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="mt-8 bg-muted rounded-2xl p-6 border border-border text-center">
        <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto">
          <strong className="text-foreground">{appOverview.projectName}</strong>{' '}
          represents a focused solution for{' '}
          {primaryUser?.primary || 'target users'}
          seeking systematic improvement. With a{' '}
          {technicalApproach?.platform?.primary?.toLowerCase() || 'web'}-first
          approach and emphasis on interactive experience, this MVP targets a
          proven market need with clear success metrics and a strong foundation
          for future growth.
        </p>
      </div>
    </div>
  )
}
