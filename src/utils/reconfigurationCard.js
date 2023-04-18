const reconfigurationCard = (card) => {
    return {
        title: card.title,
        subTitle: card.subTitle,
        description: card.description,
        url: card.image.url,
        alt: card.image.alt,
        country: card.country,
        city: card.city,
        street: card.street,
        houseNumber: card.houseNumber,
        phone: card.phone,
        email: card.email,
    }
}
export default reconfigurationCard;