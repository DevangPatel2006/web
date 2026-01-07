import { Code, Lightbulb, Cpu, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tracks = [
  {
    icon: Code,
    title: 'CodeVerse',
    subtitle: 'Software & AI',
    color: 'cyan',
  },
  {
    icon: Lightbulb,
    title: 'IdeaVerse',
    subtitle: 'Startup & Innovation',
    color: 'magenta',
  },
  {
    icon: Cpu,
    title: 'TechnoVerse',
    subtitle: 'Hardware & IoT',
    color: 'purple',
  },
];

export const TracksSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block font-display text-sm tracking-[0.3em] text-primary mb-3">
            CHOOSE YOUR PATH
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wider">
            <span className="text-gradient-neon">HACKATHON</span> TRACKS
          </h2>
        </div>

        {/* Tracks - Horizontal Pills */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-10">
          {tracks.map((track, index) => (
            <div
              key={track.title}
              className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
                track.color === 'cyan'
                  ? 'bg-primary/5 border-primary/30 hover:border-primary hover:bg-primary/10'
                  : track.color === 'magenta'
                  ? 'bg-accent/5 border-accent/30 hover:border-accent hover:bg-accent/10'
                  : 'bg-secondary/5 border-secondary/30 hover:border-secondary hover:bg-secondary/10'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  track.color === 'cyan'
                    ? 'bg-primary/20 text-primary group-hover:shadow-glow-cyan'
                    : track.color === 'magenta'
                    ? 'bg-accent/20 text-accent group-hover:shadow-glow-magenta'
                    : 'bg-secondary/20 text-secondary group-hover:shadow-glow-purple'
                }`}
              >
                <track.icon className="w-5 h-5" />
              </div>

              {/* Title */}
              <div>
                <h3 className="font-display text-lg font-bold tracking-wider text-foreground">
                  {track.title}
                </h3>
                <p className={`font-display text-xs tracking-wider ${
                  track.color === 'cyan'
                    ? 'text-primary'
                    : track.color === 'magenta'
                    ? 'text-accent'
                    : 'text-secondary'
                }`}>
                  {track.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="text-center">
          <Button variant="neon" className="group">
            Learn More
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
