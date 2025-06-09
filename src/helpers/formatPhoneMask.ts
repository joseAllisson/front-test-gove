export const formatPhoneMask = (value: string) => {
  if (!value) return value;

  const phone = value.replace(/\D/g, '');
  const { length } = phone;

  if (length <= 2) return `(${phone}`;
  if (length <= 6) return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  if (length <= 10) return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;

  return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
};
