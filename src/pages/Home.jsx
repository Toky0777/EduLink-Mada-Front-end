import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professorAPI, statsAPI } from '../services/api';
import HeroSection from './sections/Hero';
import FilterSection from './sections/Filter';
import PopularTeachers from './sections/PopularTeachers';


const Home = () => {
    const [popularProfessors, setPopularProfessors] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadHomeData();
    }, []);

    const loadHomeData = async () => {
        try {
            const [professorsResponse, statsResponse] = await Promise.all([
                professorAPI.getPopular(),
                statsAPI.platform()
            ]);

            setPopularProfessors(professorsResponse.data);
            setStats(statsResponse.data);
        } catch (error) {
            console.error('Error loading home data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (filters) => {
        navigate('/search', { state: { filters } });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section inspirée par italki */}
            <section className="*">
                <HeroSection />
            </section>

            {/* Filter section */}
            <FilterSection />

            {/* Professeurs populaires - Section immédiatement après le Hero */}
            <PopularTeachers popularProfessors={popularProfessors} onSearch={handleSearch} />
            {/* Bouton Voir plus et statistiques */}
            <div className="text-center mt-12 bg-white">
                <div className="bg-white rounded-2xl p-8 inline-flex flex-col lg:flex-row items-center gap-8 shadow-md border border-gray-100">
                    {/* Statistiques épurées */}
                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#ff4037] mb-1">
                                {stats?.total_professors || 0}+
                            </div>
                            <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                                Profs
                            </div>
                        </div>

                        <div className="w-px h-8 bg-gray-200"></div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800 mb-1">
                                {stats?.total_students || 0}+
                            </div>
                            <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                                Étudiants
                            </div>
                        </div>

                        <div className="w-px h-8 bg-gray-200"></div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-700 mb-1">
                                {stats?.completed_appointments || 0}+
                            </div>
                            <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                                Cours
                            </div>
                        </div>
                    </div>

                    {/* Bouton simple et efficace */}
                    <button
                        onClick={() => navigate('/search')}
                        className="bg-[#ff4037] hover:bg-[#e53935] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap border border-[#ff4037] hover:border-[#e53935]"
                    >
                        Explorer les {stats?.total_professors || 0}+ profs
                    </button>
                </div>
            </div>

            {/* Section Comment ça marche - Refonte moderne */}
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                            Comment ça <span className="text-[#ff4037]">fonctionne</span> ?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Découvrez comment trouver le professeur parfait en seulement 3 étapes simples
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: (
                                    <div className="w-20 h-20 bg-[#ff4037] rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-[#ff4037]/25">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                        </svg>
                                    </div>
                                ),
                                title: 'Trouvez votre expert',
                                description: 'Parcourez notre sélection de professeurs qualifiés, vérifiez leurs avis et trouvez celui qui correspond à vos besoins',
                                steps: ['Recherche avancée', 'Filtres par matière', 'Profils vérifiés']
                            },
                            {
                                icon: (
                                    <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                                        </svg>
                                    </div>
                                ),
                                title: 'Planifiez ensemble',
                                description: 'Échangez directement avec le professeur, discutez de vos objectifs et planifiez vos sessions en toute simplicité',
                                steps: ['Messagerie instantanée', 'Calendrier intégré', 'Flexibilité horaire']
                            },
                            {
                                icon: (
                                    <div className="w-20 h-20 bg-gray-700 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                    </div>
                                ),
                                title: 'Apprenez et progressez',
                                description: 'Suivez vos cours avec un accompagnement personnalisé et constatez vos progrès grâce à un suivi régulier',
                                steps: ['Cours sur mesure', 'Suivi des progrès', 'Support continu']
                            }
                        ].map((step, index) => (
                            <div key={index} className="group">
                                <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group-hover:border-[#ff4037]/20 h-full flex flex-col">
                                    {/* Numéro d'étape */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="text-2xl font-bold text-gray-300 group-hover:text-[#ff4037] transition-colors duration-300">
                                            0{index + 1}
                                        </div>
                                        <div className="w-8 h-0.5 bg-gray-200 group-hover:bg-[#ff4037] transition-colors duration-300"></div>
                                    </div>

                                    {/* Icône */}
                                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                        {step.icon}
                                    </div>

                                    {/* Contenu */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#ff4037] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                        {step.description}
                                    </p>

                                    {/* Étapes détaillées */}
                                    <div className="space-y-2">
                                        {step.steps.map((item, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-gray-500">
                                                <div className="w-1.5 h-1.5 bg-[#ff4037] rounded-full mr-3"></div>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Témoignages - Refonte moderne */}
            <section className="py-20 bg-white relative overflow-hidden">
                {/* Élément décoratif */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4037]/5 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-100 rounded-full -translate-x-24 translate-y-24"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
                            Ils nous <span className="text-[#ff4037]">font confiance</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Découvrez les expériences de nos étudiants et professeurs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                name: "Sophie R.",
                                role: "Parent d'élève",
                                course: "Mathématiques Terminale",
                                text: "Mon fils a gagné 4 points de moyenne en seulement 2 mois. La qualité des professeurs et le suivi personnalisé ont fait toute la différence !",
                                rating: 5,
                                avatar: "SR",
                                highlight: "4 points de moyenne gagnés"
                            },
                            {
                                name: "Thomas M.",
                                role: "Étudiant en médecine",
                                course: "Physique-Chimie",
                                text: "Les explications sont tellement claires et le professeur est d'une patience infinie. J'ai enfin compris des concepts qui me paraissaient impossibles.",
                                rating: 5,
                                avatar: "TM",
                                highlight: "Compréhension des concepts complexes"
                            },
                            {
                                name: "Laura K.",
                                role: "Professionnelle en reconversion",
                                course: "Soutien scolaire multidisciplinaire",
                                text: "La flexibilité des horaires est parfaite pour mon emploi du temps chargé. Les professeurs sont compétents et très professionnels.",
                                rating: 5,
                                avatar: "LK",
                                highlight: "Flexibilité des horaires"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="group">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full flex flex-col relative overflow-hidden">
                                    {/* Fond décoratif */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff4037]/5 rounded-full -translate-y-12 translate-x-12"></div>

                                    {/* En-tête */}
                                    <div className="flex items-start mb-6 relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-[#ff4037] to-[#ff6b61] rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                                            {testimonial.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                                            <p className="text-[#ff4037] text-sm font-medium mb-1">{testimonial.role}</p>
                                            <p className="text-gray-500 text-sm">{testimonial.course}</p>
                                        </div>
                                    </div>

                                    {/* Citation */}
                                    <div className="relative z-10 flex-grow">
                                        <div className="text-6xl text-[#ff4037]/20 font-serif absolute -top-4 -left-2">"</div>
                                        <p className="text-gray-700 leading-relaxed relative z-10 italic mb-6">
                                            {testimonial.text}
                                        </p>
                                    </div>

                                    {/* Points forts */}
                                    <div className="bg-[#ff4037]/5 rounded-xl p-4 mb-6 relative z-10">
                                        <div className="flex items-center text-sm">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff4037" className="mr-2">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                            <span className="text-gray-800 font-medium">{testimonial.highlight}</span>
                                        </div>
                                    </div>

                                    {/* Note */}
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex text-[#ff4037]">
                                            {'★'.repeat(testimonial.rating)}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            Avis vérifié
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bandeau de confiance */}
                    <div className="mt-12 bg-gray-900 rounded-2xl p-8 text-center">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                            {[
                                { text: "Professeurs vérifiés", icon: "✓" },
                                { text: "Paiement sécurisé", icon: "🔒" },
                                { text: "Support 7j/7", icon: "💬" },
                                { text: "Satisfaction garantie", icon: "⭐" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-center text-white">
                                    <span className="text-2xl mr-3">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final - Refonte moderne */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                {/* Éléments décoratifs */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#ff4037]/10 rounded-full -translate-x-36 -translate-y-36"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff4037]/5 rounded-full translate-x-48 translate-y-48"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center bg-[#ff4037] text-white rounded-full px-6 py-3 mb-8 shadow-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="font-semibold">Rejoignez +5,000 étudiants satisfaits</span>
                        </div>

                        {/* Titre principal */}
                        <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                            Prêt à <span className="text-[#ff4037]">transformer</span><br />
                            votre apprentissage ?
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Rejoignez la première communauté éducative de Madagascar et donnez le meilleur à votre réussite
                        </p>

                        {/* Actions principales */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                            <button
                                onClick={() => navigate('/auth?tab=register')}
                                className="group bg-[#ff4037] hover:bg-[#e53935] text-white font-bold text-lg px-12 py-5 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center gap-4 min-w-[280px] justify-center"
                            >
                                <span>Commencer gratuitement</span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="transform group-hover:translate-x-1 transition-transform"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>

                            <button
                                onClick={() => navigate('/search')}
                                className="group bg-transparent border-2 border-white/30 hover:border-white text-white font-semibold text-lg px-12 py-5 rounded-2xl transition-all duration-300 hover:bg-white/10 flex items-center gap-4 min-w-[280px] justify-center backdrop-blur-sm"
                            >
                                <span>Explorer les professeurs</span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="transform group-hover:translate-x-1 transition-transform"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;