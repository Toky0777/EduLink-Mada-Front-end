import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cover_image from '../../assets/images/cover_image.jpeg';

const PopularTeachers = ({ popularProfessors = [] }) => {
    const navigate = useNavigate();
    const [selectedSubject, setSelectedSubject] = useState('all');

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
        <section className="pt-14 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* En-tête avec titre et filtres */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Choisis parmi nos <span className="text-[#ff4037]">meilleurs professeurs</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                        Découvrez les professeurs les mieux notés par notre communauté étudiante
                    </p>

                    {/* Filtres par matière */}
                    <div className="flex justify-center w-full gap-2 mb-8 flex-wrap">
                        {subjects.map((subject) => (
                            <button
                                key={subject.id}
                                onClick={() => setSelectedSubject(subject.id)}
                                className={`cursor-pointer h-8 px-4 mb-2 flex justify-center items-center text-sm leading-5 font-bold rounded-full transition-all ${selectedSubject === subject.id
                                    ? 'bg-gray-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:shadow-sm'
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

                {/* Grid des professeurs avec design moderne */}
                <div className="flex overflow-x-auto md:flex-wrap md:overflow-visible style_contentAnimation">
                    <style jsx>{`
                        .style_contentAnimation::-webkit-scrollbar {
                            display: none;
                        }
                        .style_contentAnimation {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                    `}</style>

                    {popularProfessors.slice(0, 6).map((professor, index) => (
                        <div
                            key={professor.id}
                            className="w-4/5 shrink-0 px-2 md:px-3 pb-4 md:pb-6 rounded-3xl md:w-1/3 lg:w-1/4 flex-shrink-0"
                        >
                            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                                {/* Section image/video avec overlay */}
                                <div className="relative bg-white rounded-t-2xl overflow-hidden">
                                    <div
                                        className="rounded-t-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600"
                                        style={{ height: '200px' }}
                                    >
                                        <div className="flex items-center relative w-full h-full overflow-hidden">
                                            {!professor.cover_image ? (
                                                <img
                                                    src={cover_image}
                                                    alt={professor.user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white">
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
                                        </div>
                                    </div>

                                    {/* Badge note et nombre de cours */}
                                    <div className="absolute right-3 bottom-3 text-right text-white">
                                        <div className="flex items-center justify-end text-yellow-400 mb-1">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M11.3146 3.63896C11.6255 3.1223 12.3745 3.1223 12.6854 3.63896L15.2814 7.95257C15.3931 8.13818 15.5753 8.27055 15.7864 8.31943L20.691 9.45537C21.2785 9.59142 21.51 10.3038 21.1147 10.7592L17.8144 14.5611C17.6724 14.7246 17.6028 14.9388 17.6215 15.1547L18.0568 20.1703C18.1089 20.7711 17.503 21.2113 16.9477 20.9761L12.3121 19.0122C12.1126 18.9277 11.8874 18.9277 11.6879 19.0122L7.05226 20.9761C6.49703 21.2113 5.89105 20.7711 5.94319 20.1703L6.37848 15.1547C6.39721 14.9388 6.32762 14.7246 6.18561 14.5611L2.88532 10.7592C2.49003 10.3038 2.7215 9.59142 3.30895 9.45537L8.21364 8.31943C8.42468 8.27055 8.60688 8.13818 8.71858 7.95257L11.3146 3.63896Z" />
                                            </svg>
                                            <span className="ml-1 text-white font-semibold">
                                                {professor.average_rating || '5.0'}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium leading-6 text-white bg-black bg-opacity-30 px-2 py-1 rounded">
                                            {professor.total_reviews || '0'} Avis
                                        </p>
                                    </div>
                                </div>

                                {/* Contenu informatif */}
                                <div
                                    className="cursor-pointer bg-white px-4 pt-4 pb-3 rounded-b-2xl flex flex-col"
                                    onClick={() => navigate(`/professors/${professor.id}`)}
                                >
                                    {/* Nom et type de professeur */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex flex-col overflow-hidden flex-1">
                                            <p className="text-sm leading-5 font-bold text-gray-800 truncate">
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
                                                    {renderLevelBars(5)} {/* Niveau maximum pour l'exemple */}
                                                </div>
                                            ))}
                                        </div>
                                        {professor.subjects?.length > 2 && (
                                            <div className="shrink-0 bg-gray-100 rounded-lg text-xs leading-4 font-medium text-gray-500 w-6 h-4 flex items-center justify-center">
                                                +{professor.subjects.length - 2}
                                            </div>
                                        )}
                                    </div>

                                    {/* Prix */}
                                    <div className="mt-3">
                                        <p className="text-xs font-medium leading-4 text-gray-500">
                                            Cours à partir de
                                        </p>
                                        <p className="text-base font-bold text-gray-800 leading-6">
                                            {professor.hourly_rate?.toLocaleString() || '5.000'} Ar/h
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularTeachers;