import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  progress?: number
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'success' | 'warning' | 'outline'
  delay?: number
}

export function StatCard({
  title,
  value,
  description,
  icon,
  progress,
  badge,
  badgeVariant = 'default',
  delay = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden hover:shadow-xl hover:shadow-sky-500/20 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">
            {title}
          </CardTitle>
          {icon && (
            <div className="text-sky-400">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-3xl font-bold text-white">{value}</div>
            {badge && (
              <Badge variant={badgeVariant} className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          {description && (
            <CardDescription className="text-xs">
              {description}
            </CardDescription>
          )}
          {typeof progress === 'number' && (
            <>
              <Separator className="my-3" />
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface StatsGridProps {
  stats: Array<Omit<StatCardProps, 'delay'>>
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} delay={index * 0.1} />
      ))}
    </div>
  )
}
