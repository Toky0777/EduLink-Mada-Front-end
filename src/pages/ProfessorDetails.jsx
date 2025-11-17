import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { professorAPI } from '../services/api';

const ProfessorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [professor, setProfessor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState('about');
    const [selectedSubject, setSelectedSubject] = useState('all');

    useEffect(() => {
        loadProfessorDetails();
    }, [id]);

    const loadProfessorDetails = async () => {
        try {
            setLoading(true);
            const response = await professorAPI.getById(id);
            setProfessor(response.data);
        } catch (err) {
            setError('Erreur lors du chargement des informations du professeur');
            console.error('Error loading professor:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour générer les barres de niveau
    const renderLevelBars = (level) => {
        const bars = [];
        for (let i = 0; i < 6; i++) {
            bars.push(
                <span
                    key={i}
                    className={`rounded-sm w-0.5 h-2 ml-0.5 ${i < level ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                />
            );
        }
        return <div className="flex items-center ml-1">{bars}</div>;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#ff4037] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement du profil...</p>
                </div>
            </div>
        );
    }

    if (error || !professor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Professeur non trouvé</h2>
                    <p className="text-gray-600 mb-6">{error || "Ce professeur n'existe pas."}</p>
                    <button
                        onClick={() => navigate('/search')}
                        className="bg-[#ff4037] text-white px-6 py-3 rounded-lg hover:bg-[#e53935] transition-colors"
                    >
                        Retour à la recherche
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6 mt-4">
                <div className="flex md:flex-col xl:flex-row gap-6">
                    {/* Colonne principale - 2/3 sur desktop */}
                    <div className="w-full lg:w-8/12">
                        {/* En-tête du profil */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                            <div className="flex sm:flex-col md:flex-row gap-6">
                                {/* Avatar et badges */}
                                <div className="md:w-20 flex-none">
                                    <div className="relative">
                                        <div className="w-20 h-20 bg-gradient-to-br from-[#ff4037] to-[#ff6b61] rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                                            {professor.user.name.charAt(0)}
                                        </div>
                                        {professor.is_verified && (
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="hidden md:block mt-2 text-center">
                                        <div className="text-xs text-gray-500">Dernière visite: Aujourd'hui</div>
                                    </div>
                                </div>

                                {/* Informations principales */}
                                <div className="flex-1 flex flex-col justify-center overflow-hidden gap-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-row items-start flex-1 overflow-hidden">
                                            <p className="text-xl md:text-2xl font-bold text-gray-700 break-words">
                                                {professor.user.name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Badge type de professeur */}
                                    <div className="flex">
                                        <div className="bg-blue-50 text-blue-700 py-1 px-3 rounded-2xl flex items-center text-sm font-medium">
                                            <span className="mr-2">👨‍🏫</span>
                                            {professor.is_verified ? 'Professeur certifié' : 'Tuteur communautaire'}
                                        </div>
                                    </div>

                                    {/* Matières enseignées */}
                                    <div className="hidden md:flex flex-col space-y-3">
                                        <div className="flex items-center">
                                            <div className="text-sm text-gray-500 min-w-20 mr-4">Enseigne</div>
                                            <div className="flex flex-wrap gap-2">
                                                {professor.subjects.map((subject, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {subject}
                                                        </span>
                                                        {index === 0 && (
                                                            <div className="ml-2 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                                                                Natif
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Niveaux enseignés */}
                                        <div className="flex items-center">
                                            <div className="text-sm text-gray-500 min-w-20 mr-4">Niveaux</div>
                                            <div className="flex flex-wrap gap-1">
                                                {professor.teaching_levels?.map((level, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                        {level === 'primary' && 'Primaire'}
                                                        {level === 'college' && 'Collège'}
                                                        {level === 'lycee' && 'Lycée'}
                                                        {level === 'university' && 'Université'}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Domaines d'expertise */}
                                        <div className="flex items-center">
                                            <div className="text-sm text-gray-500 min-w-20 mr-4">Expertise</div>
                                            <div className="flex flex-wrap gap-2">
                                                <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                                                    <span className="text-xs text-gray-700">Préparation d'examens</span>
                                                </div>
                                                <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                                                    <span className="text-xs text-gray-700">Soutien scolaire</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Citation */}
                                    <div className="mt-4">
                                        <p className="font-medium text-gray-700 text-sm leading-relaxed">
                                            {professor.bio || "Professeur passionné par l'enseignement et la transmission du savoir."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Version mobile des informations */}
                            <div className="md:hidden mt-4 space-y-4">
                                <div className="flex items-center">
                                    <div className="text-sm text-gray-500 min-w-20 mr-4">Enseigne</div>
                                    <div className="flex flex-wrap gap-2">
                                        {professor.subjects.map((subject, index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {subject}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation par onglets */}
                        <div className="bg-white rounded-2xl shadow-sm mb-6">
                            <div className="border-b border-gray-200">
                                <nav className="flex overflow-x-auto">
                                    {[
                                        { id: 'about', name: 'À propos de moi' },
                                        { id: 'teacher', name: 'Moi en tant que professeur' },
                                        { id: 'method', name: 'Méthode d\'enseignement' },
                                        { id: 'diplomas', name: 'CV et diplômes' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setSelectedTab(tab.id)}
                                            className={`flex-shrink-0 py-4 px-6 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${selectedTab === tab.id
                                                ? 'border-[#ff4037] text-[#ff4037]'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {tab.name}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Contenu des onglets */}
                            <div className="p-6">
                                {selectedTab === 'about' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">À propos de moi</h3>
                                            <div className="text-gray-700 leading-relaxed space-y-3">
                                                <p>
                                                    Je suis un professeur passionné par l'enseignement avec {professor.experience_years} ans d'expérience.
                                                    Ma mission est de rendre l'apprentissage accessible et agréable pour tous mes étudiants.
                                                </p>
                                                <p>
                                                    Originaire de {professor.location}, je m'engage à fournir un accompagnement personnalisé
                                                    adapté aux besoins spécifiques de chaque apprenant.
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3">Centres d'intérêt</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {['Lecture', 'Voyages', 'Musique', 'Écriture', 'Technologie'].map((interest, index) => (
                                                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedTab === 'teacher' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Moi en tant que professeur</h3>
                                            <p className="text-gray-700 leading-relaxed">
                                                En tant que professeur, je suis patient et à l'écoute de mes étudiants.
                                                Je crois en une approche personnalisée où chaque cours est adapté aux objectifs
                                                et au rythme d'apprentissage de l'étudiant.
                                            </p>
                                        </div>

                                        <div className="bg-blue-50 rounded-xl p-4">
                                            <h4 className="font-semibold text-blue-900 mb-2">Mon approche</h4>
                                            <ul className="text-blue-800 space-y-2 text-sm">
                                                <li>• Cours structurés mais flexibles</li>
                                                <li>• Support continu entre les sessions</li>
                                                <li>• Retours constructifs et encourageants</li>
                                                <li>• Ressources pédagogiques adaptées</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {selectedTab === 'method' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ma méthode d'enseignement</h3>
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                J'adapte ma méthodologie en fonction des besoins spécifiques de chaque étudiant,
                                                en combinant théorie et pratique pour un apprentissage complet.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3">Ressources utilisées</h4>
                                            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                                {[
                                                    'Fichiers PDF', 'Documents texte', 'Présentations',
                                                    'Exercices pratiques', 'Quiz interactifs', 'Support audio'
                                                ].map((resource, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <span className="w-2 h-2 bg-[#ff4037] rounded-full mr-3"></span>
                                                        {resource}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {selectedTab === 'diplomas' && (
                                    <div className="space-y-6">
                                        {professor.diplomas && professor.diplomas.length > 0 ? (
                                            professor.diplomas.map((diploma, index) => (
                                                <div key={index} className="border border-gray-200 rounded-xl p-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-[#ff4037] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-900 text-lg">{diploma.name}</h4>
                                                            <p className="text-gray-600">Obtenu en {diploma.year}</p>
                                                            {professor.is_verified && (
                                                                <div className="flex items-center mt-2 text-green-600 text-sm">
                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                                    </svg>
                                                                    Diplôme vérifié
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <div className="text-6xl mb-4">🎓</div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Diplômes en vérification</h3>
                                                <p className="text-gray-600">Les diplômes de ce professeur sont en cours de validation</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Statistiques */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                                {[
                                    {
                                        value: professor.average_rating || '4.0',
                                        label: 'Évaluation',
                                        icon: '⭐'
                                    },
                                    {
                                        value: professor.total_reviews || '0',
                                        label: 'Avis',
                                        icon: '📝'
                                    },
                                    {
                                        value: professor.completed_sessions || '0',
                                        label: 'Cours',
                                        icon: '🎓'
                                    },
                                    {
                                        value: '100%',
                                        label: 'Assiduité',
                                        icon: '✅'
                                    },
                                    {
                                        value: '99%',
                                        label: 'Réponse',
                                        icon: '💬'
                                    }
                                ].map((stat, index) => (
                                    <div key={index} className="group">
                                        <div className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                                            <span>{stat.icon}</span>
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Avis des étudiants */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex sm:flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">
                                    {professor.reviews?.length || 0} avis
                                </h2>
                                <div className="flex gap-2 overflow-x-auto">
                                    <button className="bg-[#ff4037] text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                                        Tous
                                    </button>
                                    {professor.subjects.map((subject, index) => (
                                        <button
                                            key={index}
                                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:border-gray-400"
                                        >
                                            {subject}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {professor.reviews && professor.reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {professor.reviews.map((review) => (
                                        <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#ff4037] rounded-full flex items-center justify-center text-white font-bold">
                                                        {review.student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{review.student.name}</h4>
                                                        <p className="text-gray-500 text-sm">{review.student.city}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 text-yellow-400">
                                                    {'★'.repeat(review.rating)}
                                                    <span className="text-gray-600 text-sm ml-1">{review.rating}.0</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 mb-3">{review.comment}</p>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">Clarté: </span>
                                                    {review.clarity_rating}/5
                                                </div>
                                                <div>
                                                    <span className="font-medium">Patience: </span>
                                                    {review.patience_rating}/5
                                                </div>
                                                <div>
                                                    <span className="font-medium">Ponctualité: </span>
                                                    {review.punctuality_rating}/5
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">💬</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun avis pour le moment</h3>
                                    <p className="text-gray-600">Soyez le premier à laisser un avis pour ce professeur</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Colonne latérale - 1/3 sur desktop */}
                    <div className="w-full lg:w-4/12">
                        <div className="sticky top-6 space-y-6">
                            {/* Carte de réservation */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                {/* Vidéo de présentation */}
                                <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 h-48">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                                                ▶
                                            </div>
                                            <p className="text-sm opacity-90">Vidéo de présentation</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Options de cours */}
                                <div className="p-6">
                                    {/* Cours d'essai */}
                                    <div className="border border-gray-200 rounded-xl p-4 mb-4 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Cours d'essai</h4>
                                                <p className="text-gray-600 text-sm">Découvrez mon enseignement</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-[#ff4037]">{professor.hourly_rate} Ar</div>
                                                <div className="text-gray-500 text-sm">30 minutes</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cours régulier */}
                                    <div className="border border-gray-200 rounded-xl p-4 mb-6 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Cours particulier</h4>
                                                <p className="text-gray-600 text-sm">Session complète</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-[#ff4037]">{professor.hourly_rate} Ar</div>
                                                <div className="text-gray-500 text-sm">1 heure</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Boutons d'action */}
                                    <button className="w-full bg-[#ff4037] hover:bg-[#e53935] text-white font-semibold py-4 rounded-xl transition-colors mb-3">
                                        Réserver un cours
                                    </button>
                                    <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        Contacter le professeur
                                    </button>
                                </div>
                            </div>

                            {/* Informations rapides */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4">Informations</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                        Disponible maintenant
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        Réponse sous 2 heures
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                        {professor.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessorDetails;