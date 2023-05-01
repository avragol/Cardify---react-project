import { imgUrlValidation } from "../validation/imgUrlValidation";

const reconfigurationCard = (card) => {
    return {
        title: card.title,
        subTitle: card.subTitle,
        description: card.description,
        web: card.web,
        state: card.state,
        country: card.country,
        city: card.city,
        street: card.street,
        houseNumber: card.houseNumber,
        phone: card.phone,
        email: card.email,
        alt: card.alt || card.image.alt,
        url: checkUrl(card.url || card.image.url),
    }
}

const checkUrl = async (url) => {
    return imgUrlValidation(url).then((result) => result ? url : "")
}
export default reconfigurationCard;