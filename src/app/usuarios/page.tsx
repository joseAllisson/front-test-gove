'use client';

import { useEffect, useMemo, useState } from 'react';
import { User } from '@/types/user';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';
import { ActionsDataTable, DataTable } from '@/components/Datatable';
import { userService } from '@/service/userService';
import Swal from 'sweetalert2';
import { formatDate } from '@/helpers/formatDate';

interface Filters {
  page: number;
  perPage: number;
  total: number;
  orderBy: string;
  order: 'asc' | 'desc';
}

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [filters, setFilters] = useState<Filters>({
    page: 0,
    perPage: 10,
    total: 0,
    orderBy: 'created_at',
    order: 'desc',
  });

  const fetchUsers = useMemo(() => {
    return async () => {
      setLoading(true);
      try {
        const response = await userService.getUsersList(
          filters.page + 1,
          filters.perPage,
          filters.orderBy,
          filters.order
        );
        setUsers(response.data);
        setFilters((prev) => ({ ...prev, total: response.total }));
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar usuários',
          text: 'Ocorreu um erro ao tentar buscar a lista de usuários. Por favor, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    };
  }, [filters.page, filters.perPage, filters.orderBy, filters.order]);

  const handleEdit = (userId: number) => {
    router.push(`/editar-usuario/${userId}`);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        setLoading(true);
        await userService.deleteUser(userToDelete.id);

        setDeleteModalOpen(false);
        setUserToDelete(null);
        Swal.fire({
          icon: 'success',
          title: 'Usuário excluído com sucesso!',
          text: 'O usuário foi removido da lista.',
        });
        fetchUsers();
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir usuário',
          text: 'Ocorreu um erro ao tentar excluir o usuário. Por favor, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    { key: 'phone', label: 'Telefone' },
    {
      key: 'created_at',
      label: 'Data de criação',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'last_login',
      label: 'Último login',
      render: (value: string | null) => (value ? formatDate(value) : '-'),
    },
  ];

  const actions: ActionsDataTable[] = [
    {
      label: 'Editar',
      icon: <EditIcon />,
      onClick: (row: User) => handleEdit(row.id),
      color: 'blue',
    },
    {
      label: 'Excluir',
      icon: <DeleteIcon />,
      onClick: handleDelete,
      color: 'red',
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [filters.page, filters.perPage, filters.orderBy, filters.order, fetchUsers]);

  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="pb-16 text-2xl font-bold text-purple-800">Usuários</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/cadastrar-usuario')}
          className="!mt-auto !mb-4 !capitalize"
        >
          + Novo Usuário
        </Button>
      </div>

      <DataTable
        data={users}
        columns={columns}
        actions={actions}
        loading={loading}
        page={filters.page + 1}
        totalItems={filters.total}
        totalPages={Math.ceil(filters.total / filters.perPage)}
        onPageChange={(newPage) => setFilters((prev) => ({ ...prev, page: newPage - 1 }))}
        order={filters.order}
        orderBy={filters.orderBy}
        onSort={(column) => {
          setFilters((prev) => ({
            ...prev,
            orderBy: column,
            order: prev.order === 'asc' ? 'desc' : 'asc',
          }));
        }}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        userName={userToDelete?.name || ''}
        loading={loading}
      />
    </section>
  );
}
