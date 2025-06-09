import Link from 'next/link';
import { notFound } from 'next/navigation';
import UserForm from '@/components/UserForm';
import { userService } from '@/service/userService';
import { Permission } from '@/types/permission';

export default async function UpdateUser({ params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const userIdNumber = parseInt(userId, 10);

    const data = await userService.getUserById(userIdNumber);

    if (!data) {
      return notFound();
    }

    const initialValues = {
      name: data?.name || '',
      email: data.email,
      phone: data.phone || '',
      user_type: data.user_type || '',
      sector: data.sector || '',
      permissions: data.permissions.map((permission: Permission) => permission.id) || [],
    };

    return <UserForm isEdit userId={userIdNumber} initialValues={initialValues} />;
  } catch {
    return (
      <div className="text-red-500">
        Nenhum usuário encontrado. <br />
        <Link href="/usuarios" className="text-blue-500 underline">
          Voltar para a lista de usuários
        </Link>
      </div>
    );
  }
}
