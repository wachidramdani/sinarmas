import L from 'leaflet';

const iconMark = new L.Icon({
    iconUrl: require('./iconmark.png'),
    iconRetinaUrl: require('./iconmark.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(32, 38),
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    className: 'leaflet-div-icon'
});

export { iconMark };