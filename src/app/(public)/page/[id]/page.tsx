import CardDetails from '../../../../modules/projects/pages/ProjectDetailsPage';

export default function ProjectDetailsRoute({ params }: { params: { id: string } }) {
  // We can pass params if the component is expecting it, or Next.js App Router will pass params anyway,
  // but ProjectDetailsPage currently uses `useParams` from react-router.
  // We will need to update ProjectDetailsPage to use `useParams` from `next/navigation`!
  return <CardDetails />;
}
