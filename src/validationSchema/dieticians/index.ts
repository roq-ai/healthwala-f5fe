import * as yup from 'yup';

export const dieticianValidationSchema = yup.object().shape({
  name: yup.string().required(),
  specialty: yup.string().required(),
  experience: yup.number().integer().required(),
  availability: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
