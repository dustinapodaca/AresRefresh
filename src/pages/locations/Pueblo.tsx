import LocationPage from '../../components/locations/LocationPage';
import { PUEBLO } from '../../components/locations/data';

// Pueblo: "The Local File" (docs/locations-concepts.md). Copy changes are logged in
// docs/copy-changes.md.
export default function Pueblo() {
  return <LocationPage file={PUEBLO} />;
}
