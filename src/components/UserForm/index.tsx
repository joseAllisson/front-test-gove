'use client';

import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import CustomBreadcrumbs from '@/components/CustomBreadcrumbs';
import CustomSelect from '@/components/CustomSelect';
import { Permission } from '@/types/permission';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { userValidationSchema } from '@/helpers/validation/userSchema';
import { UserFormValues } from '@/types/user';
import { userService } from '@/service/userService';
import { permissionService } from '@/service/permissionService';
import { formatPhoneMask } from '@/helpers/formatPhoneMask';

interface UserFormProps {
  initialValues?: UserFormValues;
  userId?: number;
  isEdit?: boolean;
}

export default function UserForm({ initialValues, userId, isEdit = false }: UserFormProps) {
  const router = useRouter();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: UserFormValues) => {
    setLoading(true);
    try {
      if (isEdit && userId) {
        await userService.updateUser(userId, values);
      } else {
        await userService.createUser(values);
      }

      Swal.fire({
        icon: 'success',
        title: isEdit ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!',
        text: 'As alterações foram salvas.',
      }).then(() => {
        router.push('/usuarios');
      });
    } catch (error) {
      const err = error as { response?: { data?: { errors: { email?: string } } } };
      const errorMessage = err?.response?.data?.errors?.email
        ? 'Email já existente ou inválido'
        : 'Erro ao enviar o formulário.';
      Swal.fire({
        icon: 'error',
        title: errorMessage,
        text: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.',
      });
    }
    setLoading(false);
  };

  const formik = useFormik<UserFormValues>({
    initialValues: initialValues || {
      name: '',
      email: '',
      phone: '',
      user_type: '',
      sector: '',
      permissions: [],
    },
    validationSchema: userValidationSchema,
    onSubmit,
  });

  const handlePermissionChange =
    (childId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentPermissions = [...(formik.values.permissions || [])];

      if (event.target.checked) {
        if (!currentPermissions.includes(childId)) {
          currentPermissions.push(childId);
        }
      } else {
        const index = currentPermissions.indexOf(childId);
        if (index > -1) {
          currentPermissions.splice(index, 1);
        }
      }

      formik.setFieldValue(`permissions`, currentPermissions);
    };

  const isPermissionChecked = (childId: number): boolean => {
    return formik.values.permissions.includes(childId) || false;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneMask(e.target.value);
    formik.setFieldValue('phone', formattedValue);
  };

  useEffect(() => {
    const getPermissions = async () => {
      const result = await permissionService.getAll();
      setPermissions(result);
    };

    getPermissions();
  }, []);

  return (
    <section>
      <CustomBreadcrumbs
        breadcrumbs={[
          { label: 'Usuários', href: '/usuarios' },
          { label: isEdit ? 'Editar usuário' : 'Criar novo usuário' },
        ]}
      />
      <h1 className="pb-8 text-2xl font-bold text-purple-800">
        {isEdit ? 'Editar usuário' : 'Criar novo usuário'}
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <TextField
            id="name"
            name="name"
            label="Nome*"
            variant="standard"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name ? formik.errors.name : ''}
          />
          <TextField
            id="email"
            name="email"
            label="Email*"
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email ? formik.errors.email : ''}
          />
          <TextField
            id="phone"
            name="phone"
            label="Telefone*"
            variant="standard"
            value={formik.values.phone}
            onChange={handlePhoneChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone ? formik.errors.phone : ''}
          />
          <CustomSelect
            options={[
              { value: 'admin', label: 'admin' },
              { value: 'user', label: 'user' },
            ]}
            value={formik.values.user_type}
            onChange={(newValue) => formik.setFieldValue('user_type', newValue)}
            error={formik.touched.user_type && Boolean(formik.errors.user_type)}
            helperText={formik.touched.user_type ? formik.errors.user_type : ''}
            label="Tipo de usuário*"
          />
          <TextField
            id="sector"
            name="sector"
            label="Orgão/Secretaria*"
            variant="standard"
            value={formik.values.sector}
            onChange={formik.handleChange}
            error={formik.touched.sector && Boolean(formik.errors.sector)}
            helperText={formik.touched.sector ? formik.errors.sector : ''}
          />
        </div>

        <div className="">
          <h2 className="mt-4 mb-2 text-xl font-semibold">Permissões de acesso</h2>
          <div className="flex flex-wrap gap-16">
            {permissions.map((permission) => (
              <div key={permission.id}>
                <h3 className="font-semibold text-lg">{permission.name}</h3>
                <FormGroup>
                  {permission.children?.map((child) => (
                    <FormControlLabel
                      key={child.id}
                      label={child.name}
                      control={
                        <Checkbox
                          checked={isPermissionChecked(child.id)}
                          onChange={handlePermissionChange(child.id)}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outlined"
            className="!mt-16 !capitalize"
            onClick={() => router.push('/usuarios')}
            disabled={loading}
            loading={loading}
          >
            Voltar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="!mt-16 !capitalize"
            disabled={loading}
          >
            Salvar
          </Button>
        </div>
      </form>
    </section>
  );
}
