import * as yup from 'yup';

export const userValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Digite um e-mail válido'),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .max(20, 'Telefone não pode exceder 20 caracteres'),
  user_type: yup
    .string()
    .required('Tipo de usuário é obrigatório'),
  sector: yup
    .string()
    .required('Setor é obrigatório'),
  permissions: yup
    .array()
    .of(yup.number().optional())
});