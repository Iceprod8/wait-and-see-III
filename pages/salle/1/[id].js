// /page/salle/1/[id].js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import cardsData from "../../../data/cards.json"
import checkAuth from "../../../lib/checkAuth";
import io from "socket.io-client";
import Image from "next/image";

export default function Salle({ userData, data }) {
    const joueurs = JSON.parse(data[0].joueurs)
    const cards = JSON.parse(data[0].images)
    const router = useRouter();
    const salleId = router.query.id;
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [flippedCards, setFlippedCards] = useState(new Set());
    const [finishFlippedCards, setFinishFlippedCards] = useState(new Set());
    const isHost = joueurs.length > 0 && parseInt(joueurs[0].id) === userData.id;
    const socket = io('https://wait-and-see-iii-server.vercel.app/');

    useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        
      
        socket.on("return_card", (index) => {
            setFlippedCards((prevFlippedCards) => {
                const newFlippedCards = new Set(prevFlippedCards);
                if (!newFlippedCards.has(index)) {
                    newFlippedCards.add(index);
                }
                return newFlippedCards;
            });
            setTimeout(() => {
                setFinishFlippedCards((prevFlippedCards) => {
                    const newFlippedCards = new Set(prevFlippedCards);
                    if (!newFlippedCards.has(index)) {
                        newFlippedCards.add(index);
                    }
                    return newFlippedCards;
                });
            }, 500);
        });
      
        return () => {
          socket.off("return_card");
          socket.close();
        };
      }, []);

    const radius = Math.min(dimensions.width, dimensions.height) * 0.8;
    const center = { x: dimensions.width / 2, y: dimensions.height / 2 };
    const angleStep = 360 / joueurs.length;

    const handleReturnCard = (index) => {
        if (isHost) {
            socket.emit("return_card", index);
        }
    };

    return (
        <WavyBackground className="max-w-4xl mx-auto pb-40">
            <div className="fixed top-0 left-0 w-full h-full flex flex-row items-center justify-center">
                <div id="cards" className="flex items-center justify-center w-full h-full max-w-2xl max-h-full grid grid-cols-12 grid-rows-12 ">
                    <div id="cards-verse" className="relative row-span-12 col-span-5 w-full h-full">
                        {cards.map((el, index) => {
                            const isFlipped = flippedCards.has(index);
                            const finish = finishFlippedCards.has(index)
                            return (
                                <Image
                                    key={index + 1000}
                                    width={1000}
                                    height={1000}
                                    src={el.type == "png" ? (el.images.replace("./public", "")) : ("data:image/png;base64," + el.images)}
                                    className={`absolute ${isFlipped ? "flipped" : ""}`}
                                    alt={`Card ${el.id}`}
                                    style={{
                                        objectFit: "contain",
                                        top: 0,
                                        left: finish ? "0%" : "140%",
                                        transform: isFlipped ? "rotateY(180deg)" : "none",
                                        transition: "transform 0.6s, left 0.6s",
                                        width: "100%",
                                        height: "100%",
                                        zIndex: isFlipped ? 10000 + (cards.length - index) : index
                                    }}
                                />
                            );
                        })}
                    </div>
                    <div className="relative row-span-12 col-span-2">

                    </div>
                    <div id="cards-reverse" className="relative row-span-12 col-span-5 w-full h-full">
                        {cards.map((el, index) => {
                            const isFlipped = flippedCards.has(index);
                            return (
                                <Image
                                    key={index + 10000}
                                    width={1000}
                                    height={1000}
                                    src={"/images/background.png"}
                                    className={`${isFlipped ? "hidden" : "absolute"}`}
                                    alt={`Card ${el.id}`}
                                    onClick={() => handleReturnCard(index)}
                                    style={{
                                        objectFit: "contain",
                                        width: "100%",
                                        height: "100%",
                                        zIndex: index
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                <div>
                    {joueurs.map((joueur, index) => {
                        const angle = angleStep * index;
                        const radian = (angle * Math.PI) / 180;
                        // Ajuster la position x et y sans soustraction supplémentaire pour centrer les éléments
                        const x = center.x + radius * Math.cos(radian) - 50;
                        const y = center.y + radius * Math.sin(radian) - 50;

                        return (
                            <div
                                key={index}
                                className="absolute flex items-center justify-center bg-gray-200 rounded-full text-sm font-medium text-black"
                                style={{
                                    transform: `translate(-50%, -50%)`, // Centrer l"élément sur les coordonnées calculées
                                    left: `${x}px`,
                                    top: `${y}px`,
                                    width: "100px",
                                    height: "100px",
                                }}
                            >
                                {joueur.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        </WavyBackground>
    );
}

// Votre fonction getServerSideProps reste inchangée
export async function getServerSideProps(context) {
    return await checkAuth(context);
}