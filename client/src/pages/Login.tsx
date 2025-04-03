import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(''); // State para mensagens de erro
  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      navigate('/'); // Redireciona para a página principal após o login
    } catch (err: any) {
      console.error('Failed to login', err);
      setError(err.message || 'Login falhou. Verifique suas credenciais.'); // Exibe mensagem de erro
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>} {/* Exibe mensagem de erro */}
        <h1>Login</h1>
        <label>Username</label>
        <input
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
          placeholder='Username' // Melhor para a experiência do usuário
          required
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
          placeholder='Password' // Melhor para a experiência do usuário
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;