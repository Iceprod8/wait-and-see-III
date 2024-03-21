'use client'
import { useState } from "react";

export default function PopupCreateSalle({ userData, onClose }) {
    const [files, setFiles] = useState([]);
    const [transformX, setTransformX] = useState("0%");
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedPseudo, setSelectedPseudo] = useState([]);
    const [type, setType] = useState("Type de partie")
    const [nomSalle, setNomSalle] = useState()
    const [mdpSalle, setMdpSalle] = useState()

    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
    };
    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };
    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop();
        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return (<svg className="w-8 h-8 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
            case 'svg':
                return (<svg className="w-8 h-8 mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l-2 2m0 0L5 6 3 8m4 0h12a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2m12 0l-2 2m0 0l2 2m0-2H7m12 0l2 2m-2-2l2-2" /></svg>);
            default:
                return (<svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 5l9-5-9-5-9 5 9 5z" /></svg>);
        }
    };
    const handleKeyPress = (e) => {
        const trimmedText = searchText.trim();
        if (e.key === 'Enter' && trimmedText) {
            e.preventDefault();
            addOrRemovePseudo(trimmedText);
            setSearchText('');
        }
    };
    const addOrRemovePseudo = (pseudo) => {
        setSelectedPseudo(prevPseudos => {
            if (prevPseudos.includes(pseudo)) {
                return prevPseudos.filter(c => c !== pseudo);
            } else {
                if (prevPseudos.length < 8) {
                    return [...prevPseudos, pseudo];
                } else {
                    return prevPseudos;
                }
            }
        });
    };
    const supSelectedPseudo = (element) => {
        addOrRemovePseudo(element)
    };

    const isDisabled = !(selectedPseudo && selectedPseudo.length >= 4);

    const handleSelectionSet = async () => {
        setType("Type de partie")
        document.querySelector('#selectionSet').classList.add('hidden');
        document.querySelector('#selectionImgPerso').classList.add('hidden');
        document.querySelector('#selectionPersoType').classList.add('hidden');
        document.querySelector('#selectionPerso').classList.add('hidden');
        document.querySelector('#selectionFinal').classList.add('hidden');
        setTransformX("-40%");
        document.querySelector('#selectionSet').classList.remove('hidden');
        await new Promise(resolve => setTimeout(resolve, 10));
        setTransformX("0%");
    }


    const handleCustomizeClick = async (retour) => {
        setType("Selection des images")
        document.querySelector('#selectionSet').classList.add('hidden');
        document.querySelector('#selectionImgPerso').classList.add('hidden');
        document.querySelector('#selectionPersoType').classList.add('hidden');
        document.querySelector('#selectionPerso').classList.add('hidden');
        document.querySelector('#selectionFinal').classList.add('hidden');
        setTransformX(retour === false ? "40%" : "-40%");
        document.querySelector('#selectionImgPerso').classList.remove('hidden');
        await new Promise(resolve => setTimeout(resolve, 10));
        setTransformX("0%");
    };

    const handleSelectionPersoType = async (retour) => {
        setType("Type de jeu")
        document.querySelector('#selectionSet').classList.add('hidden');
        document.querySelector('#selectionImgPerso').classList.add('hidden');
        document.querySelector('#selectionPersoType').classList.add('hidden');
        document.querySelector('#selectionPerso').classList.add('hidden');
        document.querySelector('#selectionFinal').classList.add('hidden');
        setTransformX(retour === false ? "40%" : "-40%");
        document.querySelector('#selectionPersoType').classList.remove('hidden');
        await new Promise(resolve => setTimeout(resolve, 10));
        setTransformX("0%");
    };

    const handleSelectionPerso = async (retour) => {
        setType("Nombre de joueurs")
        document.querySelector('#selectionSet').classList.add('hidden');
        document.querySelector('#selectionImgPerso').classList.add('hidden');
        document.querySelector('#selectionPersoType').classList.add('hidden');
        document.querySelector('#selectionPerso').classList.add('hidden');
        document.querySelector('#selectionFinal').classList.add('hidden');
        setTransformX(retour === false ? "40%" : "-40%");
        document.querySelector('#selectionPerso').classList.remove('hidden');
        await new Promise(resolve => setTimeout(resolve, 10));
        setTransformX("0%");
    };

    const handleFinalSelection = async (retour) => {
        setType("Parametre")
        document.querySelector('#selectionSet').classList.add('hidden');
        document.querySelector('#selectionImgPerso').classList.add('hidden');
        document.querySelector('#selectionPersoType').classList.add('hidden');
        document.querySelector('#selectionPerso').classList.add('hidden');
        document.querySelector('#selectionFinal').classList.add('hidden');
        setTransformX(retour === false ? "40%" : "-40%");
        document.querySelector('#selectionFinal').classList.remove('hidden');
        await new Promise(resolve => setTimeout(resolve, 10));
        setTransformX("0%");
    }

    const createSalle = async () => {
        const formData = new FormData(); // Utilisez FormData pour gérer les fichiers
        formData.append('nomSalle', nomSalle || "Salle_" + Math.floor(Math.random() * 1000));
        formData.append('mdpSalle', mdpSalle || "");
        files.forEach(file => formData.append('files', file)); // Ajoutez chaque fichier à formData
        formData.append('joueurs', JSON.stringify(selectedPseudo.length > 0 ? selectedPseudo : [{name:"IdentifiantUtilisateur"}]));
        formData.append('proprietaire', userData.id);
        try {
            const response = await fetch('/api/createSalle', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Erreur de création de la salle');
            }
            const salleCree = await response.json();
            window.location.href = salleCree.url;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
            <div className="relative p-4 w-full max-w-2xl">
                <div className="relative rounded-lg shadow bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <h3 className="text-lg font-semibold text-white">
                            {type}
                        </h3>
                        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <div>
                            <div id="selectionSet" className="transition-popup" style={{ transform: `translateX(${transformX})`}}>
                                <p className="text-gray-400 mb-4">Selectionner votre set de carte</p>
                                <ul className="space-y-4 mb-4">
                                    <li>
                                        <input type="radio" id="job-1" name="job" value="job-1" className="hidden peer" required />
                                        <label htmlFor="job-1" onClick={() => { handleCustomizeClick(false)}} className="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-500 peer-checked:text-blue-500 peer-checked:border-blue-600 text-white bg-gray-600 hover:bg-gray-500">
                                            <div className="block">
                                                <div className="w-full text-lg font-semibold">Personnaliser</div>
                                            </div>
                                            <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="job-2" name="job" value="job-2" className="hidden peer" />
                                        <label htmlFor="job-2" onClick={() => { handleSelectionPersoType(false) }} className="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer hover:text-gray-300 border-gray-500 peer-checked:text-blue-500 peer-checked:border-blue-600 text-white bg-gray-600 hover:bg-gray-500">
                                            <div className="block">
                                                <div className="w-full text-lg font-semibold">Standard</div>
                                            </div>
                                            <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div id="selectionImgPerso" className="hidden transition-popup" style={{ transform: `translateX(${transformX})` }}>
                                <div className="pb-5">
                                    <h1>Veuillez mettre une ou plusieurs images</h1>
                                    {files.length > 0 && (
                                        <div className="max-w-96 text-sm/[12px]">
                                            <span>Vous avez sélectionné <span className="text-green-500">{files.length} images.</span></span>
                                            <span className="relative inline-block"
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}>
                                                <span className="cursor-pointer text-blue-500">*</span>
                                                {isHovered && (
                                                    <span className="absolute z-50 left-full top-0 ml-2 block w-64 text-xs bg-gray-700 p-2 border border-gray-200 rounded shadow-lg">
                                                        il est le meilleur serait d'avoir 59 mais vous pouvez en avoir moins ou plus c'est vous qui voyez le reste si il en manque sera remplacé par des cartes du set originel.
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-center justify-center w-full gap-6">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-gray-700 hover:bg-gray-100 border-gray-600 hover:border-gray-500 hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click pour ajouter</span> ou glisser déposer</p>
                                            <p className="text-xs text-gray-400">SVG, PNG, JPG ou GIF</p>
                                        </div>
                                        <input type="file" onChange={handleFileChange} className="hidden" id="dropzone-file" multiple />
                                    </label>
                                    <div className="grid grid-cols-4 gap-4 overflow-x-auto max-h-80">
                                        {files.map((file, index) => (
                                            <div key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className="relative flex flex-row justify-center items-center group">
                                                <button onClick={() => removeFile(index)} className="flex flex-col items-center border border-1 rounded-md border-slate-500 w-20 p-2">
                                                    {getFileIcon(file.name)}
                                                    <p className="truncate max-w-[80px]">{file.name.length > 7 ? `${file.name.replace(/(.svg|.png|.jpg|.gif)/g, '').substring(0, 5)}...` : file.name.replace(/(.svg|.png|.jpg|.gif)/g, '')}</p>
                                                </button>
                                                {hoveredIndex === index && (
                                                    <div onClick={() => removeFile(index)} className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 flex justify-center items-center cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-row items-center justify-center m-1 w-full gap-6">
                                        <button onClick={() => {handleSelectionSet()}} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Retour
                                            </span>
                                        </button>
                                        <button onClick={() => {handleSelectionPersoType(false)}} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Suite
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div id="selectionPersoType" className="hidden transition-popup flex flex-col" style={{ transform: `translateX(${transformX})` }}>
                                <div className="flex flex-row">
                                    <button onClick={() => { handleFinalSelection(false) }} class="w-full max-w-2xl flex flex-col justify-center items-center block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-600">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">Un joueur pour un seul ordinateur</h5>
                                        <img className="h-40 w-40" src="/images/solo.png" alt="Solo Player" />
                                    </button>
                                    <button onClick={() => { handleSelectionPerso(false) }} class="w-full max-w-2xl flex flex-col justify-center items-center block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-600">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">Plusieurs joueurs pour un seul ordinateur</h5>
                                        <img className="h-40 w-40" src="/images/multijoueur.png" alt="Multiplayer Player" />
                                    </button>
                                </div>
                                <div className='flex flex-row items-center justify-center mt-6 w-full gap-6'>
                                    <button
                                        type="button"
                                        onClick={() => {handleCustomizeClick(true)}}
                                        className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800 ${isDisabled ? 'disabled:bg-gray-300 disabled:cursor-not-allowed' : ''}`}
                                    >
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                            Retour
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div id="selectionPerso" className="hidden transition-popup" style={{ transform: `translateX(${transformX})` }}>
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-center items-center grid md:grid-cols-4 xl:grid-cols-4 gap-6 overflow-hidden w-full h-[300px] px-5 py-12 sm:px-6 lg:px-8 rounded-lg">
                                        <div className='flex flex-col w-full col-span-4 gap-2 justify-center items-center'>
                                            <div className="relative w-full flex flex-row">
                                                <input type="search" id="search-dropdown" aria-describedby="floating_helper_text" className="block rounded-l-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={e => setSearchText(e.target.value)} onKeyPress={handleKeyPress} value={searchText} />
                                                <label htmlFor="search-dropdown" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Peusdo</label>
                                                <button
                                                    onClick={() => searchText.trim() && addOrRemovePseudo(searchText.trim())}
                                                    disabled={selectedPseudo.length >= 8}
                                                    style={{ paddingBottom: "15px", paddingTop: "15px" }}
                                                    type="submit"
                                                    className={`px-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ${selectedPseudo.length >= 8 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >                                                    <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p id="floating_helper_text" className="w-full mb-1 text-xs text-gray-500">Minimum 4 joueurs et maximum 8 joueurs.</p>
                                        </div>
                                        {selectedPseudo.length > 0 && selectedPseudo.map((element) => (
                                            <button onClick={() => supSelectedPseudo(element)} key={element} className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800'>
                                                <span className="relative px-5 py-2.5 w-full transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    {element.slice(0, 10)}{element.length > 10 && "..."}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className='flex flex-row items-center justify-center mt-6 w-full gap-6'>
                                        <button
                                            type="button"
                                            onClick={() => {handleSelectionPersoType(true)}}
                                            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800`}
                                        >
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Retour
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {handleFinalSelection(false)}}
                                            disabled={isDisabled}
                                            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800 ${isDisabled ? 'disabled:bg-gray-300 disabled:cursor-not-allowed' : ''}`}
                                        >
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Suite
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div id="selectionFinal" className="hidden transition-popup" style={{ transform: `translateX(${transformX})` }}>
                                <div>
                                    <div className="flex flex-row justify-center items-center w-full gap-6">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">Nom de la salle</label>
                                            <input onChange={(e) => setNomSalle(e.target.value)} type="text" name="name" id="name" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500" placeholder="WaitAndSee" />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-white">Mdp de la salle</label>
                                            <input onChange={(e) => setMdpSalle(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500" />
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center justify-center mt-6 w-full gap-6'>
                                        <button
                                            type="button"
                                            onClick={() => {handleSelectionPersoType(true)}}
                                            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800`}
                                        >
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Retour
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={createSalle}
                                            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800 ${isDisabled ? 'disabled:bg-gray-300 disabled:cursor-not-allowed' : ''}`}
                                        >
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Creer
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}