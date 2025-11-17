// src/pages/ProfessorSearch.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professorAPI } from '../services/api';
import FilterSection from './sections/Filter';
import cover_image from '../assets/images/cover_image.jpeg';

const ProfessorSearch = () => {
    const navigate = useNavigate();
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        subject: '',
        level: '',
        location: '',
        minPrice: '',
        maxPrice: '',
        availability: false,
        verifiedOnly: false
    });
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [pagination, setPagination] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    // Matières disponibles avec compteurs
    const subjects = [
        { id: 'all', name: 'Toutes', count: 0 },
        { id: 'math', name: 'Mathématiques', count: 2597 },
        { id: 'physics', name: 'Physique', count: 1245 },
        { id: 'french', name: 'Français', count: 1893 },
        { id: 'english', name: 'Anglais', count: 2103 },
        { id: 'chemistry', name: 'Chimie', count: 967 },
        { id: 'biology', name: 'Biologie', count: 845 }
    ];

    useEffect(() => {
        loadProfessors();
    }, []);

    const loadProfessors = async (params = {}) => {
        try {
            setLoading(true);
            const response = await professorAPI.getAll(params);
            setProfessors(response.data.data);
            setPagination({
                currentPage: response.data.current_page,
                lastPage: response.data.last_page,
                total: response.data.total,
                perPage: response.data.per_page
            });
        } catch (error) {
            console.error('Error loading professors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const handleFilterSectionChange = (newFilters) => {
        const convertedFilters = {
            subject: newFilters.subject,
            level: newFilters.level,
            location: newFilters.location,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            availability: filters.availability,
            verifiedOnly: filters.verifiedOnly
        };
        setFilters(convertedFilters);
        applyFilters(convertedFilters);
    };

    const applyFilters = (filterParams) => {
        const params = {};
        if (filterParams.subject) params.subject = filterParams.subject;
        if (filterParams.level) params.level = filterParams.level;
        if (filterParams.location) params.location = filterParams.location;
        if (filterParams.minPrice) params.min_price = filterParams.minPrice;
        if (filterParams.maxPrice) params.max_price = filterParams.maxPrice;
        if (filterParams.availability) params.available = true;
        if (filterParams.verifiedOnly) params.verified = true;
        if (searchQuery) params.search = searchQuery;

        loadProfessors(params);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters(filters);
    };

    const clearFilters = () => {
        const resetFilters = {
            subject: '',
            level: '',
            location: '',
            minPrice: '',
            maxPrice: '',
            availability: false,
            verifiedOnly: false
        };
        setFilters(resetFilters);
        setSelectedSubject('all');
        setSearchQuery('');
        loadProfessors();
    };

    // Fonction pour générer les barres de niveau
    const renderLevelBars = (level) => {
        const bars = [];
        for (let i = 0; i < 6; i++) {
            bars.push(
                <span
                    key={i}
                    className={`rounded-sm w-0.5 h-2.5 ml-0.5 ${i < level ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                />
            );
        }
        return <div className="flex items-center ml-1">{bars}</div>;
    };

    return (
        <div className="min-h-screen bg-gray-50 my-6">
            {/* Hero Section moderne */}
            <div className="text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">
                            Trouvez le professeur <span className="text-[#ff4037]">parfait</span>
                        </h1>
                    </div>

                    {/* FilterSection */}
                    <div className="max-w-4xl mx-auto">
                        <FilterSection onFilterChange={handleFilterSectionChange} />
                    </div>

                    {/* Filtres par matière - Design inspiré de PopularTeachers */}
                    <div className="max-w-6xl mx-auto mt-8">
                        <div className="flex justify-center w-full gap-2 flex-wrap">
                            {subjects.map((subject) => (
                                <button
                                    key={subject.id}
                                    onClick={() => setSelectedSubject(subject.id)}
                                    className={`cursor-pointer h-10 px-6 mb-2 flex justify-center items-center text-sm leading-5 font-bold rounded-full transition-all ${selectedSubject === subject.id
                                        ? 'bg-gray-600 text-white shadow-lg'
                                        : ' bg-opacity-20 text-gray-700 border border-gray-700 border-opacity-30 hover:bg-opacity-30'
                                        }`}
                                >
                                    <span>{subject.name}</span>
                                    <span className="ml-2 text-xs opacity-80">
                                        ({subject.count})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="container mx-auto px-4 py-8">
                {/* En-tête résultats */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 hidden sm:block">
                            {professors.length} résultats affichés
                        </span>
                        <select className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>Trier par: Pertinence</option>
                            <option>Note décroissante</option>
                            <option>Prix croissant</option>
                            <option>Prix décroissant</option>
                            <option>Expérience</option>
                        </select>
                    </div>
                </div>

                {/* Liste des professeurs - Design inspiré de PopularTeachers */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm animate-pulse overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                                <div className="p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-gray-300 rounded"></div>
                                        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : professors.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Aucun professeur trouvé
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Essayez de modifier vos critères de recherche ou d'élargir vos filtres
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={clearFilters}
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Grille des professeurs - Design moderne */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {professors.map((professor) => (
                                <div
                                    key={professor.id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                                    onClick={() => navigate(`/professors/${professor.id}`)}
                                >
                                    {/* Section image avec overlay */}
                                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-40">
                                        {!professor.cover_image ? (
                                            <img
                                                src={cover_image}
                                                alt={professor.user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                                <div className="text-center">
                                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold mb-2">
                                                        {professor.user.name.charAt(0)}
                                                    </div>
                                                    <p className="text-sm font-medium">{professor.user.name}</p>
                                                </div>
                                            </div>
                                        )}
                                        {/* Overlay avec bouton play */}
                                        <div className="absolute top-0 left-0 right-0 bottom-0">
                                            <div
                                                className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{ background: 'rgba(0, 0, 0, 0.3)' }}
                                            >
                                                <svg
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 60 60"
                                                    fill="none"
                                                    className="absolute bottom-3 left-3"
                                                >
                                                    <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="4" />
                                                    <path
                                                        d="M26.1094 18.0729C24.7803 17.1869 23 18.1396 23 19.737V40.263C23 41.8604 24.7803 42.8131 26.1094 41.9271L41.5038 31.6641C42.6913 30.8725 42.6913 29.1275 41.5038 28.3359L26.1094 18.0729Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Badge note */}
                                        <div className="absolute right-3 top-3">
                                            <div className="flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="text-yellow-400 mr-1"
                                                >
                                                    <path d="M11.3146 3.63896C11.6255 3.1223 12.3745 3.1223 12.6854 3.63896L15.2814 7.95257C15.3931 8.13818 15.5753 8.27055 15.7864 8.31943L20.691 9.45537C21.2785 9.59142 21.51 10.3038 21.1147 10.7592L17.8144 14.5611C17.6724 14.7246 17.6028 14.9388 17.6215 15.1547L18.0568 20.1703C18.1089 20.7711 17.503 21.2113 16.9477 20.9761L12.3121 19.0122C12.1126 18.9277 11.8874 18.9277 11.6879 19.0122L7.05226 20.9761C6.49703 21.2113 5.89105 20.7711 5.94319 20.1703L6.37848 15.1547C6.39721 14.9388 6.32762 14.7246 6.18561 14.5611L2.88532 10.7592C2.49003 10.3038 2.7215 9.59142 3.30895 9.45537L8.21364 8.31943C8.42468 8.27055 8.60688 8.13818 8.71858 7.95257L11.3146 3.63896Z" />
                                                </svg>
                                                <span className="font-semibold">
                                                    {professor.average_rating || '5.0'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Badge disponibilité */}
                                        {professor.is_available && (
                                            <div className="absolute left-3 top-3 flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded-full">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                En ligne
                                            </div>
                                        )}
                                    </div>

                                    {/* Contenu informatif */}
                                    <div className="p-4">
                                        {/* Nom et type de professeur */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex flex-col overflow-hidden flex-1">
                                                <p className="text-base leading-5 font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                                                    {professor.user.name}
                                                </p>
                                                <p className="text-gray-500 text-xs leading-4 font-medium mt-1">
                                                    {professor.is_verified ? 'Professeur certifié' : 'Tuteur communautaire'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Matières enseignées avec niveaux */}
                                        <div className="mt-2 flex justify-between items-center min-h-5 overflow-hidden w-full gap-2">
                                            <div className="flex gap-3 shrink-0 flex-1 overflow-hidden">
                                                {professor.subjects?.slice(0, 2).map((subject, idx) => (
                                                    <div key={idx} className="flex shrink-0 items-center">
                                                        <span className="text-xs font-medium text-gray-700 mr-1">
                                                            {subject}
                                                        </span>
                                                        {renderLevelBars(5)}
                                                    </div>
                                                ))}
                                            </div>
                                            {professor.subjects?.length > 2 && (
                                                <div className="shrink-0 bg-gray-100 rounded-lg text-xs leading-4 font-medium text-gray-500 w-6 h-4 flex items-center justify-center">
                                                    +{professor.subjects.length - 2}
                                                </div>
                                            )}
                                        </div>

                                        {/* Informations supplémentaires */}
                                        <div className="mt-3 space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center justify-between">
                                                <span>Expérience</span>
                                                <span className="font-medium text-gray-900">{professor.experience_years} ans</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Localisation</span>
                                                <span className="font-medium text-gray-900">{professor.location}</span>
                                            </div>
                                        </div>

                                        {/* Prix */}
                                        <div className="mt-4 pt-3 border-t border-gray-200">
                                            <p className="text-xs font-medium leading-4 text-gray-500">
                                                Cours à partir de
                                            </p>
                                            <p className="text-lg font-bold text-gray-800 leading-6">
                                                {parseInt(professor.hourly_rate).toLocaleString()} Ar/h
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.lastPage > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    disabled={pagination.currentPage === 1}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >
                                    ← Précédent
                                </button>

                                {[...Array(pagination.lastPage)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`px-4 py-2 rounded-lg transition-colors ${pagination.currentPage === index + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    disabled={pagination.currentPage === pagination.lastPage}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >
                                    Suivant →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfessorSearch;