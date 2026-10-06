import LocationPage from '../../components/locations/LocationPage';
import { DENVER } from '../../components/locations/data';

// Denver: "The Local File" (docs/locations-concepts.md). Copy changes are logged in
// docs/copy-changes.md.
export default function Denver() {
  return <LocationPage file={DENVER} />;
}
