import Demo from '../../../../modules/projects/pages/DemosRedirectPage';

// Render at request time — this page reads Supabase data that
// requires env vars not available during static generation.
export const dynamic = 'force-dynamic';

export default function DemoRedirectRoute() {
  return <Demo />;
}
