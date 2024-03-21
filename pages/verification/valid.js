import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import checkAuth from "@/lib/checkAuth";
import Image from "next/image";

export default function Valid({ userData }) {
    const [isAnimating, setIsAnimating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const animationTimer = setTimeout(() => {
            setIsAnimating(true);
        }, 500);
        const redirectTimer = setTimeout(() => {
            router.push("/");
        }, 5000);

        return () => {
            clearTimeout(animationTimer);
            clearTimeout(redirectTimer);
        };
    }, [router]);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-gradient-to-r from-slate-100 to-slate-200">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                <h5 className="mb-4 flex flex-row items-center justify-center text-2xl font-bold tracking-tight text-gray-900 gap-1">
                    <div className={`flex flex-row relative ${isAnimating ? "animating" : ""}`}>
                        <span className={`${isAnimating ? "absolute" : "hidden"} crossIcon`}>
                            <Image width="24" height="24" src="https://img.icons8.com/emoji/48/cross-mark-emoji.png" alt="cross-mark-emoji" />
                        </span>
                        <span className={`${isAnimating ? "hidden" : "absolute"} checkIcon`}>
                            <Image width="24" height="24" src="https://img.icons8.com/emoji/48/check-mark-emoji.png" alt="check-mark-emoji" />
                        </span>
                    </div>
                    Votre compte a été valider
                </h5>
                <p className="mb-3 font-normal text-gray-700">Vous allez être redirigé dans un instant.</p>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    return await checkAuth(context);
}