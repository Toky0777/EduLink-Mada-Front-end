import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                {/* Section principale */}
                <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[#ff4037] rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">E</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">EduLink-Mada</h3>
                                <p className="text-gray-400 text-sm">Connectons l'éducation</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm">
                            La plateforme de référence pour l'éducation à Madagascar.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold mb-3 text-white text-sm">Navigation</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                {['Accueil', 'Professeurs', 'Cours', 'Tarifs'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-[#ff4037] transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 text-white text-sm">Légal</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                {['Confidentialité', 'Conditions', 'Mentions'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="hover:text-[#ff4037] transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-3 text-white text-sm">Contact</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                            <div>contact@edulink.mg</div>
                            <div>+261 34 12 345 67</div>
                            <div className="flex gap-3 mt-3">
                                {['FB', 'IG', 'IN'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-xs hover:bg-[#ff4037] transition-colors"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 py-4 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2024 EduLink-Mada. Fierté malgache.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;