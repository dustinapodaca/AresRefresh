/**
 * React wrapper for the <image-slot> web component (defined in /public/image-slot.js).
 * Renders as a drag-and-drop image placeholder that persists in localStorage.
 */
type Props = {
  id: string;
  placeholder?: string;
  shape?: 'rect' | 'rounded' | 'circle' | 'pill';
  fill?: boolean;
  className?: string;
};

export default function ImageSlot({ id, placeholder, shape = 'rect', fill = false, className }: Props) {
  return (
    <image-slot
      id={id}
      placeholder={placeholder}
      shape={shape}
      data-fill={fill ? 'true' : 'false'}
      className={className}
    />
  );
}
