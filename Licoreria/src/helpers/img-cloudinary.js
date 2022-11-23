import { cloudinaryImages } from "../services/cloudinary";

export const uploadImage = async files => {
    const formData = new FormData()
    formData.append("file", files)
    formData.append("upload_preset", 'csjll0ve')

    return await cloudinaryImages(formData);
}