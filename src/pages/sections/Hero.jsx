import React from 'react';
import cover from '../../assets/images/cover_white.png';


const HeroSection = () => {
    return (
        <div className="bg-white sm:px-8 pt-4 pb-6 md:pt-12 md:pb-8">
            <div className="flex items-center m-auto max-w-[1200px] sm:flex-col xl:flex-row md:px-6">
                {/* Left Content */}
                <div className="flex flex-col">
                    <span className="font-bold xl:text-3xl text-gray-800 sm:text-2xl">
                        Excelle dans tes études avec EduLink-Mada
                    </span>

                    <ul className="grid list-none gap-y-4 font-medium text-sm text-gray-600 mt-7">
                        <li className="flex items-center">
                            <div className="shrink-0 me-3">
                                <img
                                    height="12"
                                    width="12"
                                    src="https://scdn.italki.com/ng/static/image/asgardhp/redx2.png"
                                    alt="checkmark"
                                />
                            </div>
                            <span>Prends des cours particuliers sur mesure approuvés par des milliers d'utilisateurs</span>
                        </li>
                        <li className="flex items-center">
                            <div className="shrink-0 me-3">
                                <img
                                    height="12"
                                    width="12"
                                    src="https://scdn.italki.com/ng/static/image/asgardhp/redx2.png"
                                    alt="checkmark"
                                />
                            </div>
                            <span>Apprends avec des professeurs certifiés en accord avec ton budget et ton emploi du temps</span>
                        </li>
                        <li className="flex items-center">
                            <div className="shrink-0 me-3">
                                <img
                                    height="12"
                                    width="12"
                                    src="https://scdn.italki.com/ng/static/image/asgardhp/redx2.png"
                                    alt="checkmark"
                                />
                            </div>
                            <span>Rejoins la première communauté éducative de Madagascar</span>
                        </li>
                    </ul>

                    <div
                        className="bg-[#ff4037] hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg w-max sm:mt-7 transition-colors"
                    >
                        Commence maintenant
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 flex justify-end sm:justify-center sm:mt-8">
                    <picture>
                        <img
                            height="360"
                            width="560"
                            className="max-w-full h-auto"
                            src={cover}
                            alt="Étudiants apprenant avec EduLink-Mada"
                        />
                    </picture>
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 max-w-[1200px] flex justify-center mx-auto">
                <div className="w-full text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {'★'.repeat(5)}
                            </div>
                            <span className="font-semibold">4.9/5</span>
                        </div>
                        <span>•</span>
                        <span>Basé sur 1,458 avis d'étudiants satisfaits</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;