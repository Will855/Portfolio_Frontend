import Demo from '../../../../modules/projects/pages/DemosRedirectPage';
import { projectIds } from '../../../../modules/projects/config/project';

export function generateStaticParams() {
  return projectIds.map((id) => ({
    projectId: id,
  }));
}

export default function DemoRedirectRoute() {
  return <Demo />;
}
