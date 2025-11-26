import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { professorAPI, statsAPI } from '../../../services/api';

const ProfessorProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [professor, setProfessor] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // États pour les formulaires
    const [profileData, setProfileData] = useState({
        bio: '',
        subjects: [],
        teaching_levels: [],
        hourly_rate: '',
        location: '',
        experience_years: '',
        teaching_methodology: ''
    });

    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    useEffect(() => {
        if (user && user.role === 'professor') {
            loadProfessorData();
        }
    }, [user]);

    const loadProfessorData = async () => {
        try {
            setLoading(true);
            // Charger le profil professeur et les statistiques
            const [profileResponse, statsResponse] = await Promise.all([
                professorAPI.getById(user.teacherProfile?.id),
                statsAPI.professor()
            ]);

            setProfessor(profileResponse.data);
            console.log('Professor data loaded:', profileResponse.data);
            setStats(statsResponse.data);

            // Initialiser les données du formulaire
            if (profileResponse.data) {
                setProfileData({
                    bio: profileResponse.data.bio || '',
                    subjects: profileResponse.data.subjects || [],
                    teaching_levels: profileResponse.data.teaching_levels || [],
                    hourly_rate: profileResponse.data.hourly_rate || '',
                    location: profileResponse.data.location || '',
                    experience_years: profileResponse.data.experience_years || '',
                    teaching_methodology: profileResponse.data.teaching_methodology || ''
                });
            }
        } catch (error) {
            console.error('Error loading professor data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await professorAPI.update(professor.id, profileData);
            // Recharger les données
            loadProfessorData();
            alert('Profil mis à jour avec succès!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Erreur lors de la mise à jour du profil');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        // Implémenter la logique de changement de mot de passe
        console.log('Changing password:', passwordData);
        alert('Fonctionnalité de changement de mot de passe à implémenter');
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const menuItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
        { id: 'profile', label: 'Modifier le profil', icon: '👤' },
        { id: 'security', label: 'Sécurité', icon: '🔒' },
        { id: 'appointments', label: 'Mes rendez-vous', icon: '📅' },
        { id: 'reviews', label: 'Avis des étudiants', icon: '⭐' },
        { id: 'earnings', label: 'Revenus', icon: '💰' },
        { id: 'availability', label: 'Disponibilités', icon: '🕒' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#ff4037] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement du profil...</p>
                </div>
            </div>
        );
    }

    if (!user || user.role !== 'professor') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Accès non autorisé</h2>
                    <p className="text-gray-600 mb-6">Cette page est réservée aux professeurs.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#ff4037] text-white px-6 py-3 rounded-lg hover:bg-[#e53935] transition-colors"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex max-sm:flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                            {/* Profil rapide */}
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-gradient-to-r from-[#ff4037] to-[#ff6b61] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                                    {user.name.charAt(0)}
                                </div>
                                <h2 className="font-bold text-gray-800 text-lg">{user.name}</h2>
                                <p className="text-gray-600 text-sm">Professeur certifié</p>
                                <div className="flex items-center justify-center gap-1 mt-2">
                                    <span className="text-yellow-400">⭐</span>
                                    <span className="font-medium">{professor?.average_rating || '4.5'}</span>
                                    <span className="text-gray-500">({professor?.total_reviews || 0})</span>
                                </div>
                            </div>

                            {/* Menu de navigation */}
                            <nav className="space-y-2">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeSection === item.id
                                            ? 'bg-[#ff4037] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>

                            {/* Déconnexion */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-gray-100 transition-colors mt-4"
                            >
                                <span className="text-lg">🚪</span>
                                <span className="font-medium">Déconnexion</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {/* Tableau de bord */}
                        {activeSection === 'dashboard' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>

                                    {/* Statistiques */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                        {[
                                            { label: 'Étudiants total', value: stats?.total_students || 0, icon: '👥', color: 'blue' },
                                            { label: 'Cours donnés', value: stats?.completed_sessions || 0, icon: '🎓', color: 'green' },
                                            { label: 'Revenus totaux', value: `${((stats?.completed_sessions || 0) * (professor?.hourly_rate || 0)).toLocaleString()} Ar`, icon: '💰', color: 'yellow' },
                                            { label: 'Note moyenne', value: professor?.average_rating || '4.5', icon: '⭐', color: 'purple' }
                                        ].map((stat, index) => (
                                            <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                                                <div className="text-3xl mb-2">{stat.icon}</div>
                                                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                                                <div className="text-gray-600 text-sm">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Actions rapides */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setActiveSection('availability')}
                                            className="bg-white border-2 border-gray-200 rounded-xl p-4 text-left hover:border-[#ff4037] transition-colors"
                                        >
                                            <div className="text-2xl mb-2">🕒</div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Gérer les disponibilités</h3>
                                            <p className="text-gray-600 text-sm">Configurez vos horaires de cours</p>
                                        </button>

                                        <button
                                            onClick={() => setActiveSection('profile')}
                                            className="bg-white border-2 border-gray-200 rounded-xl p-4 text-left hover:border-[#ff4037] transition-colors"
                                        >
                                            <div className="text-2xl mb-2">👤</div>
                                            <h3 className="font-semibold text-gray-800 mb-1">Compléter le profil</h3>
                                            <p className="text-gray-600 text-sm">Améliorez votre visibilité</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Prochains rendez-vous */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Prochains rendez-vous</h3>
                                    <div className="text-center py-8 text-gray-500">
                                        Aucun rendez-vous à venir
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modifier le profil */}
                        {activeSection === 'profile' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Modifier le profil</h2>

                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tarif horaire (Ar)
                                            </label>
                                            <input
                                                type="number"
                                                value={profileData.hourly_rate}
                                                onChange={(e) => setProfileData({ ...profileData, hourly_rate: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent"
                                                placeholder="Ex: 15000"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Années d'expérience
                                            </label>
                                            <input
                                                type="number"
                                                value={profileData.experience_years}
                                                onChange={(e) => setProfileData({ ...profileData, experience_years: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent"
                                                placeholder="Ex: 5"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Localisation
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.location}
                                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent"
                                            placeholder="Ex: Antananarivo"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Matières enseignées
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Mathématiques', 'Physique', 'Chimie', 'Français', 'Anglais', 'Malagasy', 'SVT', 'Histoire-Géo'].map((subject) => (
                                                <label key={subject} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                                                    <input
                                                        type="checkbox"
                                                        checked={profileData.subjects.includes(subject)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setProfileData({ ...profileData, subjects: [...profileData.subjects, subject] });
                                                            } else {
                                                                setProfileData({ ...profileData, subjects: profileData.subjects.filter(s => s !== subject) });
                                                            }
                                                        }}
                                                        className="rounded text-[#ff4037] focus:ring-[#ff4037]"
                                                    />
                                                    <span className="text-sm">{subject}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Niveaux enseignés
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {[
                                                { value: 'primary', label: 'Primaire' },
                                                { value: 'college', label: 'Collège' },
                                                { value: 'lycee', label: 'Lycée' },
                                                { value: 'university', label: 'Université' }
                                            ].map((level) => (
                                                <label key={level.value} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                                                    <input
                                                        type="checkbox"
                                                        checked={profileData.teaching_levels.includes(level.value)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setProfileData({ ...profileData, teaching_levels: [...profileData.teaching_levels, level.value] });
                                                            } else {
                                                                setProfileData({ ...profileData, teaching_levels: profileData.teaching_levels.filter(l => l !== level.value) });
                                                            }
                                                        }}
                                                        className="rounded text-[#ff4037] focus:ring-[#ff4037]"
                                                    />
                                                    <span className="text-sm">{level.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description et méthodologie
                                        </label>
                                        <textarea
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            rows="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent"
                                            placeholder="Décrivez votre approche pédagogique, votre expérience..."
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            className="bg-[#ff4037] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e53935] transition-colors"
                                        >
                                            Enregistrer les modifications
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveSection('dashboard')}
                                            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Sécurité - Changement de mot de passe */}
                        {activeSection === 'security' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sécurité du compte</h2>

                                <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mot de passe actuel
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.current_password}
                                            onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nouveau mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.new_password}
                                            onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirmer le nouveau mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.new_password_confirmation}
                                            onChange={(e) => setPasswordData({ ...passwordData, new_password_confirmation: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff4037] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-[#ff4037] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e53935] transition-colors"
                                    >
                                        Changer le mot de passe
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Sections à implémenter */}
                        {['appointments', 'reviews', 'earnings', 'availability'].includes(activeSection) && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    {menuItems.find(item => item.id === activeSection)?.label}
                                </h2>
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🚧</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">En cours de développement</h3>
                                    <p className="text-gray-600">Cette fonctionnalité sera bientôt disponible</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessorProfile;