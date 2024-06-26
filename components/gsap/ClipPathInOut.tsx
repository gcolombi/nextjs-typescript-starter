import { ClipPath } from '@/types/animations';
import gsap from 'gsap';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useTransitionContext from '@/context/transitionContext';

export default function ClipPathInOut({
    children,
    fade = true,
    durationIn = 1.25,
    durationOut = 0.35,
    delay = 0,
    delayOut = 0,
    ease,
    easeOut,
    clipPath,
    clipPathTo = 'inset(0% 0% 0% 0%)',
    clipPathOut,
    skipOutro,
    watch,
    start = 'top bottom',
    end = 'bottom top',
    scrub = false,
    markers,
}: ClipPath) {
    const { timeline } = useTransitionContext();
    const element = useRef<HTMLDivElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        const scrollTrigger = watch
            ? {
                  scrollTrigger: {
                      trigger: element.current,
                      start,
                      end,
                      scrub,
                      markers: markers,
                  },
              }
            : {};

        const ctx = gsap.context(() => {
            /* Intro animation */
            gsap.fromTo(
                element.current,
                {
                    opacity: fade ? 0 : 1,
                    clipPath,
                    ease: ease,
                },
                {
                    opacity: 1,
                    clipPath: clipPathTo,
                    ease: ease,
                    delay,
                    duration: durationIn,
                    ...scrollTrigger,
                },
            );

            /* Outro animation */
            if (!skipOutro) {
                timeline?.add(
                    gsap.to(element.current, {
                        clipPath: clipPathOut ?? clipPath,
                        ease: easeOut,
                        delay: delayOut,
                        duration: durationOut,
                    }),
                    0,
                );
            }

            gsap.to(element.current, {
                opacity: 1,
            });
        }, element);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={element} style={{ opacity: 0 }}>
            {children}
        </div>
    );
}
