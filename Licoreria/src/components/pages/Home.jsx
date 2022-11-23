import React from 'react'
import { Footer } from '../Layouts/Footer'
import { NavBar } from '../Layouts/NavBarHome'

export const Home = () => {
    return (
        <section id="main">
            <NavBar />
            <div id="carousel" className="carousel slide carousel-fade" data-bs-pause="false" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://i2.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/06/tapa_bebidas.png?fit=700%2C336&ssl=1&resize=1280%2C720"
                            className="d-block w-100 top" alt="nature1" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/id/475500992/photo/cheers.jpg?s=170667a&w=0&k=20&c=8U3xk-Sws8q0JP0hX65ZWUMPvGMBIaWX0sOb83d5GP0=" 
                        className="d-block w-100 top"
                            alt="nature2" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?cs=srgb&dl=pexels-chan-walrus-941864.jpg&fm=jpg"
                            className="d-block w-100 top" alt="nature3" />
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}
