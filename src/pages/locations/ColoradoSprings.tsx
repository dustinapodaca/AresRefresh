import LocationPage from '../../components/locations/LocationPage';
import { COLORADO_SPRINGS } from '../../components/locations/data';

// Colorado Springs: "The Local File" (docs/locations-concepts.md). Copy changes are
// logged in docs/copy-changes.md.
export default function ColoradoSprings() {
  return <LocationPage file={COLORADO_SPRINGS} />;
}
