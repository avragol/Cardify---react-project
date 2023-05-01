import axios from "axios"

export const imgForAvatar = async () => {
    try {
        const { data } = await axios.get("/users/userInfo");
        //console.log(await axios.get("/users/userInfo"));
        console.log("url", data.imageUrl, "alt", data.imageAlt);
        if (data.imageAlt && data.imageUrl) {
            return {
                url: data.imageUrl,
                alt: data.imageAlt
            }
        } return {
            url: "https://png.pngtree.com/element_our/20190604/ourmid/pngtree-user-avatar-boy-image_1482937.jpg",
            alt: "defult avatar image"
        }
    } catch (err) {
        console.log(err);
    }

}