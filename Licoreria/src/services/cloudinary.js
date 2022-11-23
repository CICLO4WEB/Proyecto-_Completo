import axios from 'axios';

export const cloudinaryImages = async ( value ) => {

    const resp = await axios.post("https://api.cloudinary.com/v1_1/samuelrm5/image/upload", value )
    .then( res => res )
    .catch( err => err.response )
    return resp;

} 