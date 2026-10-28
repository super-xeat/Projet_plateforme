
import { commande, 
        commande_panier, 
        recup_prod, 
        update_product_stock, 
        supp_panier,
        trouver_panierProduct,
        trouver_prix,
        trouver_adresse,
        commande_cours,
        commande_passer,
        product_commande_cours,
        product_commande_passer
     } from "../models/commande.js";
import { db } from "../database/config.js";


export const CommandeService = async(connection, date, statut, montant_total, id_user, adresse_livraison) => {
    if (!date || !statut || !montant_total || !id_user || !adresse_livraison) {
        throw {status: 400, 'message': 'il manque un champs'}
    }

    const id_Createcommande = await commande(connection, date, statut, montant_total, id_user, adresse_livraison)
    return id_Createcommande
}


export const commande_panier_service = async(connection, id_commande, id_product, quantity, prix_achat) => {
    if (!id_commande || !id_product || !quantity || !prix_achat) {
        throw {status: 400, 'message': 'il manque un champs'}
    }

    await commande_panier(connection, id_commande, id_product, quantity, prix_achat)
}


export const passer_commande_service = async(id_user) => {
    
    if (!id_user) {
        throw {statut: 400, 'message': 'il manque id'}
    }

    const adresse_livraison = await trouver_adresse(id_user)

    if (!adresse_livraison) {
        throw {statut: 400, 'message': 'il manque adresse'}
    }

    const panierProd = await trouver_panierProduct(id_user) 
    let listeProduct = []
    for (const p of panierProd) {
        const price = await trouver_prix(p.id_product)
        listeProduct.push({
            id_product: p.id_product,
            prix_achat: Number(price),
            quantity: p.quantity
        })
    }
    console.log('listeproduit :', listeProduct)
    if (!Array.isArray(listeProduct) || listeProduct.length === 0) {
        throw {status: 400, 'message': 'liste de produit vide'}
    }

    const date = new Date()
    const statut = 'en cours'

    const connection = await db.getConnection()
    try {
        await connection.beginTransaction()

        let montant_total = listeProduct.reduce((acc, product)=> acc + product.quantity * product.prix_achat, 0)
        const id_commande = await CommandeService(connection, date, statut, montant_total, id_user, adresse_livraison)

        for (const product of listeProduct) {
            const stock = await recup_prod(connection, product.id_product)
            const newstock = stock - product.quantity
            await update_product_stock(connection,newstock, product.id_product)

            await commande_panier_service(
                connection,
                id_commande,
                product.id_product, 
                product.quantity, 
                product.prix_achat)
        }
    
        await supp_panier(connection, id_user)
        await connection.commit()
    } catch (error) {
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }
} 


export const product_cours_service = async(id_commande, statut) => {
    if (!id_commande || !statut) {
        throw {statut: 400, 'message': 'id commande ou statut manquant'}
    }
    const product_commande = await product_commande_cours(id_commande, statut)
    
    return product_commande
}

export const product_passer_service = async(id_commande, statut) => {
    if (!id_commande || !statut) {
        throw {statut: 400, 'message': 'id commande ou statut manquant'}
    }
    const product_commande = await product_commande_passer(id_commande, statut)
    return product_commande
}


export const commande_cours_service = async(id_user) => {
    if (!id_user) {
        throw {statut: 400, 'message': 'user manquant'}
    }
    const commande = await commande_cours(id_user)
    
    for (const order of commande) {
        const liste_prod = await product_commande_cours(order.id_commande, order.statut)
        order.listeproduct = liste_prod 
    }

    return commande
}


export const commande_passer_service = async(id_user) => {
    if (!id_user) {
        throw {statut: 400, 'message': 'user manquant'}
    }
    const commande = await commande_passer(id_user)

    for (const order of commande) {
        const liste_prod = await product_commande_cours(order.id_commande, order.statut)
        order.listeproduct = liste_prod 
    }

    return commande
}