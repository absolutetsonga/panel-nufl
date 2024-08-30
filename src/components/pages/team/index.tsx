import { PageContainer } from "~/components/shared/ui";
import { TeamModalView } from "~/components/widgets/team-modal";

const TeamPage = async (props: { teamId: string }) => {
  return (
    <PageContainer>
      <TeamModalView teamId={props.teamId} />
    </PageContainer>
  );
};

export default TeamPage;