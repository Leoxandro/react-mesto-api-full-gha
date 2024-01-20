export let BASE_URL = '';
const { NODE_ENV } = process.env;
if (NODE_ENV === 'production') {
  BASE_URL = 'https://api.karpov.students.nomoredomainsmonster.ru';
} else {
  BASE_URL = 'http://localhost:3001';
}