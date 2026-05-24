/* Type declarations for the <image-slot> web component */
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          id?: string;
          placeholder?: string;
          shape?: 'rect' | 'rounded' | 'circle' | 'pill';
          radius?: string;
          mask?: string;
          'data-fill'?: string;
        },
        HTMLElement
      >;
    }
  }
}
export {};
