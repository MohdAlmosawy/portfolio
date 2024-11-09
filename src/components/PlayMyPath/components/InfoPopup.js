import React, { useEffect } from 'react';
import './InfoPopup.css';

const InfoPopup = ({ info, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // Auto close after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="info-popup">
            <div className="info-popup-content">
                <img 
                    src={`/assets/games/icons/${info.icon}.png`} 
                    alt={info.name} 
                    className="info-popup-icon"
                />
                <h3>{info.name}</h3>
                <p>{info.description}</p>
                <div className="info-popup-points">+{info.points} points</div>
            </div>
        </div>
    );
};

export default InfoPopup; 