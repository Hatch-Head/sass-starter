import { Heading, Link, Text } from "@react-email/components";
import globals from "global-config";
import PrimaryButton from "./components/PrimaryButton";
import Wrapper from "./components/Wrapper";

export function TeamInvitation({
  url,
  invitedBy,
  teamName,
}: {
  url: string;
  invitedBy: string;
  teamName: string;
}): JSX.Element {
  return (
    <Wrapper>
      <Heading className="text-xl">
        Join the <strong>{teamName}</strong> team
      </Heading>
      <Text>
        {invitedBy} as invited to join the team <strong>{teamName}</strong> on{" "}
        {globals.appName}.
      </Text>

      <Text>
        Click the button below or copy and paste the link into your browser of
        choice to accept the invitation and join the team.
      </Text>

      <PrimaryButton href={url}>Accept invite</PrimaryButton>

      <Text className="text-muted-foreground mt-4 text-sm">
        Or manually copy and paste this link into your browser:
        <Link href={url}>{url}</Link>
      </Text>
    </Wrapper>
  );
}

TeamInvitation.subjects = {
  en: "You have been invited to join a team",
  // cspell:disable-next-line
  de: "Du wurdest eingeladen, einem Team beizutreten",
};

export default TeamInvitation;
