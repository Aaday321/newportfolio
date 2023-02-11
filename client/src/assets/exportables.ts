
const CREAM: string = '#FFF9C6';

export const APP_COLORS = {
    CREAM
}

export interface SVG_PROPS {
    color?: string;
    size?: number;
    file?: string;
    alt?: string;
}

export interface PopUpPackage {
    popUpDisplay: string;
    togglePopUp: ()=>void;
    popOpen: boolean;
}

export const SERVER_ROUTE: string = 'https://ade-portfolio-server.onrender.com/portfolio'