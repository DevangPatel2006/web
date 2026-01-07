import { useEffect, useRef, useCallback } from 'react';
import { Rocket, UserPlus, ClipboardCheck, Trophy, PartyPopper } from 'lucide-react';

const timelineEvents = [
  { date: 'Feb 1', title: 'Registration Opens', description: 'Start your journey to innovation', icon: UserPlus },
  { date: 'Feb 20', title: 'Registration Closes', description: 'Last chance to join the mission', icon: ClipboardCheck },
  { date: 'Feb 28', title: 'Shortlisting', description: 'Selected teams announced', icon: Rocket },
  { date: 'Mar 14', title: 'Hackathon Begins', description: '36 hours of non-stop coding', icon: PartyPopper },
  { date: 'Mar 15', title: 'Results & Awards', description: 'Celebrate the champions', icon: Trophy },
];

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const endGlowRef = useRef<HTMLDivElement>(null);
  
  // Store progress without causing re-renders
  const progressRef = useRef(0);
  const isCompletedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const updateVisuals = useCallback((progress: number) => {
    // Update progress line with GPU-accelerated transform
    if (progressLineRef.current) {
      progressLineRef.current.style.transform = `scaleY(${progress})`;
    }

    // Calculate active index
    const step = 1 / timelineEvents.length;
    const activeIndex = Math.floor(progress / step);

    // Update nodes and cards
    timelineEvents.forEach((_, index) => {
      const node = nodesRef.current[index];
      const card = cardsRef.current[index];
      const isActive = index <= activeIndex;
      const isCurrentlyReached = index === activeIndex;

      if (node) {
        const innerNode = node.querySelector('.node-inner') as HTMLElement;
        const glowRing = node.querySelector('.glow-ring') as HTMLElement;
        
        if (innerNode) {
          innerNode.style.transform = isCurrentlyReached ? 'scale(1.25)' : 'scale(1)';
          innerNode.style.background = isActive 
            ? 'linear-gradient(135deg, hsl(186 100% 50%), hsl(300 80% 60%))'
            : 'hsl(252 40% 20%)';
          innerNode.style.boxShadow = isActive 
            ? '0 0 20px hsl(186 100% 50% / 0.8), 0 0 40px hsl(186 100% 50% / 0.4)'
            : 'none';
          innerNode.style.borderColor = isActive ? 'hsl(186 100% 70%)' : 'hsl(252 40% 30%)';
        }
        
        if (glowRing) {
          glowRing.style.opacity = isActive ? '1' : '0';
        }
      }

      if (card) {
        card.style.transform = isActive ? 'scale(1)' : 'scale(0.95)';
        card.style.opacity = isActive ? '1' : '0.4';
        card.style.boxShadow = isActive 
          ? '0 0 30px hsl(186 100% 50% / 0.3), 0 0 60px hsl(186 100% 50% / 0.1)' 
          : 'none';
        card.style.borderColor = isActive ? 'hsl(186 100% 50% / 0.5)' : '';
      }
    });

    // Update end glow
    if (endGlowRef.current) {
      const showEnd = progress >= 0.95;
      endGlowRef.current.style.opacity = showEnd ? '1' : '0';
      endGlowRef.current.style.transform = `translateX(-50%) scale(${showEnd ? 1 : 0.5})`;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update on next frame for smooth 60fps
      rafRef.current = requestAnimationFrame(() => {
        if (isCompletedRef.current) return;
        if (!sectionRef.current || !timelineRef.current) return;

        const timelineRect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        
        const startPoint = windowHeight * 0.8;
        const endPoint = windowHeight * 0.2;
        
        let newProgress = progressRef.current;

        if (timelineTop > startPoint) {
          if (progressRef.current === 0) {
            newProgress = 0;
          }
        } else if (timelineTop + timelineHeight < endPoint) {
          newProgress = 1;
          isCompletedRef.current = true;
        } else {
          const scrollableDistance = timelineHeight + (startPoint - endPoint);
          const scrolled = startPoint - timelineTop;
          const calculatedProgress = Math.min(1, Math.max(0, scrolled / scrollableDistance));
          
          if (calculatedProgress > progressRef.current) {
            newProgress = calculatedProgress;
            if (newProgress >= 0.99) {
              newProgress = 1;
              isCompletedRef.current = true;
            }
          }
        }

        // Only update if progress changed
        if (newProgress !== progressRef.current) {
          progressRef.current = newProgress;
          updateVisuals(newProgress);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateVisuals]);

  return (
    <section ref={sectionRef} className="relative py-20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block font-display text-sm tracking-[0.3em] text-primary mb-4">
            MARK YOUR CALENDAR
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-wider">
            EVENT <span className="text-gradient-neon">TIMELINE</span>
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative max-w-2xl mx-auto">
          {/* Background line (dim) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-border/30" />
          
          {/* Animated glowing line - GPU accelerated with transform */}
          <div 
            ref={progressLineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 origin-top"
            style={{
              transform: 'scaleY(0)',
              background: 'linear-gradient(180deg, hsl(186 100% 50%), hsl(280 70% 50%), hsl(300 100% 50%))',
              boxShadow: '0 0 15px hsl(186 100% 50% / 0.6), 0 0 30px hsl(186 100% 50% / 0.3)',
              willChange: 'transform',
            }}
          />

          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              const Icon = event.icon;
              
              return (
                <div
                  key={event.title}
                  className={`relative flex items-center gap-6 md:gap-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div 
                    className={`flex-1 ml-16 md:ml-0 ${
                      isLeft ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div 
                      ref={el => cardsRef.current[index] = el}
                      className="glass-card p-6 inline-block"
                      style={{
                        transform: 'scale(0.95)',
                        opacity: 0.4,
                        willChange: 'transform, opacity',
                        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out, box-shadow 0.4s ease-out, border-color 0.4s ease-out',
                      }}
                    >
                      {/* Date Badge */}
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-display tracking-wider mb-3"
                        style={{
                          background: 'linear-gradient(135deg, hsl(186 100% 50% / 0.3), hsl(300 100% 50% / 0.3))',
                          border: '1px solid hsl(186 100% 50% / 0.5)',
                        }}
                      >
                        {event.date}
                      </span>
                      
                      <h3 className="font-display text-xl font-bold tracking-wider mb-2 text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node with Glow */}
                  <div 
                    ref={el => nodesRef.current[index] = el}
                    className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-10"
                  >
                    {/* Outer glow ring */}
                    <div 
                      className="glow-ring absolute w-14 h-14 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, hsl(186 100% 50% / 0.4) 0%, transparent 70%)',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        willChange: 'opacity',
                        transition: 'opacity 0.4s ease-out',
                      }}
                    />
                    {/* Node circle with icon */}
                    <div 
                      className="node-inner relative w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'hsl(252 40% 20%)',
                        border: '2px solid hsl(252 40% 30%)',
                        willChange: 'transform, background, box-shadow',
                        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease-out, box-shadow 0.4s ease-out, border-color 0.4s ease-out',
                      }}
                    >
                      <Icon size={18} className="text-muted-foreground" />
                    </div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>

          {/* End glow */}
          <div 
            ref={endGlowRef}
            className="absolute left-6 md:left-1/2 -bottom-4"
            style={{
              transform: 'translateX(-50%) scale(0.5)',
              opacity: 0,
              willChange: 'transform, opacity',
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out',
            }}
          >
            <div 
              className="w-8 h-8 rounded-full animate-pulse"
              style={{
                background: 'linear-gradient(135deg, hsl(280 70% 50%), hsl(300 100% 50%))',
                boxShadow: '0 0 25px hsl(300 100% 50% / 0.8), 0 0 50px hsl(300 100% 50% / 0.4)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
