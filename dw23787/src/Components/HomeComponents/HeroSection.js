import React from 'react'
import { Button } from 'react-bootstrap'

function HeroSection() {
    return (
        <div
            className="container-fluid position-relative d-flex justify-content-center align-items-center"
            style={{
                backgroundImage: "url('/secondTry.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: "100vh", // Example height, you can adjust this as needed
                maxHeight: "600px", // Maximum height to maintain aspect ratio
                overflow: "hidden", // Hide any overflowing content
            }}
        >
            <div className='d-flex flex-column align-items-center'>
                <div className="text-center text-white">
                    <p className="display-3 fw-bold">
                        <span className="me-2">DO YOU</span>
                        <span>WANNA</span>
                    </p>
                    <p className="mt-3 fs-6">everything you can imagine, is here</p>
                    <p className="fs-5">JUMP IN MY RIDE?</p>
                </div>

                <Button href='#counters'
                    className='rounded-circle bg-transparent border-0 shadow-none'
                    style={{ outline: '2px solid white', outlineOffset: '2px' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="15px" fill="#e8eaed">
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                    </svg>
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
