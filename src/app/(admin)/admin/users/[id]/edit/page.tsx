import UserEditContainer from "@/containers/admin/users/UserEditContainer";

export default function UserEditPage({ params }: { params: { id: string } }) {
  return <UserEditContainer userId={params.id} />;
}
