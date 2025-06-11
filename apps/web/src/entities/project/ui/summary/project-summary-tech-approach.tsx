import { type DeepPartial } from 'ai'
import { CheckCircle, Globe, Monitor, Shield, Smartphone } from 'lucide-react'
import { type z } from 'zod'
import { type summaryTechnicalApproachSchema } from '@/lib/schemas'
import {
  ListItemSkeleton,
  TitleSkeleton,
} from '@/shared/components/skeleton-components'

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

interface ProjectSummaryTechApproachProps {
  technicalApproach:
    | DeepPartial<z.infer<typeof summaryTechnicalApproachSchema>>
    | undefined
}

export const ProjectSummaryTechApproach = ({
  technicalApproach,
}: ProjectSummaryTechApproachProps) => {
  return (
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
              <PlatformIcon platform={technicalApproach?.platform?.primary} />
            </div>
            {technicalApproach?.platform?.primary ? (
              <p className="text-lg font-bold text-foreground">
                {technicalApproach.platform.primary}
              </p>
            ) : (
              <TitleSkeleton className="w-20" />
            )}
          </div>
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Auth Required
              </span>
              <Shield className="w-4 h-4 text-accent-foreground" />
            </div>
            {technicalApproach?.authentication?.required !== undefined ? (
              <p className="text-lg font-bold text-foreground">
                {technicalApproach.authentication.required ? 'Yes' : 'No'}
              </p>
            ) : (
              <TitleSkeleton className="w-12" />
            )}
          </div>
        </div>
        {technicalApproach?.platform?.specialRequirements &&
        technicalApproach.platform.specialRequirements.length > 0 ? (
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
        ) : (
          <div>
            <TitleSkeleton className="mb-2 w-40" />
            <div className="space-y-2">
              <ListItemSkeleton />
              <ListItemSkeleton />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
