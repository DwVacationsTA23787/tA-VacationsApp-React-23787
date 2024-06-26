import React from 'react';
import '../../pages/startbootstrap-grayscale-gh-pages/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';

function Hero() {
  return (
    <header className="masthead">
        <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
                <div className="text-center">
                    <h1 className="mx-auto my-0 text-uppercase">NomeApp</h1>
                    <h2 className="text-white-50 mx-auto mt-2 mb-5">Encontre aventuras e novas amizades em cada destino com NomeApp.</h2>
                    <a className="btn btn-primary" href="#about">Where to?</a>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Hero
