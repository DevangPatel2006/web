import { Clock, Users, Trophy, Briefcase, Zap, Star } from 'lucide-react';

const highlights = [
  {
    icon: Clock,
    title: '36 Hours',
    description: 'Non-stop coding marathon',
  },
  {
    icon: Users,
    title: '500+ Hackers',
    description: 'From across India',
  },
  {
    icon: Trophy,
    title: '₹5L+ Prizes',
    description: 'In cash and goodies',
  },
  {
    icon: Briefcase,
    title: 'Top Mentors',
    description: 'Industry experts guidance',
  },
  {
    icon: Zap,
    title: 'Fast Track',
    description: 'Internship opportunities',
  },
  {
    icon: Star,
    title: 'Swag & Goodies',
    description: 'For all participants',
  },
];

export const HighlightsSection = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block font-display text-sm tracking-[0.3em] text-primary mb-3">
            WHY JOIN US
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wider">
            EVENT <span className="text-gradient-neon">HIGHLIGHTS</span>
          </h2>
        </div>

        {/* Highlights - Clean Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-card/20 border border-border/20 backdrop-blur-sm hover:border-primary/40 hover:bg-card/40 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center group-hover:shadow-glow-cyan transition-all duration-300">
                <item.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-display text-sm font-bold tracking-wider text-foreground text-center">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
