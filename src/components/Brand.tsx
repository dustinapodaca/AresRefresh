import { Link } from 'react-router-dom';

export default function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 text-[18px] font-bold tracking-[0.03em] text-ink">
      <span className="brand-glyph" />
      <span>
        <b className="font-bold">ARES SECURITY</b>
        <span className="block text-[11px] font-normal leading-none tracking-[0.18em] text-mid">
          LLC · EST. 2022
        </span>
      </span>
    </Link>
  );
}
