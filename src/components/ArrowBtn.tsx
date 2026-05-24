import { Link } from 'react-router-dom';

type Variant = 'default' | 'on-light' | 'lg';

type CommonProps = {
  variant?: Variant | Variant[];
  className?: string;
  ariaLabel?: string;
};

type LinkProps = CommonProps & { to: string; href?: never; onClick?: never };
type AnchorProps = CommonProps & { href: string; to?: never; onClick?: never };
type ButtonProps = CommonProps & { onClick: () => void; to?: never; href?: never };

type Props = LinkProps | AnchorProps | ButtonProps;

const ARROW_SVG = (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M15.3846 0H0.615385C0.275692 0 0 0.275692 0 0.615385C0 0.955077 0.275692 1.23077 0.615385 1.23077H13.8988L0.180308 14.9495C-0.06 15.1898 -0.06 15.5794 0.180308 15.8197C0.300615 15.94 0.457846 16 0.615385 16C0.772923 16 0.930461 15.94 1.05046 15.8197L14.7692 2.10092V15.3846C14.7692 15.7243 15.0449 16 15.3846 16C15.7243 16 16 15.7243 16 15.3846V0.615385C16 0.275692 15.7243 0 15.3846 0Z" fill="currentColor" />
  </svg>
);

function classes(variant: Variant | Variant[] = 'default', extra?: string) {
  const arr = Array.isArray(variant) ? variant : [variant];
  return [
    'arrow-btn',
    arr.includes('on-light') ? 'arrow-btn-on-light' : '',
    arr.includes('lg') ? 'arrow-btn-lg' : '',
    extra ?? '',
  ].filter(Boolean).join(' ');
}

export default function ArrowBtn(props: Props) {
  const { variant, className, ariaLabel } = props;
  const cls = classes(variant, className);

  if ('to' in props && props.to) {
    return <Link to={props.to} className={cls} aria-label={ariaLabel}>{ARROW_SVG}</Link>;
  }
  if ('href' in props && props.href) {
    return <a href={props.href} className={cls} aria-label={ariaLabel}>{ARROW_SVG}</a>;
  }
  return <button type="button" onClick={(props as ButtonProps).onClick} className={cls} aria-label={ariaLabel}>{ARROW_SVG}</button>;
}
