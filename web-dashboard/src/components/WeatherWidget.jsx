import React, { useState, useEffect } from 'react';
import { Sun, CloudSun, Droplets, Wind, CloudRain, Gauge } from 'lucide-react';

const TELEMETRY_READINGS = [
  { temp: 26.5, condition: 'Clear',         soilMoisture: 64, windSpeed: 12.4, rainRisk: 15, waterFlow: 45.2 },
  { temp: 27.1, condition: 'Partly cloudy', soilMoisture: 61, windSpeed: 11.8, rainRisk: 22, waterFlow: 44.8 },
  { temp: 25.8, condition: 'Clear',         soilMoisture: 66, windSpeed: 13.2, rainRisk: 10, waterFlow: 46.1 },
  { temp: 28.3, condition: 'Clear',         soilMoisture: 58, windSpeed: 14.0, rainRisk: 8,  waterFlow: 43.9 },
];

export default function WeatherWidget() {
  const [reading, setReading] = useState(TELEMETRY_READINGS[0]);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const updateTime = () => setTimestamp(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    updateTime();
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % TELEMETRY_READINGS.length;
      setReading(TELEMETRY_READINGS[idx]);
      updateTime();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const ConditionIcon = reading.condition.includes('cloudy') ? CloudSun : Sun;

  const metrics = [
    { icon: Droplets,  label: 'Soil moisture',  val: `${reading.soilMoisture}%`, status: reading.soilMoisture >= 60 ? 'Optimal' : 'Watch', pct: reading.soilMoisture },
    { icon: Wind,      label: 'Wind speed',     val: `${reading.windSpeed} km/h`, status: 'Light breeze', pct: Math.min(100, reading.windSpeed * 4) },
    { icon: CloudRain, label: '24h rain risk',  val: `${reading.rainRisk}%`,     status: reading.rainRisk < 30 ? 'Low' : 'Moderate', pct: reading.rainRisk },
    { icon: Gauge,     label: 'Avg intake flow',val: `${reading.waterFlow} m³/s`,status: 'Nominal', pct: 74 },
  ];

  return (
    <div className="agri-card rounded-xl p-5 flex flex-col justify-between gap-4 h-full">
      <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#ECEAE4]">
        <div>
          <h3 className="text-sm font-semibold text-[#141A16]">Regional agro-climate</h3>
          <p className="text-xs text-[#738077] mt-0.5">MSD station composite · {timestamp}</p>
        </div>
        <div className="flex items-center gap-2 text-right">
          <ConditionIcon className="w-5 h-5 text-[#C88A2E]" />
          <div>
            <div className="text-lg font-bold text-[#141A16] leading-none tabular-nums">{reading.temp}°C</div>
            <div className="text-[11px] text-[#738077]">{reading.condition}</div>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-[#525E56]">
                  <Icon className="w-3.5 h-3.5 text-[#738077]" />
                  {m.label}
                </span>
                <div className="flex items-center gap-2 tabular-nums">
                  <span className="font-semibold text-[#141A16]">{m.val}</span>
                  <span className="text-[#8A948D] text-[11px]">{m.status}</span>
                </div>
              </div>
              <div className="h-1.5 bg-[#F0EFEA] rounded-full overflow-hidden">
                <div className="h-full bg-[#2D7A4D] rounded-full transition-all duration-500" style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
