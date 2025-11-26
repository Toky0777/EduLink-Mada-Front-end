import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';

const Auth = () => {
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') || 'login';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student',
        agreeTerms: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (activeTab === 'login') {
                // Pour la connexion
                await login({
                    email: formData.email,
                    password: formData.password
                });
                navigate('/');
            } else {
                // Pour l'inscription - validation côté frontend
                if (formData.password !== formData.password_confirmation) {
                    throw new Error('Les mots de passe ne correspondent pas');
                }
                if (!formData.agreeTerms) {
                    throw new Error('Veuillez accepter les conditions d\'utilisation');
                }

                // Préparer les données pour l'API
                const registerData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation,
                    role: formData.role
                };

                await register(registerData);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
                <div className="flex justify-center">
                    <img
                        src={logo}
                        alt="EduLink-Mada"
                        className="h-16 w-auto"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    {activeTab === 'login' ? 'Connectez-vous à votre compte' : 'Rejoignez notre communauté'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {activeTab === 'login'
                        ? 'Ou '
                        : 'Déjà membre ? '}
                    <button
                        onClick={() => {
                            setActiveTab(activeTab === 'login' ? 'register' : 'login');
                            setError(''); // Clear error when switching tabs
                        }}
                        className="font-medium text-[#ff4037] hover:text-[#e53935] transition-colors"
                    >
                        {activeTab === 'login' ? 'créez un nouveau compte' : 'connectez-vous'}
                    </button>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
                <div className="bg-white py-8 px-6 shadow-xl sm:rounded-2xl sm:px-12 border border-gray-100">
                    {/* Tabs */}
                    <div className="flex space-x-4 mb-8 max-w-md mx-auto">
                        <button
                            onClick={() => {
                                setActiveTab('login');
                                setError('');
                            }}
                            className={`flex-1 py-3 px-4 text-center rounded-xl font-semibold transition-all duration-300 ${activeTab === 'login'
                                ? 'bg-[#ff4037] text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Connexion
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('register');
                                setError('');
                            }}
                            className={`flex-1 py-3 px-4 text-center rounded-xl font-semibold transition-all duration-300 ${activeTab === 'register'
                                ? 'bg-[#ff4037] text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Inscription
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm max-w-2xl mx-auto">
                            {error}
                        </div>
                    )}

                    {activeTab === 'login' ? (
                        <>
                            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                                <div>
                                    <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresse email
                                    </label>
                                    <input
                                        id="loginEmail"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent transition-all duration-200"
                                        placeholder="votre@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mot de passe
                                    </label>
                                    <input
                                        id="loginPassword"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent transition-all duration-200"
                                        placeholder="Votre mot de passe"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#ff4037] text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:bg-[#e53935] transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                                            Connexion...
                                        </div>
                                    ) : (
                                        'Se connecter'
                                    )}
                                </button>

                                {/* Divider et Social Login */}
                                <div className="mt-6 flex items-center">
                                    <div className="flex-1 border-t border-gray-300"></div>
                                    <div className="px-3 text-sm text-gray-500">Ou</div>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Google
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                        Twitter
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="flex items-start gap-6">
                                        <div className='w-full'>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Nom complet *
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent transition-all duration-200"
                                                placeholder="Votre nom complet"
                                            />
                                        </div>

                                        <div className='w-full'>
                                            <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                                Adresse email *
                                            </label>
                                            <input
                                                id="registerEmail"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent transition-all duration-200"
                                                placeholder="votre@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Je suis : *
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {[
                                                    { value: 'student', label: 'Étudiant', icon: '🎓', description: 'Je cherche un professeur' },
                                                    { value: 'teacher', label: 'Professeur', icon: '👨‍🏫', description: 'Je propose des cours' }
                                                ].map((role) => (
                                                    <label
                                                        key={role.value}
                                                        className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${formData.role === role.value
                                                            ? 'border-[#ff4037] bg-red-50'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="role"
                                                            value={role.value}
                                                            checked={formData.role === role.value}
                                                            onChange={handleInputChange}
                                                            className="sr-only"
                                                        />
                                                        <span className="text-2xl mb-2">{role.icon}</span>
                                                        <span className="text-sm font-bold text-gray-900 mb-1">{role.label}</span>
                                                        <span className="text-xs text-gray-500 text-center">{role.description}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className='w-full'>
                                            <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                                Mot de passe *
                                            </label>
                                            <input
                                                id="registerPassword"
                                                name="password"
                                                type="password"
                                                required
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent transition-all duration-200"
                                                placeholder="Minimum 6 caractères"
                                                minLength="6"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Utilisez un mot de passe fort avec des lettres, chiffres et symboles
                                            </p>
                                        </div>

                                        <div className='w-full'>
                                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                                                Confirmer le mot de passe *
                                            </label>
                                            <input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                required
                                                value={formData.password_confirmation}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent transition-all duration-200"
                                                placeholder="Retapez votre mot de passe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        {/* Terms Agreement */}
                                        <div className="flex items-start space-x-3 pt-4">
                                            <input
                                                id="agreeTerms"
                                                name="agreeTerms"
                                                type="checkbox"
                                                required
                                                checked={formData.agreeTerms}
                                                onChange={handleInputChange}
                                                className="mt-1 w-4 h-4 text-[#ff4037] border-gray-300 rounded focus:ring-[#ff4037]"
                                            />
                                            <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                                                J'accepte les{' '}
                                                <a href="/terms" className="text-[#ff4037] hover:underline">
                                                    conditions d'utilisation
                                                </a>{' '}
                                                et la{' '}
                                                <a href="/privacy" className="text-[#ff4037] hover:underline">
                                                    politique de confidentialité
                                                </a>
                                                *
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 text-center">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#ff4037] text-white py-4 px-12 rounded-xl font-semibold shadow-lg hover:bg-[#e53935] transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                                                Création du compte...
                                            </div>
                                        ) : (
                                            'Créer mon compte'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        En continuant, vous acceptez nos{' '}
                        <a href="/terms" className="text-[#ff4037] hover:underline">
                            Conditions d'utilisation
                        </a>{' '}
                        et notre{' '}
                        <a href="/privacy" className="text-[#ff4037] hover:underline">
                            Politique de confidentialité
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;