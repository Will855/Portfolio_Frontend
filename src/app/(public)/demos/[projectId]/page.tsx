import Demo from '../../../../modules/projects/pages/DemosRedirectPage';

export function generateStaticParams() {
  return [
    { projectId: '1' }, { projectId: '2' }, { projectId: '3' }, { projectId: '4' }, { projectId: '5' },
    { projectId: '6' }, { projectId: '7' }, { projectId: '8' }, { projectId: '9' }, { projectId: '10' }
  ];
}

export default function DemoRedirectRoute() {
  return <Demo />;
}
