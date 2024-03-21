"use client"
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
    const [pseudo, setPseudo] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorForm, setErrorForm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pseudo, email, password, confirmPassword }),
            });
            const data = await response.json();
            setErrorForm(data.message);
        } catch (error) {
            setErrorForm("une erreur est survenue")
        }
    };
    return (
        <section className="h-full w-full bg-gradient-to-r from-slate-100 to-slate-200">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            S&apos;incrire pour Wait and see
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="pseudo" className="block mb-2 text-sm font-medium text-gray-900">Votre Pseudo</label>
                                <input onChange={(e) => setPseudo(e.target.value)} type="pseudo" name="pseudo" id="pseudo" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="pseudo" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Votre email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mot de passe</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" required="" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirmer votre mot de passe</label>
                                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" required="" />
                            </div>
                            {errorForm && errorForm.length > 0 && (<p className="text-red-500">{errorForm}</p>)}
                            <button onClick={handleSubmit} type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">S&apos;incrire</button>
                            <p className="text-sm font-light text-gray-500">Vous avez déjà un compte? <Link href="/login" className="font-medium text-purple-600 hover:underline">Se connecter</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}