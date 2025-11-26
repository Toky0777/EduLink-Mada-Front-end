import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="h-18 p-2 flex flex-row items-center md:px-10 border-b border-gray-200 bg-white">
            {/* Logo */}
            <a
                href="/"
                className="flex items-center cursor-pointer"
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }}
            >
                <img
                    src={logo}
                    alt="EduLink-Mada"
                    className="h-14 w-auto" // Ajustez la taille ici
                />
                <div className="hidden md:block">
                    <p className="text-xl font-bold text-gray-800">EduLink-Mada</p>
                    <p className="text-sm text-gray-600">Trouvez le professeur idéal</p>
                </div>
            </a>

            {/* Navigation Desktop */}
            <div className="flex flex-1 justify-end">

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center">
                    {/* Language Selector */}
                    <div className="language-currency-select cursor-pointer hidden p-2 mr-2 lg:inline-block">
                        <div className="flex text-gray-500 hover:text-gray-800 items-center">
                            <span className='text-gray-600 text-sm'>Français · MGA Ar</span>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#515164"
                                className="fill-current"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.96967 9.96967C8.26256 9.67678 8.73744 9.67678 9.03033 9.96967L12 12.9393L14.9697 9.96967C15.2626 9.67678 15.7374 9.67678 16.0303 9.96967C16.3232 10.2626 16.3232 10.7374 16.0303 11.0303L12.5303 14.5303C12.2374 14.8232 11.7626 14.8232 11.4697 14.5303L7.96967 11.0303C7.67678 10.7374 7.67678 10.2626 7.96967 9.96967Z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <a
                        className="hidden p-2 mr-2 lg:inline-block"
                        href="/search"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/search');
                        }}
                    >
                        <div className="text-sm text-gray-500 hover:text-gray-800" data-cy="hp-menu-teachers">
                            Trouver un Professeur
                        </div>
                    </a>

                    <a
                        className="hidden p-2 mr-2 lg:inline-block"
                        href="/become-teacher"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/become-teacher');
                        }}
                    >
                        <div className="text-sm text-gray-500 hover:text-gray-800" data-cy="hp-menu-application">
                            Devenir Professeur
                        </div>
                    </a>

                    {/* User Actions */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 hover:shadow-md transition-shadow"
                            >
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-medium text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-gray-700 font-medium">
                                    {user.name}
                                </span>
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                    {user && user.role === 'professor' && (
                                        <a
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/profile');
                                                // setIsMenuOpen(false);
                                            }}
                                        >
                                            Mon Profil
                                        </a>
                                    )}
                                    {user.role === 'student' && (
                                        <a
                                            href="/my-appointments"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/my-appointments');
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            Mes Réservations
                                        </a>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        Se Déconnecter
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/auth?tab=login')}
                                className="text-gray-600 hover:text-gray-800 font-medium text-sm"
                            >
                                Se connecter
                            </button>
                            <button
                                onClick={() => navigate('/auth?tab=register')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                            >
                                S'inscrire
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;