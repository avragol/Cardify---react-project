const reconfigurationCard = (card) => {
    return {
        title: card.title,
        subTitle: card.subTitle,
        description: card.description,
        url: card.url || card.image.url,
        alt: card.alt || card.image.alt,
        web: card.web,
        state: card.state,
        country: card.country,
        city: card.city,
        street: card.street,
        houseNumber: card.houseNumber,
        phone: card.phone,
        email: card.email,
    }
}
export default reconfigurationCard;