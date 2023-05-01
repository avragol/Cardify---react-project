//this func check if the url is route to really image
export const imgUrlValidation = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

/* 
const imageUrl = "https://example.com/image.jpg";
isImage(imageUrl).then((result) => {
    if (result) {
        console.log("The URL points to an image");
    } else {
        console.log("The URL does not point to an image");
    }
}); */
