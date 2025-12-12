import { MapPin } from "lucide-react";

const Map = () => {
  const hubs = [
    { id: 1, name: "Dhaka Central Hub", top: "40%", left: "48%" },
    { id: 2, name: "Chittagong Port Hub", top: "65%", left: "70%" },
    { id: 3, name: "Sylhet Division Hub", top: "28%", left: "75%" },
    { id: 4, name: "Rajshahi University Hub", top: "35%", left: "25%" },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">
            Our Reach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Delivery Coverage
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We deliver books to your doorstep across major cities. Check our
            active library hubs below.
          </p>
        </div>

        <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-900 group">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(#10B981 1.5px, transparent 1.5px)",
              backgroundSize: "30px 30px",
            }}></div>

          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="text-8xl font-black text-slate-400 dark:text-slate-600 tracking-tighter">
              MAP VIEW
            </span>
          </div>

          {hubs.map((hub) => (
            <div
              key={hub.id}
              className="absolute cursor-pointer"
              style={{ top: hub.top, left: hub.left }}>
              <div className="relative flex flex-col items-center group/marker">
                <div className="absolute -inset-4 bg-emerald-500/30 rounded-full animate-ping opacity-75"></div>

                <div className="relative z-10 bg-white dark:bg-slate-800 p-2.5 rounded-full shadow-lg border-2 border-emerald-500 text-emerald-600 group-hover/marker:scale-110 group-hover/marker:bg-emerald-600 group-hover/marker:text-white transition-all duration-300">
                  <MapPin
                    size={24}
                    className="fill-emerald-100 dark:fill-emerald-900 group-hover/marker:fill-white/20"
                  />
                </div>

                <div className="absolute bottom-full mb-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 group-hover/marker:opacity-100 transform translate-y-2 group-hover/marker:translate-y-0 transition-all duration-300 w-40 text-center z-20">
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                    {hub.name}
                  </h4>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wide">
                    Active Zone
                  </span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-slate-800"></div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-500 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            System Online
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;

/*
// ----------------------------------------------------------------------
// REAL LEAFLET MAP IMPLEMENTATION (For Local Use)
// 1. Install dependencies: npm install leaflet react-leaflet
// 2. Uncomment the imports and the component code below.
// ----------------------------------------------------------------------

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Map = () => {
    const position = [23.6850, 90.3563];
    const hubs = [
        { id: 1, name: "Dhaka Central Hub", pos: [23.8103, 90.4125] },
        { id: 2, name: "Chittagong Port Hub", pos: [22.3569, 91.7832] },
        { id: 3, name: "Sylhet Division Hub", pos: [24.8949, 91.8687] },
        { id: 4, name: "Rajshahi University Hub", pos: [24.3636, 88.6241] }
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Reach</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Delivery Coverage</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        We deliver books to your doorstep across major cities. Check our active library hubs below.
                    </p>
                </div>
                
                <div className="h-[450px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 z-0 relative">
                    <MapContainer center={position} zoom={7} scrollWheelZoom={false} className="h-full w-full">
                        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {hubs.map(hub => (
                            <Marker key={hub.id} position={hub.pos}>
                                <Popup>
                                    <div className="text-center"><h3 className="font-bold text-emerald-600 m-0">{hub.name}</h3><p className="text-xs text-slate-500 m-0">Active Delivery Zone</p></div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};
*/
