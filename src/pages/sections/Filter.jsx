// src/components/common/FilterSection.jsx
import React, { useState } from 'react';

const FilterSection = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        subject: '',
        level: '',
        location: ''
    });

    const subjects = [
        { value: 'math', label: 'Mathématiques', icon: '🧮' },
        { value: 'physics', label: 'Physique', icon: '⚛️' },
        { value: 'french', label: 'Français', icon: '🇫🇷' },
        { value: 'english', label: 'Anglais', icon: '🇬🇧' },
        { value: 'chemistry', label: 'Chimie', icon: '🧪' },
        { value: 'biology', label: 'Biologie', icon: '🧬' },
        { value: 'history', label: 'Histoire-Géo', icon: '📜' },
        { value: 'malagasy', label: 'Malagasy', icon: '🇲🇬' }
    ];

    const levels = [
        { value: 'primary', label: 'Primaire' },
        { value: 'college', label: 'Collège' },
        { value: 'lycee', label: 'Lycée' },
        { value: 'university', label: 'Université' }
    ];

    const locations = [
        { value: 'tana', label: 'Antananarivo' },
        { value: 'tamatave', label: 'Toamasina' },
        { value: 'fianar', label: 'Fianarantsoa' },
        { value: 'majunga', label: 'Mahajanga' },
        { value: 'tulear', label: 'Toliara' },
        { value: 'online', label: 'En ligne' },
        { value: 'all', label: 'Partout à Madagascar' }
    ];

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);

        // Notifier le parent du changement
        if (onFilterChange) {
            onFilterChange(newFilters);
        }
    };

    const handleSearch = () => {
        // La recherche est maintenant déclenchée automatiquement par les changements de filtre
        console.log('Recherche avec filtres:', filters);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Container Principal */}
            <div className="bg-white rounded-full shadow-2xl border border-white p-1 flex items-stretch gap-1">

                {/* Matière avec icône */}
                <div className="flex-1 min-w-0 relative group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
                        <span className="text-lg">📚</span>
                        <select
                            value={filters.subject}
                            onChange={(e) => handleFilterChange('subject', e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 text-sm appearance-none cursor-pointer"
                        >
                            <option value="">Choisir une matière</option>
                            {subjects.map((subject) => (
                                <option key={subject.value} value={subject.value}>
                                    {subject.label}
                                </option>
                            ))}
                        </select>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div className="w-px h-8 bg-gray-300 my-auto"></div>

                {/* Niveau */}
                <div className="flex-1 min-w-0 relative group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
                        <span className="text-lg">🎓</span>
                        <select
                            value={filters.level}
                            onChange={(e) => handleFilterChange('level', e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 text-sm appearance-none cursor-pointer"
                        >
                            <option value="">Niveau scolaire</option>
                            {levels.map((level) => (
                                <option key={level.value} value={level.value}>
                                    {level.label}
                                </option>
                            ))}
                        </select>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div className="w-px h-8 bg-gray-300 my-auto"></div>

                {/* Localisation */}
                <div className="flex-1 min-w-0 relative group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
                        <span className="text-lg">📍</span>
                        <select
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 text-sm appearance-none cursor-pointer"
                        >
                            <option value="">Localisation</option>
                            {locations.map((location) => (
                                <option key={location.value} value={location.value}>
                                    {location.label}
                                </option>
                            ))}
                        </select>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Bouton Search */}
                <button
                    onClick={handleSearch}
                    className="bg-[#ff4037] hover:bg-[#e53935] text-white p-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center min-w-[56px] group"
                    title="Rechercher"
                >
                    <svg
                        className="w-6 h-6 transform group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>

            {/* Indicateur de filtres actifs */}
            {(filters.subject || filters.level || filters.location) && (
                <div className="flex items-center gap-2 mt-4 justify-center flex-wrap">
                    <span className="text-sm text-gray-500 font-medium">Filtres actifs:</span>
                    {filters.subject && (
                        <span className="bg-gray-500 bg-opacity-20 text-gray-700 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                            {subjects.find(s => s.value === filters.subject)?.label}
                        </span>
                    )}
                    {filters.level && (
                        <span className="bg-gray-500 bg-opacity-20 text-gray-700 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                            {levels.find(l => l.value === filters.level)?.label}
                        </span>
                    )}
                    {filters.location && (
                        <span className="bg-gray-500 bg-opacity-20 text-gray-700 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                            {locations.find(l => l.value === filters.location)?.label}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterSection;