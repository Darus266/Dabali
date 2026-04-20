const DEFAULT_DISHES = [
    { id: 'd1', name: 'La "Garba\'Box" Premium', desc: 'Attiéké supérieur, thon rouge croustillant, oignons doux et piments parfumés.', price: '4 500 FCFA', category: 'lagunaire', img: 'garba.jpeg' },
    { id: 'd2', name: 'Attiéké Box Impériale', desc: 'Poisson délicatement braisé au feu de bois de manguier, sauce tomate oignon et alloco doré.', price: '5 500 FCFA', category: 'lagunaire', img: 'gytr.jpeg' },
    { id: 'd3', name: 'Placali\'Box Fondant', desc: 'Pâte de manioc divinement douce, sauce graine aux amandes ou gombos croustillants.', price: '3 500 FCFA', category: 'lagunaire', img: 'placali.jpeg' },
    
    { id: 'd4', name: 'Foutou\'Classique', desc: 'Foutou soyeux de banane ou d\'igname, onctueuse sauce graine ou arachide.', price: '3 500 FCFA', category: 'centre', img: 'foutou_sauce_dumble.jpg' },
    { id: 'd5', name: 'Kédjénou de Poulet', desc: 'Poulet braisé à l\'étouffée dans un canari de terre avec des légumes frais.', price: '7 000 FCFA', category: 'centre', img: 'kedjenou.png' },
    { id: 'd6', name: 'Gouagouassou\'Box', desc: 'Somptueuse sauce aubergine avec poisson fumé et viande de bœuf, avec du foutou Baoulé.', price: '5 000 FCFA', category: 'centre', img: 'riz sauce gouagouassou.jpg' },

    { id: 'd7', name: 'Kpang\'Box Royale', desc: 'Riz parfumé aux feuilles de manioc, aubergines tendres, poisson fumé et bœuf.', price: '5 000 FCFA', category: 'ouest', img: 'manioc.jpg' },
    { id: 'd8', name: 'Plat de Biékosseu', desc: 'Spécialité aux aubergines fraîches, escargots et champignons, très prisée dans l\'Ouest.', price: '5 500 FCFA', category: 'ouest', img: 'biokosseu.avif' },

    { id: 'd9', name: 'Kabatô\'Box Authentique', desc: 'Pâte de maïs fine (Tô) servie avec sauce gombo gluante ou sauce feuilles savoureuse.', price: '3 000 FCFA', category: 'nord', img: 'images.jpg' },
    { id: 'd10', name: 'Riz Gras Dioula', desc: 'Riz au jasmin délicatement mijoté dans un bouillon de viande et de légumes (Street food).', price: '4 500 FCFA', category: 'nord', img: 'riz gras.jpg' },
    { id: 'd11', name: 'Riz Sauce Arachide', desc: 'Riz parfumé avec une sauce arachide onctueuse, viande de bœuf fondante et légumes.', price: '4 000 FCFA', category: 'nord', img: 'riz sauce arrachide.jpg' },
    { id: 'd12', name: 'Choukouya de Mouton', desc: 'Mouton tendre braisé finement découpé, épices piquantes du Nord, oignons croquants.', price: '6 500 FCFA', category: 'nord', img: 'choukouya.png' }
];

// Initialise DB in LocalStorage if not present
if (!localStorage.getItem('dabali_dishes')) {
    localStorage.setItem('dabali_dishes', JSON.stringify(DEFAULT_DISHES));
}

window.DabaliDB = {
    getDishes: () => {
        return JSON.parse(localStorage.getItem('dabali_dishes')) || [];
    },
    addDish: (dish) => {
        const dishes = window.DabaliDB.getDishes();
        dish.id = 'd' + Date.now();
        dishes.push(dish);
        localStorage.setItem('dabali_dishes', JSON.stringify(dishes));
    },
    deleteDish: (id) => {
        let dishes = window.DabaliDB.getDishes();
        dishes = dishes.filter(d => d.id !== id);
        localStorage.setItem('dabali_dishes', JSON.stringify(dishes));
    }
};
