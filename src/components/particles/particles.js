import React, { Component } from 'react';
import './particles.css';
import Particles from 'react-particles-js';

class particles extends Component {
    render() {
        return (
            <Particles
                id="particles"
                params={{
                    particles: {
                        number: {
                            value: 110,
                            density: {
                                enable: false
                            }
                        },
                        size: {
                            value: 4,
                            random: true,
                            anim: {
                                speed: 4,
                                size_min: 0.3
                            }
                        },
                        line_linked: {
                            enable: false
                        },
                        move: {
                            random: true,
                            speed: 1.5,
                            direction: 'top-right',
                            out_mode: 'out'
                        }
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'bubble'
                            },
                            onclick: {
                                enable: true,
                                mode: 'repulse'
                            }
                        },
                        modes: {
                            bubble: {
                                distance: 250,
                                duration: 2,
                                size: 0,
                                opacity: 0
                            },
                            repulse: {
                                distance: 400,
                                duration: 4
                            }
                        }
                    }
                }} />
        );
    }
}

export default particles;
