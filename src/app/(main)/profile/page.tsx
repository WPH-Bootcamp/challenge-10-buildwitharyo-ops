import { AccountSidebar } from "@/components/layout/account-sidebar";
import { Container } from "@/components/shared/container";
import { ProfileCard } from "@/features/auth/components/profile-card";

export default function ProfilePage() {
  return (
    <Container className="py-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <AccountSidebar className="hidden lg:block" />
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
          <ProfileCard />
        </div>
      </div>
    </Container>
  );
}
