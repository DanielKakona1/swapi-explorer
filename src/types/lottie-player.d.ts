declare module '@lottiefiles/react-lottie-player' {
  import type { ComponentType } from 'react';

  export interface PlayerProps {
    autoplay?: boolean;
    loop?: boolean;
    src: string | object;
    className?: string;
    style?: Record<string, string | number>;
    [key: string]: unknown;
  }

  export const Player: ComponentType<PlayerProps>;
}
