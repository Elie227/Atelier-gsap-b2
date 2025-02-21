// Importation de GSAP et des modules nécessaires
import { gsap } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
import { ScrollTrigger } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
import { Draggable } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Draggable.min.js";
gsap.registerPlugin(ScrollTrigger, Draggable);

// Animation d'introduction
window.onload = () => {
    gsap.from(".profile-container", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out"
    });
};


// Création de l'effet de curseur personnalisé
const cursor = document.querySelector('.cursor');
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.5;

const xSet = gsap.quickSetter(cursor, "x", "px");
const ySet = gsap.quickSetter(cursor, "y", "px");

window.addEventListener("mousemove", e => {    
    mouse.x = e.x;
    mouse.y = e.y;  
    

// Effet loupe sur le texte
const textElements = document.querySelectorAll('.section-content p, .floating-text p, h2, h3');

textElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(element, {
            transformOrigin: `${x}px ${y}px`,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    element.addEventListener('mouseleave', () => {
        gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
});

// Animation d'introduction
window.onload = () => {
    gsap.from(".profile-container", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out"
    });
};

// Drag UNIQUEMENT pour la première section
const firstSection = document.querySelector('.half-section');
if (firstSection) {
    Draggable.create(firstSection, {
        type: "x,y",
        edgeResistance: 0.8,
        bounds: "body",
        inertia: true,
        onDragEnd: function() {
            gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });
}