import { imgUrlValidation } from "../validation/imgUrlValidation";

const reconfigurationUser = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        imageUrl: checkUrl(user.imageUrl),
        imageAlt: user.imageAlt,
        state: user.state,
        country: user.country,
        city: user.city,
        street: user.street,
        houseNumber: user.houseNumber,
        zip: user.zip,
        biz: user.biz
    }
};

const checkUrl = async (url) => {
    return imgUrlValidation(url).then((result) => result ? url : "")
}
export default reconfigurationUser;