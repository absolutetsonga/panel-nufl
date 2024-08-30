import { TeamModalView } from "~/components/widgets/team-modal";
import { Modal } from "./modal";

export default async function TeamModal({
  params: { id: teamId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <TeamModalView teamId={teamId} />
    </Modal>
  );
}
