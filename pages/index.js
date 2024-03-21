"use client"

import PopupCreateSalle from "@/components/popupCreateSalle";
import { useState } from "react";
import checkAuth from "../lib/checkAuth";

export default function Home({ userData }) {
    const [popupCreateIsOpen, setPopupCreateIsOpen] = useState(false);

    return (
        <div className="h-full w-full">
            {popupCreateIsOpen && <PopupCreateSalle userData={userData} onClose={() => setPopupCreateIsOpen(false)} />}
            <section className="bg-gray-900 h-full w-full">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                        <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-2">Wait and See III</h1>
                        <p className="text-lg font-normal text-gray-400 mb-6">un jeu fait part des gens</p>
                        <a href="#" className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-blue-900">
                            En savoir plus
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <a className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 cursor-pointer">
                            <h2 className="text-white text-3xl font-extrabold mb-2">Rejoindre une partie</h2>
                            <p className="text-lg font-normal text-gray-400 mb-4">Rejoignez vos amis ou des inconnus</p>
                        </a>
                        <a onClick={() => setPopupCreateIsOpen(true)} className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 cursor-pointer">
                            <h2 className="text-white text-3xl font-extrabold mb-2">Creer une partie</h2>
                            <p className="text-lg font-normal text-gray-400 mb-4">Cree une partie pour jouer avec vos amis ou avec des inconnus en utilisant soit vos propres cartes ou en utilisant le set original</p>
                        </a>
                    </div>
                </div>
            </section>
            {(popupCreateIsOpen) && <div className="fixed z-40 inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>}
        </div>

    );
}

export async function getServerSideProps(context) {
    return await checkAuth(context);
}